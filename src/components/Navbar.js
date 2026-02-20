import React from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Heart, Folder, Zap, BookOpen } from 'lucide-react';

const Navbar = ({ searchQuery, onSearchChange }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <Link 
          to="/" 
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap"
        >
          PromptHeroClone
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-gray-800 text-white text-sm pl-10 pr-10 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none placeholder-gray-500 transition"
            />
            {searchQuery && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right: Navigation Links (Like Your Screenshot) */}
        <div className="flex items-center gap-1">
          {/* Gallery Link */}
          <Link 
            to="/" 
            className="text-sm text-gray-300 hover:text-white transition font-medium whitespace-nowrap px-3 py-2 rounded-lg hover:bg-gray-800"
          >
            Gallery
          </Link>

          {/* Saved Prompts Link */}
          <Link 
            to="/saved" 
            className="text-sm text-gray-300 hover:text-red-400 transition font-medium whitespace-nowrap flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-800"
            title="Saved Prompts"
          >
            <Heart size={16} />
            <span className="hidden lg:inline">Saved</span>
          </Link>

          {/* Collections Link */}
          <Link 
            to="/collections" 
            className="text-sm text-gray-300 hover:text-purple-400 transition font-medium whitespace-nowrap flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-800"
            title="Collections"
          >
            <Folder size={16} />
            <span className="hidden lg:inline">Collections</span>
          </Link>

          {/* AI Tools Link */}
          <Link 
            to="/ai-tools" 
            className="text-sm text-gray-300 hover:text-yellow-400 transition font-medium whitespace-nowrap flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-800"
            title="AI Tools"
          >
            <Zap size={16} />
            <span className="hidden lg:inline">AI Tools</span>
          </Link>

          {/* Blog Link */}
          <Link 
            to="/blog" 
            className="text-sm text-gray-300 hover:text-green-400 transition font-medium whitespace-nowrap flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-800"
            title="Blog"
          >
            <BookOpen size={16} />
            <span className="hidden lg:inline">Blog</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-800 text-white text-sm pl-10 pr-10 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none placeholder-gray-500 transition"
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-800 overflow-x-auto">
          <Link 
            to="/" 
            className="text-xs text-gray-400 hover:text-white transition whitespace-nowrap px-2 py-1"
          >
            Gallery
          </Link>
          <Link 
            to="/saved" 
            className="text-xs text-gray-400 hover:text-red-400 transition whitespace-nowrap flex items-center gap-1 px-2 py-1"
          >
            <Heart size={12} />
            Saved
          </Link>
          <Link 
            to="/collections" 
            className="text-xs text-gray-400 hover:text-purple-400 transition whitespace-nowrap flex items-center gap-1 px-2 py-1"
          >
            <Folder size={12} />
            Collections
          </Link>
          <Link 
            to="/ai-tools" 
            className="text-xs text-gray-400 hover:text-yellow-400 transition whitespace-nowrap flex items-center gap-1 px-2 py-1"
          >
            <Zap size={12} />
            AI Tools
          </Link>
          <Link 
            to="/blog" 
            className="text-xs text-gray-400 hover:text-green-400 transition whitespace-nowrap flex items-center gap-1 px-2 py-1"
          >
            <BookOpen size={12} />
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;