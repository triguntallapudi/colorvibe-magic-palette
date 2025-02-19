
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';

interface ColorCardProps {
  color: string;
  shape?: 'pill' | 'circle';
  showHex?: boolean;
  onClick?: () => void;
}

const ColorCard = ({ color, shape = 'pill', showHex = true, onClick }: ColorCardProps) => {
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
      onClick={onClick}
    >
      <div
        className={`w-full aspect-[2/3] cursor-pointer transition-all duration-300 hover:shadow-xl ${
          shape === 'pill' ? 'rounded-[2rem]' : 'rounded-full'
        }`}
        style={{ backgroundColor: color }}
        onClick={handleCopy}
      />
      {showHex && (
        <span className="font-mono text-sm text-gray-600">{color}</span>
      )}
    </div>
  );
};

export default ColorCard;
