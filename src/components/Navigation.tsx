
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, LogIn, UserPlus, Save, Palette } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Palette className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">ColorVibe</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/saved">
                <Save className="mr-2 h-4 w-4" />
                Saved Palettes
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" asChild className="justify-start">
                <Link to="/saved">
                  <Save className="mr-2 h-4 w-4" />
                  Saved Palettes
                </Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button variant="default" asChild className="justify-start">
                <Link to="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
