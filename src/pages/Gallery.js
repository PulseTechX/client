import React, { useEffect, useState } from 'react';
import axios from 'axios';
// ✅ NEW (Added Star)
import { Copy, Filter, Sparkles, TrendingUp, X, ZoomIn, Layers, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';
import CoffeeButton from '../components/CoffeeButton';
import SaveButton from '../components/SaveButton';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// EXPANDED Professional Category Structure (30+ Subcategories)
const CATEGORY_STRUCTURE = {
  'All': ['All'],
  
  'Image': [
    'Text to Image',
    'Image to Image',
    'Image Editing',
    'Image Enhancement',
    'AI Avatars',
    'Anime',
    '3D Render',
    'Photorealistic',
    'Digital Art',
    'Concept Art',
    'Logo Design',
    'Icon Design',
    'Pattern Design',
    'Texture Generation'
  ],
  
  'Video': [
    'Text to Video',
    'Image to Video',
    'Video Editing',
    'Video Enhancement',
    'AI Avatars',
    'Animation',
    'Motion Graphics',
    'Short Form',
    'Long Form',
    'Cinematic',
    'Commercial',
    'Social Media'
  ],
  
  'AI Model': [
    'Midjourney',
    'DALL-E 3',
    'Stable Diffusion',
    'Runway Gen-2',
    'Runway Gen-3',
    'Gemini',
    'ChatGPT',
    'Grok',
    'Claude',
    'Leonardo AI',
    'Adobe Firefly',
    'Ideogram',
    'Pika Labs',
    'Luma Dream Machine',
    'Kling AI',
    'HeyGen',
    'Synthesia'
  ],
  
  'Industry': [
    'Real Estate',
    'Entertainment',
    'Marketing',
    'Gaming',
    'Fashion',
    'Education',
    'Healthcare',
    'Finance',
    'Technology',
    'Food & Beverage',
    'Travel',
    'Automotive',
    'Sports',
    'Music',
    'E-commerce'
  ],
  
  'Style': [
    'Portrait',
    'Landscape',
    'Logo',
    'Abstract',
    'Photorealistic',
    'Artistic',
    'Minimalist',
    'Vintage',
    'Modern',
    'Cyberpunk',
    'Fantasy',
    'Sci-Fi',
    'Horror',
    'Comedy',
    'Dramatic'
  ],
  
  'Use Case': [
    'Social Media',
    'Website',
    'Print',
    'Presentation',
    'Advertising',
    'Personal',
    'Commercial',
    'Educational',
    'Entertainment',
    'Portfolio'
  ]
};

// Topic mapping to categories
const TOPIC_TO_CATEGORY = {
  'Portrait': 'Style',
  'Landscape': 'Style',
  'Logo': 'Style',
  'Abstract': 'Style',
  '3D Render': 'Image',
  'Anime': 'Image'
};

const Gallery = ({ searchQuery, onSearchChange }) => {
  const [prompts, setPrompts] = useState([]);
  const [promptOfDay, setPromptOfDay] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All',
    subcategory: 'All',
    trending: false
  });
  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Prompts (FIXED FILTER LOGIC)
  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        
        // Only add params if BOTH category AND subcategory are not 'All'
        if (filters.category !== 'All' && filters.subcategory !== 'All') {
          // Map frontend categories to backend API parameters
          switch (filters.category) {
            case 'AI Model':
              params.append('model', filters.subcategory);
              console.log('🔍 Filtering by AI Model:', filters.subcategory);
              break;
            case 'Industry':
              params.append('industry', filters.subcategory);
              console.log('🔍 Filtering by Industry:', filters.subcategory);
              break;
            case 'Style':
            case 'Image':
            case 'Video':
            case 'Use Case':
              params.append('topic', filters.subcategory);
              console.log('🔍 Filtering by Topic:', filters.subcategory);
              break;
            default:
              params.append('topic', filters.subcategory);
          }
        }
        
        if (filters.trending) {
          params.append('trending', 'true');
          console.log('🔍 Filtering by Trending');
        }
        
        console.log('🔍 API Request:', `${API_URL}/api/prompts?${params.toString()}`);
        
        const res = await axios.get(`${API_URL}/api/prompts?${params.toString()}`);
        console.log('✅ Prompts loaded:', res.data.length);
        setPrompts(res.data);
      } catch (error) {
        console.error('❌ Error loading prompts:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Error loading prompts';
        setToast({ message: errorMessage, type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [filters]);

  // Fetch Prompt of the Day
  useEffect(() => {
    const fetchPromptOfDay = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/prompts/prompt-of-the-day`);
        if (res.data && res.data._id) {
          setPromptOfDay(res.data);
        }
      } catch (error) {
        console.error('Error fetching prompt of the day:', error);
      }
    };

    fetchPromptOfDay();
  }, []);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setToast({ message: 'Prompt Copied!', type: 'success' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    onSearchChange('');
  };

  const handleTagClick = (tagType, tagValue) => {
    if (!tagValue) return;
    
    if (tagType === 'industry') {
      setFilters({ category: 'Industry', subcategory: tagValue, trending: false });
      setShowFilters(true);
    } else if (tagType === 'topic') {
      const category = TOPIC_TO_CATEGORY[tagValue] || 'Style';
      setFilters({ category, subcategory: tagValue, trending: false });
      setShowFilters(true);
    } else if (tagType === 'model') {
      setFilters({ category: 'AI Model', subcategory: tagValue, trending: false });
      setShowFilters(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({ category: 'All', subcategory: 'All', trending: false });
    onSearchChange('');
  };

  const hasActiveFilters = filters.category !== 'All' || filters.subcategory !== 'All' || filters.trending || searchQuery !== '';

  const getSubcategories = (category) => {
    return CATEGORY_STRUCTURE[category] || ['All'];
  };

  const subcategories = getSubcategories(filters.category);

  const displayedPrompts = searchQuery.trim() === '' 
    ? prompts 
    : prompts.filter(prompt =>
        (prompt.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prompt.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prompt.promptText || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prompt.aiModel || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prompt.industry || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prompt.topic || '').toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* COMPACT TWO-COLUMN BANNER */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {promptOfDay && (
          <Link to={`/prompt/${promptOfDay._id}`} className="relative p-2 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border border-purple-500/20">
                <img src={promptOfDay.mediaUrl} alt={promptOfDay.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <Sparkles size={10} className="text-yellow-400" fill="currentColor" />
                  <h2 className="text-[10px] font-bold text-white">Prompt of the Day</h2>
                </div>
                <h3 className="text-[11px] font-semibold text-purple-300 truncate">{promptOfDay.title}</h3>
              </div>
            </div>
          </Link>
        )}

        <Link to="/ai-tools" className="relative p-2 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-blue-500/20 overflow-hidden hover:border-blue-500/40 transition group">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <Sparkles size={10} className="text-yellow-400" fill="currentColor" />
                <h2 className="text-[10px] font-bold text-white">Top AI Tools</h2>
              </div>
              <h3 className="text-[11px] font-semibold text-blue-300 group-hover:text-blue-200 transition">View 100+ Tools →</h3>
            </div>
          </div>
        </Link>
      </div>

      {/* Header Section */}
      <div className="relative py-2 mb-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-extrabold text-white">
              Discover <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">AI Prompts</span>
            </h1>
            <p className="text-gray-500 text-xs">
              {loading ? 'Loading...' : `${displayedPrompts.length} prompts • Copy & create`}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => handleFilterChange('trending', !filters.trending)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition text-xs ${
                filters.trending 
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              <TrendingUp size={14} />
              <span className="hidden sm:inline">Trending</span>
            </button>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition text-xs ${
                showFilters || hasActiveFilters
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              <Filter size={14} />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
            </button>
          </div>
        </div>
      </div>

      {/* Professional Filter Bar - HIDDEN BY DEFAULT */}
      {showFilters && (
        <div className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl mb-3 border border-gray-700/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-400 flex items-center gap-1">
              <Layers size={12} />
              Filter Prompts
            </h2>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-blue-400 hover:text-blue-300 hover:underline">
                  Clear all
                </button>
              )}
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white transition" title="Close filters">
                <X size={14} />
              </button>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.keys(CATEGORY_STRUCTURE).map((category) => (
              <button
                key={category}
                onClick={() => {
                  handleFilterChange('category', category);
                  handleFilterChange('subcategory', 'All');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filters.category === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-900/80 text-gray-400 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Subcategory Filter */}
          {filters.category !== 'All' && (
            <div className="flex flex-wrap gap-2 pl-0">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => handleFilterChange('subcategory', subcategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filters.subcategory === subcategory
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-900/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50'
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          )}

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-700/50">
              {filters.category !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full text-xs border border-blue-700/50">
                  Category: {filters.category}
                  <button onClick={() => handleFilterChange('category', 'All')} className="hover:text-white">×</button>
                </span>
              )}
              {filters.subcategory !== 'All' && filters.category !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-700/50">
                  {filters.subcategory}
                  <button onClick={() => handleFilterChange('subcategory', 'All')} className="hover:text-white">×</button>
                </span>
              )}
              {filters.trending && (
                <span className="inline-flex items-center gap-1 bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded-full text-xs border border-yellow-700/50">
                  🔥 Trending
                  <button onClick={() => handleFilterChange('trending', false)} className="hover:text-white">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-green-900/50 text-green-300 px-2 py-1 rounded-full text-xs border border-green-700/50">
                  🔍 "{searchQuery}"
                  <button onClick={() => onSearchChange('')} className="hover:text-white">×</button>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading prompts...</p>
        </div>
      )}

      {/* Prompts Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedPrompts.map((prompt) => (
            <div 
              key={prompt._id} 
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20"
            >
              <Link to={`/prompt/${prompt._id}`} className="block relative aspect-square bg-gray-900 overflow-hidden">
                {prompt.mediaType === 'video' ? (
                  <video src={prompt.mediaUrl} controls className="w-full h-full object-cover" onClick={(e) => e.stopPropagation()} />
                ) : (
                  <>
                    <img src={prompt.mediaUrl} alt={prompt.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 cursor-zoom-in"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedImage(prompt.mediaUrl); }}
                    >
                      <ZoomIn size={32} className="text-white" />
                    </div>
                  </>
                )}
                
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {prompt.isTrending && (
                    <span className="bg-yellow-500/90 backdrop-blur-sm text-black px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      <Sparkles size={10} /> TRENDING
                    </span>
                  )}
                  {prompt.isPromptOfDay && (
                    <span className="bg-purple-500/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      ⭐ Prompt of the Day
                    </span>
                  )}
                </div>
                
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white font-medium">
                  {prompt.aiModel}
                </div>
              </Link>

              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <Link to={`/prompt/${prompt._id}`} className="block flex-1">
                    <h3 className="font-bold text-white text-sm truncate hover:text-blue-400 transition">{prompt.title}</h3>
                  </Link>
                  <SaveButton promptId={prompt._id} />
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {prompt.industry && (
                    <span className="bg-purple-900/50 text-purple-300 px-1.5 py-0.5 rounded text-xs cursor-pointer hover:bg-purple-700/50 hover:text-white transition"
                      onClick={(e) => { e.stopPropagation(); handleTagClick('industry', prompt.industry); }}
                      title={`Click to filter by ${prompt.industry}`}
                    >
                      {prompt.industry}
                    </span>
                  )}
                  {prompt.topic && (
                    <span className="bg-gray-700/50 text-gray-300 px-1.5 py-0.5 rounded text-xs cursor-pointer hover:bg-gray-600/50 hover:text-white transition"
                      onClick={(e) => { e.stopPropagation(); handleTagClick('topic', prompt.topic); }}
                      title={`Click to filter by ${prompt.topic}`}
                    >
                      {prompt.topic}
                    </span>
                  )}
                  {prompt.aiModel && (
                    <span className="bg-blue-900/50 text-blue-300 px-1.5 py-0.5 rounded text-xs cursor-pointer hover:bg-blue-700/50 hover:text-white transition"
                      onClick={(e) => { e.stopPropagation(); handleTagClick('model', prompt.aiModel); }}
                      title={`Click to filter by ${prompt.aiModel}`}
                    >
                      {prompt.aiModel}
                    </span>
                  )}
                </div>
                
                <div className="bg-gray-900/80 p-2 rounded-lg border border-gray-700/50 mb-2">
                  <p className="text-xs text-gray-400 font-mono line-clamp-2 leading-relaxed">{prompt.promptText}</p>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); copyToClipboard(prompt.promptText, prompt._id); }}
                  className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition font-semibold text-sm ${
                    copiedId === prompt._id 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {copiedId === prompt._id ? (<>✓ Copied!</>) : (<><Copy size={14} /> Copy Prompt</>)}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Empty State */}
      {!loading && displayedPrompts.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-800 rounded-full mb-3">
            <Sparkles size={28} className="text-gray-600" />
          </div>
          <p className="text-lg text-gray-400 mb-2">No prompts found</p>
          <p className="text-gray-500 text-xs mb-3">
            {searchQuery ? 'Try a different search term' : 'Try adjusting your filters'}
          </p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-blue-400 hover:text-blue-300 hover:underline text-xs">
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-3 border-t border-gray-800 text-center">
        <p className="text-gray-600 text-xs mb-3">
          {displayedPrompts.length} prompts • Made with ❤️ for AI creators
        </p>
        <div className="flex justify-center mb-4">
          <CoffeeButton size="small" />
        </div>
        <div className="max-w-4xl mx-auto mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-gray-500 text-xs mb-2">Advertisement</p>
          <div className="h-24 flex items-center justify-center text-gray-600 text-sm">
            Google AdSense Banner (728x90)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;