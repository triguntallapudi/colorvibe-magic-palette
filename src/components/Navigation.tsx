
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "react-router-dom";
import { UserRound, BookmarkIcon, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const { data: { user }, signOut } = useAuth();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    setMounted(true);
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
          <Link to="/" className="text-xl font-bold">
            ColorVibe
          </Link>
          <div className="flex items-center gap-4 mr-8">
            {user ? (
              <>
                <Link to="/saved">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white">
                    <BookmarkIcon className="h-5 w-5 mr-2" />
                    Saved Palettes
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white">
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
                    <DropdownMenuItem onClick={handleSignOut} className="hover:bg-gray-700 text-white cursor-pointer">
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
                    className="text-white h-9 px-4 hover:bg-gray-700 hover:text-white"
                  >
                    <span className="flex items-center justify-center">Log In</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="sm"
                    className="bg-white text-black h-9 px-4 hover:bg-gray-200 hover:text-black"
                  >
                    <span className="flex items-center justify-center">Sign Up</span>
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
