
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, LogIn, UserPlus, Save, LogOut, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              ColorVibe
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-gray-800"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <Button variant="ghost" asChild className="text-white hover:bg-gray-800">
                  <Link to="/saved">
                    <Save className="mr-2 h-4 w-4" />
                    Saved Palettes
                  </Link>
                </Button>
                <Button variant="ghost" className="text-white hover:bg-gray-800">
                  <User className="mr-2 h-4 w-4" />
                  {user.email}
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-gray-800">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-white hover:bg-gray-800">
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button variant="default" asChild className="bg-white text-black hover:bg-gray-100">
                  <Link to="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {user ? (
                <>
                  <Button variant="ghost" asChild className="justify-start text-white hover:bg-gray-800">
                    <Link to="/saved">
                      <Save className="mr-2 h-4 w-4" />
                      Saved Palettes
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start text-white hover:bg-gray-800">
                    <User className="mr-2 h-4 w-4" />
                    {user.email}
                  </Button>
                  <Button variant="ghost" onClick={handleLogout} className="justify-start text-white hover:bg-gray-800">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="justify-start text-white hover:bg-gray-800">
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button variant="default" asChild className="justify-start bg-white text-black hover:bg-gray-100">
                    <Link to="/signup">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
