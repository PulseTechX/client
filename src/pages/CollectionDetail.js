import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Copy, ArrowLeft, Folder, Eye, Download, Share2 } from 'lucide-react';
import Toast from '../components/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CollectionDetail = () => {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCollection();
  }, [slug]);

  const fetchCollection = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/collections/${slug}`);
      setCollection(res.data);
    } catch (error) {
      console.error('Error fetching collection:', error);
      setToast({ message: 'Error loading collection', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToast({ message: 'Prompt copied!', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Collection not found</p>
          <Link to="/collections" className="text-blue-400 hover:underline">Back to Collections</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          to="/collections" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ArrowLeft size={18} />
          <span>Back to Collections</span>
        </Link>

        {/* Collection Header */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={collection.coverImage} 
                alt={collection.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1">
              <span className="text-sm text-purple-400 font-semibold">{collection.category}</span>
              <h1 className="text-3xl font-bold text-white mt-2 mb-4">{collection.title}</h1>
              <p className="text-gray-400 mb-6">{collection.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Folder size={16} />
                  {collection.prompts?.length || 0} prompts
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  {collection.views} views
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prompts Grid */}
        <h2 className="text-xl font-bold text-white mb-4">
          Prompts in this Collection ({collection.prompts?.length || 0})
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {collection.prompts?.map((prompt) => (
            <div 
              key={prompt._id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50"
            >
              <Link to={`/prompt/${prompt._id}`} className="block">
                <div className="aspect-square bg-gray-900 overflow-hidden">
                  <img 
                    src={prompt.mediaUrl} 
                    alt={prompt.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              </Link>
              <div className="p-3">
                <Link to={`/prompt/${prompt._id}`}>
                  <h3 className="font-bold text-white text-sm truncate mb-2 hover:text-blue-400 transition">
                    {prompt.title}
                  </h3>
                </Link>
                <div className="bg-gray-900/80 p-2 rounded-lg border border-gray-700/50 mb-2">
                  <p className="text-xs text-gray-400 font-mono line-clamp-2">
                    {prompt.promptText}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => copyToClipboard(prompt.promptText)}
                    className="flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Copy size={12} />
                    Copy
                  </button>
                  {/* Download Button - Inline */}
                  <button 
                    onClick={() => handleDownload(prompt)}
                    className="py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition font-semibold text-xs bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <Download size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16">
          <NewsletterSection />
        </div>
      </div>
    </div>
  );
};

// Download Handler Function
const handleDownload = async (prompt) => {
  try {
    const response = await fetch(prompt.mediaUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prompt.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

// Newsletter Component
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">
          📧 Get Premium Prompts Weekly
        </h2>
        <p className="text-gray-400 mb-6">
          Join 5,000+ creators getting 5 premium prompts delivered to their inbox every week.
        </p>
        
        {subscribed ? (
          <div className="bg-green-900/30 border border-green-500/30 text-green-400 px-6 py-3 rounded-lg">
            ✅ Thanks for subscribing! Check your inbox soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 outline-none"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Subscribe Free
            </button>
          </form>
        )}
        
        <p className="text-gray-500 text-xs mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default CollectionDetail;