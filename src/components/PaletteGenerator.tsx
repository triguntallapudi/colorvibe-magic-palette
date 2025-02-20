
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ColorCard from './ColorCard';
import PaletteDialog from './PaletteDialog';
import { Wand2, Save } from 'lucide-react';
import { THEME_COLORS, generateAIColors } from '@/lib/colors';
import { toast } from '@/components/ui/use-toast';

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

  const handleSave = () => {
    toast({
      title: "Coming Soon!",
      description: "Save functionality will be available after connecting to Supabase.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-black">
          Color Vibe
        </h1>
        <p className="text-lg text-gray-600">
          Transform your vision into vibrant color palettes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        <Input
          type="text"
          placeholder="Try 'sunset', 'ocean', or 'forest'..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1 sm:flex-none bg-black text-white hover:bg-black/90"
            disabled={isGenerating}
          >
            <Wand2 className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            Generate
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSave}
            className="flex-1 sm:flex-none"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {currentPalette.map((color, index) => (
          <ColorCard
            key={`${color}-${index}`}
            color={color}
            onPaletteEdit={() => setDialogOpen(true)}
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
