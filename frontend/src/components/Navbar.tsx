// src/components/Navbar.tsx
import { useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../store/authAtom";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogIn, UserPlus, PlusCircle, LayoutDashboard, Code, Menu, X } from "lucide-react";
import toast from 'react-hot-toast';

export default function Navbar() {
  const [auth, setAuth] = useRecoilState(authState);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // Show loading toast
    const loadingToast = toast.loading('Logging out...');

    try {
      localStorage.removeItem("token");
      setAuth({ loggedIn: false, token: null });
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Logged out successfully!', {
        icon: '👋',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#10B981',
          color: '#fff',
        },
      });

      // Navigate after a brief delay to show the success toast
      setTimeout(() => {
        navigate("/login");
      }, 500);

    } catch (error) {
      // Dismiss loading toast and show error (though this is unlikely to fail)
      toast.dismiss(loadingToast);
      toast.error('Something went wrong during logout', {
        icon: '❌',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#EF4444',
          color: '#fff',
        },
      });
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link 
            to="/"
            className="flex items-center gap-2 sm:gap-3 group transition-all duration-200 hover:scale-105"
            onClick={closeMobileMenu}
          >
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-200">
              <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LeetTracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {!auth.loggedIn ? (
              <>
                <Link 
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                >
                  <LogIn size={16} /> 
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium hover:scale-105"
                >
                  <UserPlus size={16} /> 
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                >
                  <LayoutDashboard size={16} /> 
                  Dashboard
                </Link>
                <Link 
                  to="/add-question"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 font-medium"
                >
                  <PlusCircle size={16} /> 
                  Add Question
                </Link>
                
                {/* Divider */}
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-200 font-medium hover:shadow-lg hover:scale-105"
                >
                  <LogOut size={16} /> 
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-2">
              {!auth.loggedIn ? (
                <>
                  <Link 
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    <LogIn size={18} /> 
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    <UserPlus size={18} /> 
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    <LayoutDashboard size={18} /> 
                    Dashboard
                  </Link>
                  <Link 
                    to="/add-question"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    <PlusCircle size={18} /> 
                    Add Question
                  </Link>
                  
                  {/* Mobile Divider */}
                  <hr className="border-gray-200 my-2" />
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-200 font-medium w-full text-left"
                  >
                    <LogOut size={18} /> 
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}