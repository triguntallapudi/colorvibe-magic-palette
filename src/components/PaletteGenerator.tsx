import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ColorCard from './ColorCard';
import PaletteDialog from './PaletteDialog';
import { Wand2, Save } from 'lucide-react';
import { THEME_COLORS, generateAIColors } from '@/lib/colors';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const PaletteGenerator = () => {
  const [currentPalette, setCurrentPalette] = useState<string[]>(() => {
    const editingPalette = localStorage.getItem('editingPalette');
    if (editingPalette) {
      localStorage.removeItem('editingPalette');
      return JSON.parse(editingPalette);
    }
    return THEME_COLORS.default;
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const colors = await generateAIColors(prompt);
      console.log("Generated colors:", colors);
      setCurrentPalette(colors);
    } catch (error) {
      console.error("Color generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate colors",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to save palettes",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      const { error } = await supabase
        .from('palettes')
        .insert([
          {
            user_id: user.id,
            colors: currentPalette,
            name: prompt || 'Untitled Palette',
          },
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Palette saved successfully",
      });
      
      localStorage.removeItem('editingPalette');
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: "Failed to save palette. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pt-28">
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
            className="flex-1"
          />
          <Button
            onClick={handleGenerate}
            className="bg-black text-white hover:bg-black/90"
            disabled={loading}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Generate
          </Button>
          <Button
            onClick={handleSave}
            variant="outline"
            className="border-gray-200"
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
              onClick={() => {
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
              <li>3. Click on any color to edit it manually</li>
              <li>4. Save your favorite palettes for future reference</li>
            </ul>
          </div>
        </div>
      </div>

      <PaletteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        palette={currentPalette}
        onPaletteChange={setCurrentPalette}
      />
    </div>
  );
};

export default PaletteGenerator;
