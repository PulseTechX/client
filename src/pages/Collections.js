import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// ✅ NEW (Added Eye)
import { Folder, Plus, Trash2, Eye } from 'lucide-react';

const API_URL = 'http://localhost:5000';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/collections`);
      setCollections(res.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          📦 Prompt Collections
        </h1>
        <p className="text-gray-400 mb-8">
          Curated bundles of the best prompts for specific use cases
        </p>

        {collections.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-4">
              <Folder size={40} className="text-gray-600" />
            </div>
            <p className="text-gray-400 mb-2">No collections yet</p>
            <p className="text-gray-500 text-sm">Check back soon for curated prompt bundles!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection._id}
                to={`/collections/${collection.slug}`}
                className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition"
              >
                <div className="aspect-video bg-gray-900 overflow-hidden">
                  <img
                    src={collection.coverImage}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-purple-400 font-semibold">{collection.category}</span>
                  <h2 className="text-lg font-bold text-white mt-2 mb-2 group-hover:text-purple-400 transition">
                    {collection.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{collection.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Folder size={14} />
                      {collection.prompts?.length || 0} prompts
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      {collection.views} views
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter Signup Section */}
        <NewsletterSection />
      </div>
    </div>
  );
};

// Newsletter Component
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with ConvertKit, Substack, or your email service
    console.log('Newsletter signup:', email);
    setSubscribed(true);
    setEmail('');
    
    // Show success message
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="mt-16 p-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20">
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

export default Collections;