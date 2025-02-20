
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Saved = () => {
  // Will fetch saved palettes after Supabase connection
  const savedPalettes: string[][] = [];

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Generator
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Saved Palettes</h1>
        </div>

        {savedPalettes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No saved palettes yet</p>
            <Link to="/">
              <Button className="bg-black text-white hover:bg-black/90">
                Create Your First Palette
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {/* Will map through saved palettes here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
