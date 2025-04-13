
import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
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
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced fetchPalettes function that uses supabase directly each time
  const fetchPalettes = useCallback(async () => {
    console.log("Fetching palettes...");
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to view saved palettes"
        });
        navigate('/login');
        return;
      }

      // Clear all palettes from the database when the component first loads
      const { error: clearError } = await supabase
        .from('palettes')
        .delete()
        .eq('user_id', user.id);
        
      if (clearError) {
        console.error("Clear error:", clearError);
      } else {
        console.log("All palettes have been cleared");
      }
      
      // Get fresh data directly from Supabase
      const { data, error } = await supabase
        .from('palettes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load palettes"
        });
        return;
      }

      console.log("Fetched palettes:", data);
      setPalettes(data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Force a refetch on initial mount only
  useEffect(() => {
    fetchPalettes();
  }, [fetchPalettes]);

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      console.log("Deleting palette with ID:", id);
      
      const { error } = await supabase
        .from('palettes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Delete error:", error);
        throw error;
      }

      console.log("Palette deleted successfully");
      
      // Update the local state to reflect the deletion immediately
      setPalettes(prevPalettes => prevPalettes.filter(palette => palette.id !== id));
      
      toast({
        title: "Success",
        description: "Palette deleted successfully"
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete palette"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllPalettes = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { error } = await supabase
        .from('palettes')
        .delete()
        .eq('user_id', user.id);
        
      if (error) {
        console.error("Delete all error:", error);
        throw error;
      }
      
      toast({
        title: "Success",
        description: "All palettes deleted successfully"
      });
      
      setPalettes([]);
    } catch (error) {
      console.error("Clear all error:", error);
      toast({
        title: "Error",
        description: "Failed to delete all palettes"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRename = async () => {
    if (!editingId || !editingName.trim()) return;

    try {
      setIsLoading(true);
      console.log("Renaming palette with ID:", editingId, "to:", editingName);
      
      const { error } = await supabase
        .from('palettes')
        .update({ name: editingName })
        .eq('id', editingId);

      if (error) {
        console.error("Rename error:", error);
        throw error;
      }

      console.log("Palette renamed successfully");
      
      // Update the local state to reflect the name change
      setPalettes(prevPalettes => 
        prevPalettes.map(palette => 
          palette.id === editingId ? { ...palette, name: editingName } : palette
        )
      );
      
      setDialogOpen(false);
      setEditingId(null);
      setEditingName('');

      toast({
        title: "Success",
        description: "Palette renamed successfully"
      });
    } catch (error) {
      console.error("Rename error:", error);
      toast({
        title: "Error",
        description: "Failed to rename palette"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (colors: string[], id: number) => {
    try {
      console.log("Setting up for editing palette with ID:", id);
      
      // Store the palette data in localStorage for the editor page
      localStorage.setItem('editingPalette', JSON.stringify(colors));
      localStorage.setItem('editingPaletteId', id.toString());
      
      // Clear any previous editing state to ensure we're starting fresh
      localStorage.removeItem('savedColors');
      localStorage.removeItem('currentKeyword');
      
      navigate('/');
    } catch (error) {
      console.error("Edit setup error:", error);
      toast({
        title: "Error",
        description: "Failed to set up palette editing"
      });
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && saveButtonRef.current) {
      e.preventDefault();
      saveButtonRef.current.click();
    }
  };

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="flex items-center mb-8">
        <Link to="/" className="bg-black text-white hover:bg-[#333333] rounded-md p-2 flex items-center justify-center transition-colors mr-3 self-start">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">Saved Palettes</h1>
        
        <Button 
          onClick={clearAllPalettes} 
          className="ml-auto bg-black text-white hover:bg-[#333333]"
          disabled={isLoading}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading palettes...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {palettes.map((palette) => (
              <div key={palette.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-300 hover:shadow-md transition-shadow hover:shadow-lg">
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
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{palette.name}</h3>
                    <Dialog open={dialogOpen && editingId === palette.id} onOpenChange={(open) => {
                      setDialogOpen(open);
                      if (!open) {
                        setEditingId(null);
                        setEditingName('');
                      }
                    }}>
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
                          onKeyDown={handleInputKeyDown}
                          placeholder="Enter palette name"
                          autoFocus
                        />
                        <DialogFooter>
                          <Button onClick={handleRename} ref={saveButtonRef} className="bg-black text-white font-medium hover:bg-[#333333]">Save</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid grid-cols-5 gap-4 mt-4">
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
        </>
      )}
    </div>
  );
};

export default Saved;
