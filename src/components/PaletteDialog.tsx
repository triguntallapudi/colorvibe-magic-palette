
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import ColorCard from "./ColorCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaletteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  palette: string[];
  onPaletteChange: (newPalette: string[]) => void;
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

const PaletteDialog = ({
  open,
  onOpenChange,
  palette,
  onPaletteChange,
}: PaletteDialogProps) => {
  const [editablePalette, setEditablePalette] = useState(palette);
  const [selectedColor, setSelectedColor] = useState(0);
  const [rgb, setRgb] = useState(hexToRgb(palette[0]));

  useEffect(() => {
    setEditablePalette(palette);
    setRgb(hexToRgb(palette[selectedColor]));
  }, [palette, selectedColor]);

  const handleColorChange = (rgb: { r: number, g: number, b: number }) => {
    const newColor = rgbToHex(rgb.r, rgb.g, rgb.b);
    const newPalette = [...editablePalette];
    newPalette[selectedColor] = newColor;
    setEditablePalette(newPalette);
    setRgb(rgb);
  };

  const handleSave = () => {
    onPaletteChange(editablePalette);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Color</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-5 gap-3">
            {editablePalette.map((color, index) => (
              <button
                key={index}
                className={`h-12 rounded-lg transition-all ${
                  selectedColor === index ? 'ring-2 ring-black ring-offset-2' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setSelectedColor(index);
                  setRgb(hexToRgb(color));
                }}
              />
            ))}
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="h-24 mb-4 rounded-lg" style={{ backgroundColor: editablePalette[selectedColor] }} />
            
            <Tabs defaultValue="rgb" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="rgb">RGB</TabsTrigger>
                <TabsTrigger value="hex">HEX</TabsTrigger>
              </TabsList>

              <TabsContent value="rgb" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Red</label>
                      <span className="text-sm text-gray-500">{rgb.r}</span>
                    </div>
                    <Slider
                      min={0}
                      max={255}
                      step={1}
                      value={[rgb.r]}
                      onValueChange={([r]) => handleColorChange({ ...rgb, r })}
                      className="[&_[role=slider]]:bg-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Green</label>
                      <span className="text-sm text-gray-500">{rgb.g}</span>
                    </div>
                    <Slider
                      min={0}
                      max={255}
                      step={1}
                      value={[rgb.g]}
                      onValueChange={([g]) => handleColorChange({ ...rgb, g })}
                      className="[&_[role=slider]]:bg-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Blue</label>
                      <span className="text-sm text-gray-500">{rgb.b}</span>
                    </div>
                    <Slider
                      min={0}
                      max={255}
                      step={1}
                      value={[rgb.b]}
                      onValueChange={([b]) => handleColorChange({ ...rgb, b })}
                      className="[&_[role=slider]]:bg-blue-500"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hex">
                <Input
                  type="text"
                  value={editablePalette[selectedColor]}
                  onChange={(e) => {
                    const newPalette = [...editablePalette];
                    newPalette[selectedColor] = e.target.value;
                    setEditablePalette(newPalette);
                    setRgb(hexToRgb(e.target.value));
                  }}
                  className="font-mono text-center"
                />
              </TabsContent>
            </Tabs>
          </div>

          <Button onClick={handleSave} className="w-full bg-black text-white hover:bg-black/90">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaletteDialog;
