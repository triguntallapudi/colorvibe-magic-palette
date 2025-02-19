
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';

interface ColorCardProps {
  color: string;
  index: number;
}

const ColorCard = ({ color, index }: ColorCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard.`,
      duration: 2000,
    });
  };

  return (
    <div
      className="relative group animate-fade-up glass-card"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="h-32 rounded-t-2xl transition-all duration-300 cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={copyToClipboard}
      />
      <div className="p-4 rounded-b-2xl bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{color}</span>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <Copy size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white font-medium">Click to copy</span>
        </div>
      )}
    </div>
  );
};

export default ColorCard;
