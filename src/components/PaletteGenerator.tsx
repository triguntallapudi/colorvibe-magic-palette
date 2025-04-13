
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ColorCard from './ColorCard';
import PaletteDialog from './PaletteDialog';
import { Wand2, Shuffle } from 'lucide-react';
import { THEME_COLORS, generateAIColors, getRandomPalette } from '@/lib/colors';
import { toast } from '@/hooks/use-toast';

const PaletteGenerator = () => {
  const [currentPalette, setCurrentPalette] = useState<string[]>(THEME_COLORS.default);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const generateButtonRef = useRef<HTMLButtonElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate colors",
        variant: "destructive",
      });
      return;
    }
    
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

  const handleRandomGenerate = () => {
    setLoading(true);
    try {
      const randomColors = getRandomPalette();
      console.log("Generated random palette:", randomColors);
      setCurrentPalette(randomColors);
      
      // Set prompt to match the theme name precisely
      const matchingTheme = Object.entries(THEME_COLORS).find(
        ([_, colors]) => JSON.stringify(colors) === JSON.stringify(randomColors)
      );
      
      if (matchingTheme) {
        console.log("Found matching theme:", matchingTheme[0]);
        // Update the prompt field with the exact theme name, capitalizing first letter
        const themeName = matchingTheme[0].charAt(0).toUpperCase() + matchingTheme[0].slice(1);
        setPrompt(themeName);
      } else {
        // If no matching theme is found (which shouldn't happen with getRandomPalette)
        setPrompt("");
      }
    } catch (error) {
      console.error("Random generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate random colors",
        variant: "destructive",
      });
    }
    setLoading(false);
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
