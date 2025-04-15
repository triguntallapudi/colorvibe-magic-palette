
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ColorCard from './ColorCard';
import PaletteDialog from './PaletteDialog';
import { Wand2, Save, Shuffle } from 'lucide-react';
import { THEME_COLORS, generateAIColors, getRandomPalette, colorKeywords } from '@/lib/colors';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const PaletteGenerator = () => {
  const [currentPalette, setCurrentPalette] = useState<string[]>(() => {
    const editingPalette = localStorage.getItem('editingPalette');
    if (editingPalette) {
      return JSON.parse(editingPalette);
    }
    return THEME_COLORS.default;
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [editingPaletteId, setEditingPaletteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const generateButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const storedEditingPaletteId = localStorage.getItem('editingPaletteId');
    if (storedEditingPaletteId) {
      setEditingPaletteId(storedEditingPaletteId);
      
      const editingPalette = localStorage.getItem('editingPalette');
      if (editingPalette) {
        setCurrentPalette(JSON.parse(editingPalette));
      }
    }
  }, []);

  // Find palette name by matching colors
  const findPaletteName = (colors: string[]): string => {
    // Find exact palette match in theme colors
    for (const [theme, themeColors] of Object.entries(THEME_COLORS)) {
      if (JSON.stringify(themeColors) === JSON.stringify(colors)) {
        return theme.charAt(0).toUpperCase() + theme.slice(1);
      }
    }
    
    // Find exact palette match in keyword colors
    for (const [keyword, keywordColors] of Object.entries(colorKeywords)) {
      if (JSON.stringify(keywordColors) === JSON.stringify(colors)) {
        // Format the keyword for display (capitalize, replace hyphens with spaces)
        return keyword
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }
    
    // If no exact match found, return a default
    return 'Custom Palette';
  };

  const handleRandomGenerate = () => {
    setLoading(true);
    try {
      const randomColors = getRandomPalette();
      console.log("Generated random palette:", randomColors);
      setCurrentPalette(randomColors);
      
      // Find and set the matching palette name
      const paletteName = findPaletteName(randomColors);
      setPrompt(paletteName);
      
      toast({
        title: "Success",
        description: "Random palette generated",
        duration: 3000,
      });
    } catch (error) {
      console.error("Random generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate random colors",
        variant: "destructive",
        duration: 3000,
      });
    }
    setLoading(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate colors",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setLoading(true);
    try {
      const colors = await generateAIColors(prompt);
      console.log("Generated colors:", colors);
      setCurrentPalette(colors);
      
      toast({
        title: "Success",
        description: "Colors generated successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error("Color generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate colors",
        variant: "destructive",
        duration: 3000,
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Login Required",
          description: "You need to be logged in to save palettes",
          variant: "destructive",
        });
        return;
      }

      if (editingPaletteId) {
        console.log("Updating palette with ID:", editingPaletteId);
        const { error } = await supabase
          .from('palettes')
          .update({
            colors: currentPalette,
            name: prompt || 'Untitled Palette'
          })
          .eq('id', editingPaletteId);

        if (error) {
          console.error("Update error:", error);
          throw error;
        }

        console.log("Palette updated successfully");

        toast({
          title: "Success!",
          description: editingPaletteId ? "Palette updated successfully" : "Palette saved successfully",
        });

        localStorage.removeItem('editingPalette');
        localStorage.removeItem('editingPaletteId');
        setEditingPaletteId(null);
        
        navigate('/saved');
      } else {
        console.log("Creating new palette");
        const { error } = await supabase
          .from('palettes')
          .insert([
            {
              user_id: user.id,
              colors: currentPalette,
              name: prompt || 'Untitled Palette',
            },
          ]);

        if (error) {
          console.error("Insert error:", error);
          throw error;
        }

        console.log("New palette saved successfully");

        toast({
          title: "Success!",
          description: editingPaletteId ? "Palette updated successfully" : "Palette saved successfully",
        });
        
        navigate('/saved');
      }
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: "Failed to save palette. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && generateButtonRef.current) {
      e.preventDefault();
      generateButtonRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-24 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-black">
          ColorVibe
        </h1>
        <p className="text-lg text-gray-600">
          Transform your vision into vibrant color palettes
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Try keywords like 'sunset' or 'ocean'..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1"
          />
          <Button
            onClick={handleGenerate}
            className="bg-black text-white hover:bg-[#333333] hover:text-white"
            disabled={loading}
            ref={generateButtonRef}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Generate
          </Button>
          <Button
            onClick={handleRandomGenerate}
            className="bg-black text-white hover:bg-[#333333] hover:text-white"
            disabled={loading}
            title="Generate Random Palette"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleSave}
            variant="outline"
            className="border-gray-200 text-black hover:text-black"
            disabled={loading}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {currentPalette.map((color, index) => (
            <ColorCard
              key={index}
              color={color}
              index={index}
              onClick={(idx) => {
                setSelectedColorIndex(idx);
                setDialogOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-16 border-t pt-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">About Color Vibe</h2>
            <p className="text-gray-600 leading-relaxed">
              Color Vibe is an intuitive color palette generator that helps designers,
              artists, and creatives discover beautiful color combinations. Whether
              you're working on a website, brand identity, or art project, Color
              Vibe makes it easy to explore and create harmonious color palettes.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ul className="space-y-3 text-gray-600">
              <li>1. Enter a descriptive word or phrase (e.g., "sunset", "ocean")</li>
              <li>2. Click Generate to create a unique color palette</li>
              <li>3. Click Random to get a surprise palette</li>
              <li>4. Click on any color to edit it manually</li>
              <li>5. Save your favorite palettes for future reference</li>
            </ul>
          </div>
        </div>
      </div>

      <PaletteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        palette={currentPalette}
        selectedColorIndex={selectedColorIndex}
        onPaletteChange={setCurrentPalette}
      />
    </div>
  );
};

export default PaletteGenerator;
