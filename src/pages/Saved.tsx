
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface SavedPalette {
  id: number;
  name: string;
  colors: string[];
  created_at: string;
}

const Saved = () => {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);

  useEffect(() => {
    fetchPalettes();
  }, []);

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

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('palettes')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete palette",
        variant: "destructive",
      });
      return;
    }

    setPalettes(palettes.filter(palette => palette.id !== id));
    toast({
      title: "Success",
      description: "Palette deleted successfully",
    });
  };

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="flex items-center gap-4 mb-12">
        <Button asChild variant="ghost" className="p-0 hover:bg-transparent">
          <Link to="/">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Saved Palettes</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {palettes.map((palette) => (
          <div key={palette.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative group">
              <div className="flex h-48">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color }}
                    className="flex-1 transition-all hover:flex-[1.5]"
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(palette.id)}
                  className="rounded-full bg-black hover:bg-black/90"
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{palette.name}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {palette.colors.map((color, index) => (
                  <span key={index} className="text-xs font-mono text-gray-500">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {palettes.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No saved palettes yet</p>
      )}
    </div>
  );
};

export default Saved;
