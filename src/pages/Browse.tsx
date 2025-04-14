
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface Palette {
  id: number;
  name: string;
  colors: string[];
  created_at: string;
}

const Browse = () => {
  const { data: palettes, isLoading } = useQuery({
    queryKey: ['all-palettes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('palettes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Palette[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading palettes...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Browse Palettes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes?.map((palette) => (
            <div key={palette.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-32 flex">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{palette.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
