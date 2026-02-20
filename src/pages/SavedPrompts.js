import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import axios from 'axios';
import Toast from '../components/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SavedPrompts = () => {
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchSavedPrompts();
  }, []);

  const fetchSavedPrompts = async () => {
    try {
      const savedIds = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
      
      if (savedIds.length === 0) {
        setSavedPrompts([]);
        setLoading(false);
        return;
      }

      const res = await axios.get(`${API_URL}/api/prompts`);
      const filtered = res.data.filter(prompt => savedIds.includes(prompt._id));
      setSavedPrompts(filtered);
    } catch (error) {
      setToast({ message: 'Error loading saved prompts', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const removePrompt = (id) => {
    const savedIds = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
    const updated = savedIds.filter(savedId => savedId !== id);
    localStorage.setItem('savedPrompts', JSON.stringify(updated));
    fetchSavedPrompts();
    setToast({ message: 'Removed from saved', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <Heart className="text-red-500" fill="currentColor" size={28} />
          Saved Prompts
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {savedPrompts.length} prompts saved • Stored in your browser
        </p>

        {savedPrompts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-4">
              <Heart size={40} className="text-gray-600" />
            </div>
            <p className="text-xl text-gray-400 mb-2">No saved prompts yet</p>
            <p className="text-gray-500 text-sm mb-4">
              Click the heart icon on any prompt to save it
            </p>
            <Link to="/" className="text-blue-400 hover:underline">
              Browse Gallery →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {savedPrompts.map((prompt) => (
              <div 
                key={prompt._id} 
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50"
              >
                <Link to={`/prompt/${prompt._id}`} className="block">
                  <div className="relative aspect-square bg-gray-900 overflow-hidden">
                    <img 
                      src={prompt.mediaUrl} 
                      alt={prompt.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <Link to={`/prompt/${prompt._id}`}>
                    <h3 className="font-bold text-white text-sm truncate mb-2 hover:text-blue-400 transition">
                      {prompt.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{prompt.aiModel}</span>
                    <button
                      onClick={() => removePrompt(prompt._id)}
                      className="text-red-400 hover:text-red-300 transition p-1"
                      title="Remove from saved"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPrompts;