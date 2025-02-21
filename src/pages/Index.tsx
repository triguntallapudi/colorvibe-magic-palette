
import PaletteGenerator from "@/components/PaletteGenerator";

const Index = () => {
  console.log("Rendering Index page"); // Debug log
  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <PaletteGenerator />
    </main>
  );
};

export default Index;
