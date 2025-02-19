
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ColorCard from './ColorCard';
import PaletteDialog from './PaletteDialog';
import { Wand2 } from 'lucide-react';
import { THEME_COLORS, generateAIColors } from '@/lib/colors';

const PaletteGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [currentPalette, setCurrentPalette] = useState<string[]>(THEME_COLORS.default);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const generatePalette = async () => {
    if (!keyword.trim()) return;
    
    setIsGenerating(true);
    try {
      const colors = await generateAIColors(keyword);
      setCurrentPalette(colors);
    } catch (error) {
      console.error('Error generating palette:', error);
      setCurrentPalette(THEME_COLORS.default);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePalette();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Color Vibe</h1>
        <p className="text-lg text-gray-600">
          Transform your vision into vibrant color palettes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 max-w-xl mx-auto">
        <Input
          type="text"
          placeholder="Try 'apple', 'ocean', or 'sunset'..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="glass-morphism"
        />
        <Button
          type="submit"
          className="bg-black text-white hover:bg-black/90 px-8"
          disabled={isGenerating}
        >
          <Wand2 className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          Generate
        </Button>
      </form>

      <div className="grid grid-cols-5 gap-6">
        {currentPalette.map((color, index) => (
          <ColorCard
            key={`${color}-${index}`}
            color={color}
            onClick={() => setDialogOpen(true)}
          />
        ))}
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
