import { Home, Search, ArrowLeft, MapPin } from "lucide-react";

const NotFound = () => {
  const handleGoHome = () => {
    // Navigate to home - replace with your routing logic
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
        
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text animate-pulse">
            404
          </div>
          <div className="absolute inset-0 text-8xl font-bold text-blue-200 opacity-20 transform translate-x-1 translate-y-1">
            404
          </div>
        </div>

        {/* Icon with Animation */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg animate-bounce">
            <MapPin className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Go to Home
          </button>
          
          <button
            onClick={handleGoBack}
            className="group w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
          <div className="flex items-center gap-2 text-slate-600 mb-2">
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium">Quick Suggestion</span>
          </div>
          <p className="text-xs text-slate-500">
            Try checking the URL for typos or use the navigation menu to find what you're looking for.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-0 w-8 h-8 bg-indigo-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;