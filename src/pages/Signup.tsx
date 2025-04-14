
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useRef, useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;

    if (password.length < 6) {
      console.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      console.error("Passwords don't match");
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      navigate('/login');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && submitButtonRef.current) {
      if (e.target instanceof HTMLInputElement) {
        return;
      }
      submitButtonRef.current.click();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword) {
      setPasswordMatch(e.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4" onKeyDown={handleKeyDown}>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start creating and saving your color palettes
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1"
                placeholder="At least 6 characters"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 ${!passwordMatch && confirmPassword ? 'border-red-500' : ''}`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!passwordMatch && confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Passwords don't match</p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
            ref={submitButtonRef}
            disabled={password && confirmPassword ? !passwordMatch : false}
          >
            Sign up
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-black hover:text-gray-700">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
