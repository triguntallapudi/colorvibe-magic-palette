
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface SavedPalette {
  id: number;
  name: string;
  colors: string[];
  created_at: string;
}

const Saved = () => {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);

  useEffect(() => {
    const fetchPalettes = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to view saved palettes",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('palettes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load palettes",
          variant: "destructive",
        });
        return;
      }

      setPalettes(data);
    };

    fetchPalettes();
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Saved Palettes</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {palettes.map((palette) => (
          <div key={palette.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-32 grid grid-cols-5">
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="h-full"
                />
              ))}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{palette.name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(palette.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {palettes.length === 0 && (
        <p className="text-center text-gray-500">No saved palettes yet</p>
      )}
    </div>
  );
};

export default Saved;
