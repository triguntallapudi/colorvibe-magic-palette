
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ColorCard } from '@/components/ColorCard';
import { toast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';

interface Palette {
  id: number;
  name: string;
  colors: string[];
  created_at: string;
}

const Browse = () => {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPalettes();
  }, []);

  const fetchPalettes = async () => {
    try {
      const { data, error } = await supabase
        .from('palettes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPalettes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load palettes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Browse Palettes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {palettes.map((palette) => (
          <Card key={palette.id} className="p-4 shadow-lg">
            <h3 className="text-lg font-medium mb-2">{palette.name}</h3>
            <ColorCard colors={palette.colors} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Browse;
