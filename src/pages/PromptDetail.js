import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// ✅ NEW (Added TrendingUp, Clock, Eye)
import { Copy, Share2, ArrowLeft, Heart, Download, Star, TrendingUp, Clock, Eye } from 'lucide-react';
import Toast from '../components/Toast';
import ShareButtons from '../components/ShareButtons';
import CoffeeButton from '../components/CoffeeButton';
import AffiliateLink from '../components/AffiliateLink';
import SaveButton from '../components/SaveButton';
import DownloadCard from '../components/DownloadCard'; // NEW IMPORT

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [relatedPrompts, setRelatedPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState({ prompt: false, negative: false });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/prompts/${id}`);
        setPrompt(res.data);
        document.title = `${res.data.title} - AI Prompt | PromptHeroClone`;
      } catch (error) {
        setToast({ message: 'Prompt not found', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/prompts/related/${id}`);
        setRelatedPrompts(res.data);
      } catch (error) {
        console.error('Error fetching related:', error);
      }
    };

    fetchPrompt();
    fetchRelated();
  }, [id]);

  const copyToClipboard = async (text, type) => {
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [type]: true });
      setToast({ message: `${type === 'prompt' ? 'Prompt' : 'Negative Prompt'} copied!`, type: 'success' });
      
      console.log('📋 Copy clicked for prompt:', id);
      
      // OPTIMISTIC UPDATE: Update UI immediately
      setPrompt(prev => ({
        ...prev,
        copyCount: (prev.copyCount || 0) + 1
      }));
      
      // Increment copy count on server
      const copyRes = await axios.post(`${API_URL}/api/prompts/${id}/copy`);
      console.log('✅ Copy count response:', copyRes.data);
      
      // Fetch fresh data from server to confirm
      setTimeout(async () => {
        try {
          const promptRes = await axios.get(`${API_URL}/api/prompts/${id}`);
          console.log('🔄 Fresh data from server:', promptRes.data);
          setPrompt(promptRes.data);
        } catch (error) {
          console.error('❌ Failed to fetch fresh data:', error);
        }
      }, 500);
      
    } catch (error) {
      console.error('❌ Copy error:', error);
      setToast({ message: 'Failed to copy', type: 'error' });
    }

    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
    setTimeout(() => setToast(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Prompt not found</p>
          <Link to="/" className="text-blue-400 hover:underline">Back to Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Back Button */}
      <div className="py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          <span>Back to Gallery</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Image/Video + Details */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
            <div className="aspect-video bg-gray-900">
              {prompt.mediaType === 'video' ? (
                <video src={prompt.mediaUrl} controls className="w-full h-full object-cover" />
              ) : (
                <img src={prompt.mediaUrl} alt={prompt.title} className="w-full h-full object-cover" />
              )}
            </div>
          </div>

          {/* Prompt Details */}
          <div className="mt-6 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{prompt.title}</h1>
                {/* Prompt of the Day Badge */}
                {prompt.isPromptOfDay && (
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border border-purple-500/30">
                    <Star size={12} fill="currentColor" />
                    Prompt of the Day
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Save Button */}
                <SaveButton promptId={prompt._id} />
                <ShareButtons prompt={prompt} />
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <TrendingUp size={16} />
                <span>{prompt.copyCount || 0} copies</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock size={16} />
                <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Eye size={16} />
                <span>{prompt.aiModel}</span>
              </div>
            </div>

            {/* Tags with Affiliate Link */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Link 
                to={`/?topic=${prompt.topic}`}
                className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-xs hover:bg-purple-700/50 transition"
              >
                🏷️ {prompt.topic}
              </Link>
              <div className="flex items-center gap-2">
                <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs">
                  🤖 {prompt.aiModel}
                </span>
                {/* Affiliate Link */}
                <AffiliateLink aiModel={prompt.aiModel} />
              </div>
              <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-xs">
                🏢 {prompt.industry}
              </span>
              {prompt.isTrending && (
                <span className="bg-yellow-900/50 text-yellow-300 px-3 py-1 rounded-full text-xs">
                  🔥 Trending
                </span>
              )}
            </div>

            {/* Main Prompt */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Prompt</h3>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <p className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{prompt.promptText}</p>
              </div>
              
              {/* Action Buttons - Copy + Download */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => copyToClipboard(prompt.promptText, 'prompt')}
                  className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition font-semibold ${
                    copied.prompt
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Copy size={16} />
                  {copied.prompt ? '✓ Copied!' : 'Copy Prompt'}
                </button>
                
                {/* Download Card Button (NEW) */}
                <DownloadCard prompt={prompt} size="normal" />
              </div>
            </div>

            {/* Negative Prompt */}
            {prompt.negativePrompt && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">Negative Prompt</h3>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{prompt.negativePrompt}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(prompt.negativePrompt, 'negative')}
                  className={`mt-3 w-full py-2.5 rounded-lg flex items-center justify-center gap-2 transition font-semibold ${
                    copied.negative
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Copy size={16} />
                  {copied.negative ? '✓ Copied!' : 'Copy Negative Prompt'}
                </button>
              </div>
            )}

            {/* Description */}
            {prompt.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-2">Description</h3>
                <p className="text-gray-400 text-sm">{prompt.description}</p>
              </div>
            )}

            {/* Ad Placeholder - Below Content */}
            <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700 text-center">
              <p className="text-gray-500 text-xs mb-2">Advertisement</p>
              {/* Google AdSense Code Goes Here */}
              <div className="h-32 flex items-center justify-center text-gray-600 text-sm">
                Google AdSense Banner (728x90 or Responsive)
              </div>
            </div>
          </div>
        </div>

        {/* Right: Coffee + Related Prompts + Ads */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 sticky top-20">
            
            {/* Buy Me a Coffee - Prominent Placement */}
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
              <p className="text-gray-300 text-xs mb-3 text-center font-medium">
                ☕ Enjoying these prompts?
              </p>
              <div className="flex justify-center">
                <CoffeeButton size="normal" />
              </div>
              <p className="text-gray-500 text-xs text-center mt-2">
                Support this free resource!
              </p>
            </div>

            <h3 className="text-lg font-bold text-white mb-4">🔥 Related Prompts</h3>
            <p className="text-gray-400 text-xs mb-4">Same topic: {prompt.topic}</p>
            
            {relatedPrompts.length > 0 ? (
              <div className="space-y-3">
                {relatedPrompts.map((related) => (
                  <Link
                    key={related._id}
                    to={`/prompt/${related._id}`}
                    className="block group"
                  >
                    <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        {related.mediaType === 'video' ? (
                          <video src={related.mediaUrl} className="w-full h-full object-cover" />
                        ) : (
                          <img src={related.mediaUrl} alt={related.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition">
                          {related.title}
                        </h4>
                        {/* Affiliate Link for Related Prompt */}
                        <AffiliateLink aiModel={related.aiModel} />
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <TrendingUp size={12} />
                          {related.copyCount || 0} copies
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">No related prompts found</p>
            )}

            {/* Ad Placeholder - Sidebar */}
            <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700 text-center">
              <p className="text-gray-500 text-xs mb-2">Advertisement</p>
              {/* Google AdSense Code Goes Here */}
              <div className="h-64 flex items-center justify-center text-gray-600 text-sm">
                Google AdSense Vertical (300x250)
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromptDetail;