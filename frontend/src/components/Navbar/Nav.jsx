'use client';

import { LogOut, Menu, PenTool, User, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils.js';
import { logout } from '../../store/slice/authSlice.js';
import { Button } from '../ui/button.jsx';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-primary"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <PenTool className="h-8 w-8" />
          <span>BlogHub</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/create">
                <Button variant="default" size="sm">
                  <PenTool className="mr-2 h-4 w-4" />
                  Write Blog
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  {user?.name}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden border-t bg-background',
          isMobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="container py-4 space-y-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/create"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PenTool className="h-4 w-4" />
                <span>Write Blog</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </Link>
              <Button
                onClick={handleLogout}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block p-2 rounded-md hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block p-2 rounded-md hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
