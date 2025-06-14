// src/components/Navbar.tsx
import { useRecoilState } from "recoil";
import { authState } from "../store/authAtom";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogIn, UserPlus, PlusCircle, LayoutDashboard, Code } from "lucide-react";

export default function Navbar() {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth({ loggedIn: false, token: null });
    navigate("/login");
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
          >
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-200">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LeetTracker
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
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
        </div>
      </div>
    </nav>
  );
}