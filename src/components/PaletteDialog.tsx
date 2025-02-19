
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ColorCard from "./ColorCard";

interface PaletteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  palette: string[];
  onPaletteChange: (newPalette: string[]) => void;
}

const PaletteDialog = ({
  open,
  onOpenChange,
  palette,
  onPaletteChange,
}: PaletteDialogProps) => {
  const [editablePalette, setEditablePalette] = useState(palette);

  useEffect(() => {
    setEditablePalette(palette);
  }, [palette]);

  const handleColorChange = (index: number, value: string) => {
    const newPalette = [...editablePalette];
    newPalette[index] = value;
    setEditablePalette(newPalette);
  };

  const handleSave = () => {
    onPaletteChange(editablePalette);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Palette</DialogTitle>
          <DialogDescription>
            Click on a color to copy its hex code or edit it below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid grid-cols-5 gap-4">
            {editablePalette.map((color, index) => (
              <ColorCard
                key={index}
                color={color}
                shape="circle"
                showHex={true}
              />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-4">
            {editablePalette.map((color, index) => (
              <div key={index} className="space-y-2">
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="font-mono text-sm"
                />
                <div 
                  className="w-full h-4 rounded"
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
          </div>
          <Button onClick={handleSave} className="mt-4">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaletteDialog;
