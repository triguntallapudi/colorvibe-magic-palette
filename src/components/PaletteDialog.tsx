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

const rgbToHsb = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = max === 0 ? 0 : diff / max;
  let v = max;

  if (diff !== 0) {
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, b: v * 100 };
};

const hsbToRgb = (h: number, s: number, v: number) => {
  h /= 360;
  s /= 100;
  v /= 100;

  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      r = 0;
      g = 0;
      b = 0;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
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
  const [hsb, setHsb] = useState(rgbToHsb(rgb.r, rgb.g, rgb.b));

  useEffect(() => {
    setEditablePalette(palette);
    setRgb(hexToRgb(palette[selectedColor]));
    setHsb(rgbToHsb(rgb.r, rgb.g, rgb.b));
  }, [palette, selectedColor]);

  const handleColorChange = (rgb: { r: number, g: number, b: number }) => {
    const newColor = rgbToHex(rgb.r, rgb.g, rgb.b);
    const newPalette = [...editablePalette];
    newPalette[selectedColor] = newColor;
    setEditablePalette(newPalette);
    setRgb(rgb);
    setHsb(rgbToHsb(rgb.r, rgb.g, rgb.b));
  };

  const handleRgbChange = (newRgb: { r: number; g: number; b: number }) => {
    const newColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    const newPalette = [...editablePalette];
    newPalette[selectedColor] = newColor;
    setEditablePalette(newPalette);
    setRgb(newRgb);
    setHsb(rgbToHsb(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHsbChange = (newHsb: { h: number; s: number; b: number }) => {
    const newRgb = hsbToRgb(newHsb.h, newHsb.s, newHsb.b);
    const newColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    const newPalette = [...editablePalette];
    newPalette[selectedColor] = newColor;
    setEditablePalette(newPalette);
    setRgb(newRgb);
    setHsb(newHsb);
  };

  const handleSave = () => {
    onPaletteChange(editablePalette);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">Edit Color</DialogTitle>
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

          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
            <div className="h-24 mb-4 rounded-lg shadow-sm" style={{ backgroundColor: editablePalette[selectedColor] }} />
            
            <Tabs defaultValue="rgb" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="rgb">RGB</TabsTrigger>
                <TabsTrigger value="hsb">HSB</TabsTrigger>
                <TabsTrigger value="hex">HEX</TabsTrigger>
              </TabsList>

              <TabsContent value="rgb" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">Red</label>
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
                      <label className="text-sm font-medium text-gray-700">Green</label>
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
                      <label className="text-sm font-medium text-gray-700">Blue</label>
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

              <TabsContent value="hsb" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">Hue</label>
                      <span className="text-sm text-gray-500">{Math.round(hsb.h)}°</span>
                    </div>
                    <Slider
                      min={0}
                      max={360}
                      step={1}
                      value={[hsb.h]}
                      onValueChange={([h]) => handleHsbChange({ ...hsb, h })}
                      className="[&_[role=slider]]:bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">Saturation</label>
                      <span className="text-sm text-gray-500">{Math.round(hsb.s)}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[hsb.s]}
                      onValueChange={([s]) => handleHsbChange({ ...hsb, s })}
                      className="[&_[role=slider]]:bg-gradient-to-r from-gray-300 to-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">Brightness</label>
                      <span className="text-sm text-gray-500">{Math.round(hsb.b)}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[hsb.b]}
                      onValueChange={([b]) => handleHsbChange({ ...hsb, b })}
                      className="[&_[role=slider]]:bg-gradient-to-r from-black to-white"
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
                    const newRgb = hexToRgb(e.target.value);
                    setRgb(newRgb);
                    setHsb(rgbToHsb(newRgb.r, newRgb.g, newRgb.b));
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
