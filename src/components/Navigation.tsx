
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "react-router-dom";
import { UserRound, BookmarkIcon, ChevronDown, Sun, Moon, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const { data: { user }, signOut } = useAuth();
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference, default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      // Default to light mode
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  if (!mounted) {
    return null;
  }

  // Don't show any buttons on login or signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return (
      <nav className="fixed top-0 left-0 right-0 bg-black text-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold">
              ColorVibe
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {location.pathname === '/saved' ? (
            <div className="flex items-center">
              <Link to="/" className="text-white mr-2">
                <ChevronLeft className="h-6 w-6" />
              </Link>
              <span className="text-xl font-bold">Back to Generator</span>
            </div>
          ) : (
            <Link to="/" className="text-xl font-bold">
              ColorVibe
            </Link>
          )}
          <div className="flex items-center gap-4 mr-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              className="text-white hover:bg-gray-800 hover:text-white rounded-md"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            {user ? (
              <>
                <Link to="/saved">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 hover:text-white rounded-md">
                    <BookmarkIcon className="h-5 w-5 mr-2" />
                    Saved Palettes
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 hover:text-white rounded-md">
                      <UserRound className="h-5 w-5 mr-2" />
                      Profile
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-black text-white border-gray-700">
                    <DropdownMenuLabel className="text-gray-400">
                      <div className="text-sm font-normal text-gray-400">{user.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={toggleTheme} className="hover:bg-gray-800 text-white cursor-pointer">
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="hover:bg-gray-800 text-white cursor-pointer">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-gray-800 hover:text-white transition-colors rounded-md"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="sm" 
                    className="bg-white text-black hover:bg-gray-200 hover:text-black transition-colors rounded-md"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
