
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ColorCard from './ColorCard';
import { Wand2 } from 'lucide-react';

const SAMPLE_PALETTES: Record<string, string[]> = {
  cyberpunk: ['#FF00FF', '#00FFFF', '#FF0000', '#0000FF', '#FFFF00'],
  vintage: ['#F5E6D3', '#E6CCB2', '#DDB892', '#B98B73', '#7F5539'],
  forest: ['#2D5A27', '#4A8B38', '#87AB66', '#BEDC7F', '#D4E79E'],
  default: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
};

const PaletteGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [currentPalette, setCurrentPalette] = useState<string[]>(SAMPLE_PALETTES.default);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePalette = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      const lowercaseKeyword = keyword.toLowerCase();
      const newPalette = SAMPLE_PALETTES[lowercaseKeyword] || SAMPLE_PALETTES.default;
      setCurrentPalette(newPalette);
      setIsGenerating(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePalette();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Color Vibe</h1>
        <p className="text-lg text-gray-600">
          Transform your vision into vibrant color palettes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 max-w-xl mx-auto">
        <Input
          type="text"
          placeholder="Try 'cyberpunk', 'vintage', or 'forest'..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="glass-morphism"
        />
        <Button
          type="submit"
          className="glass-card px-8"
          disabled={isGenerating}
        >
          <Wand2 className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          Generate
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {currentPalette.map((color, index) => (
          <ColorCard key={`${color}-${index}`} color={color} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PaletteGenerator;
