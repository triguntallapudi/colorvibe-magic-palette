
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';

interface ColorCardProps {
  color: string;
  shape?: 'pill' | 'circle';
  showHex?: boolean;
  onClick?: () => void;
  onPaletteEdit?: () => void;
}

const ColorCard = ({ 
  color, 
  shape = 'pill', 
  showHex = true, 
  onClick, 
  onPaletteEdit 
}: ColorCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPaletteEdit) {
      onPaletteEdit();
    } else if (onClick) {
      onClick();
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard.`,
      duration: 2000,
    });
  };

  return (
    <div 
      className="group animate-fade-up flex flex-col items-center gap-2"
      onClick={handleClick}
    >
      <div
        className={`w-full aspect-[2/3] cursor-pointer transition-all duration-300 hover:shadow-xl ${
          shape === 'pill' ? 'rounded-[2rem]' : 'rounded-full'
        }`}
        style={{ backgroundColor: color }}
      >
        <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Copy className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      {showHex && (
        <span className="font-mono text-sm text-gray-600">{color}</span>
      )}
    </div>
  );
};

export default ColorCard;
