
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Create a wrapper component for TooltipProvider to ensure React hooks are used correctly
const TooltipWrapper = ({ children }: { children: React.ReactNode }) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};

const queryClient = new QueryClient();

const App = () => {
  console.log("Rendering App component"); // Debug log
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipWrapper>
        <BrowserRouter>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </BrowserRouter>
      </TooltipWrapper>
    </QueryClientProvider>
  );
};

export default App;
