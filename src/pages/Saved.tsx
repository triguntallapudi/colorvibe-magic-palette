
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Edit2, Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

interface SavedPalette {
  id: number;
  name: string;
  colors: string[];
  created_at: string;
}

const Saved = () => {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [editingName, setEditingName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

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

    setPalettes(data || []);
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

    // Immediately update local state and fetch fresh data
    setPalettes(current => current.filter(p => p.id !== id));
    fetchPalettes(); // Fetch fresh data to ensure sync

    toast({
      title: "Success",
      description: "Palette deleted successfully",
    });
  };

  const handleRename = async () => {
    if (!editingId) return;

    const { error } = await supabase
      .from('palettes')
      .update({ name: editingName })
      .eq('id', editingId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to rename palette",
        variant: "destructive",
      });
      return;
    }

    // Update local state and fetch fresh data
    setPalettes(current => current.map(p => 
      p.id === editingId ? { ...p, name: editingName } : p
    ));
    fetchPalettes(); // Fetch fresh data to ensure sync

    setDialogOpen(false);
    setEditingId(null);
    setEditingName('');

    toast({
      title: "Success",
      description: "Palette renamed successfully",
    });
  };

  const handleEdit = (colors: string[], id: number) => {
    localStorage.setItem('editingPalette', JSON.stringify(colors));
    localStorage.setItem('editingPaletteId', id.toString());
    navigate('/');
  };

  return (
    <div className="container mx-auto pt-28 pb-16 px-4">
      <div className="flex items-center gap-6 mb-12">
        <Button asChild variant="ghost" className="p-0 hover:bg-transparent">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="h-12 w-12 stroke-[1.5]" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Saved Palettes</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {palettes.map((palette) => (
          <div key={palette.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
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
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(palette.colors, palette.id)}
                  className="rounded-full bg-white hover:bg-white/90"
                >
                  <Edit2 className="h-5 w-5 text-black" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(palette.id)}
                  className="rounded-full bg-white hover:bg-white/90"
                >
                  <Trash2 className="h-5 w-5 text-black" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">{palette.name}</h3>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingName(palette.name);
                        setEditingId(palette.id);
                      }}
                      className="hover:bg-transparent"
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Rename Palette</DialogTitle>
                      <DialogDescription>
                        Enter a new name for your palette
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      placeholder="Enter palette name"
                    />
                    <DialogFooter>
                      <Button onClick={handleRename}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {palette.colors.map((color, index) => (
                  <span key={index} className="text-xs font-mono text-gray-500 text-center">
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
