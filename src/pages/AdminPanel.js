import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, BookOpen, Image, LogOut, Folder, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const ADMIN_KEY = 'MySuperSecretPassword123';
const SESSION_DURATION = 24 * 60 * 60 * 1000;

const CATEGORY_STRUCTURE = {
  'Media Type': ['Image', 'Video'],
  'AI Model': ['Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Runway Gen-2', 'Gemini', 'ChatGPT', 'Grok', 'Claude', 'Leonardo AI'],
  'Industry': ['Real Estate', 'Entertainment', 'Marketing', 'Gaming', 'Fashion', 'Education', 'Healthcare', 'Finance', 'Technology'],
  'Style': ['Portrait', 'Landscape', 'Logo', 'Abstract', 'Photorealistic', 'Artistic', 'Minimalist', 'Cyberpunk', 'Fantasy']
};

const COLLECTION_CATEGORIES = [
  'Logo Design', 'Social Media', 'Real Estate', 'Gaming', 'Fashion',
  'Portrait', 'Landscape', 'Abstract Art', '3D Render', 'Anime',
  'Marketing', 'Education', 'Music', 'Video Content', 'Writing'
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('prompts');
  const [prompts, setPrompts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [collections, setCollections] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '', description: '', promptText: '', negativePrompt: '',
    aiModel: 'Midjourney', industry: 'Marketing', topic: 'Logo',
    mediaType: 'image', isTrending: false, isPromptOfDay: false
  });
  
  const [blogData, setBlogData] = useState({
    title: '', slug: '', excerpt: '', content: '',
    author: 'Admin', category: 'Tutorial', tags: '', isPublished: false
  });
  
  const [collectionData, setCollectionData] = useState({
    title: '', slug: '', description: '', category: 'Logo Design',
    prompts: [], isPublished: false
  });
  
  const [file, setFile] = useState(null);
  const [blogFile, setBlogFile] = useState(null);
  const [collectionFile, setCollectionFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  // Toast notifications
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Check existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionData = localStorage.getItem('adminSession');
        
        if (sessionData) {
          const { token, expiry } = JSON.parse(sessionData);
          
          if (token === ADMIN_KEY && Date.now() < expiry) {
            setAuthorized(true);
            console.log('✅ Session valid');
          } else {
            localStorage.removeItem('adminSession');
            console.log('⚠️ Session expired');
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        localStorage.removeItem('adminSession');
      } finally {
        setCheckingAuth(false);
      }
    };

    checkSession();
  }, []);

  // Show password prompt if not authorized (FIXED - Removed userLoggedOut)
  useEffect(() => {
    if (checkingAuth) return;
    if (authorized) return;

    const password = window.prompt("🔒 Admin Access Only\nEnter Password:");
    
    if (password === ADMIN_KEY) {
      const sessionData = {
        token: ADMIN_KEY,
        expiry: Date.now() + SESSION_DURATION
      };
      localStorage.setItem('adminSession', JSON.stringify(sessionData));
      setAuthorized(true);
      showToast('✅ Authorized successfully!', 'success');
    } else if (password !== null) {
      showToast("❌ Wrong Password! Redirecting...", 'error');
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, [checkingAuth, authorized]);

  // Fetch data only when authorized
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (authorized) {
      fetchPrompts();
      fetchBlogs();
      fetchCollections();
    }
  }, [authorized]);

  const fetchPrompts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/prompts`);
      setPrompts(res.data);
    } catch (err) {
      console.error('Error fetching prompts:', err);
      showToast('❌ Error loading prompts', 'error');
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      showToast('❌ Error loading blogs', 'error');
    }
  };

  const fetchCollections = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/collections`);
      setCollections(res.data);
    } catch (err) {
      console.error('Error fetching collections:', err);
      showToast('❌ Error loading collections', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    setAuthorized(false);
    setCheckingAuth(true);
    showToast('👋 Logged out successfully!', 'success');
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      showToast('❌ Please select a file', 'error');
      return;
    }
    
    setLoading(true);
    const data = new FormData();
    
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('promptText', formData.promptText);
    data.append('negativePrompt', formData.negativePrompt);
    data.append('aiModel', formData.aiModel);
    data.append('industry', formData.industry);
    data.append('topic', formData.topic);
    data.append('mediaType', formData.mediaType);
    data.append('isTrending', formData.isTrending.toString());
    data.append('isPromptOfDay', formData.isPromptOfDay.toString());
    data.append('media', file);

    try {
      console.log('📤 Uploading prompt...');
      const response = await axios.post(`${API_URL}/api/prompts`, data, {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          'x-admin-key': ADMIN_KEY 
        }
      });
      
      console.log('✅ Upload Success:', response.data);
      showToast('✅ Prompt added successfully!', 'success');
      
      setFormData({ 
        title: '', description: '', promptText: '', negativePrompt: '',
        aiModel: 'Midjourney', industry: 'Marketing', topic: 'Logo',
        mediaType: 'image', isTrending: false, isPromptOfDay: false
      });
      setFile(null);
      fetchPrompts();
    } catch (err) {
      console.error('❌ Upload Error:', err);
      console.error('Error response:', err.response?.data);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Unknown error';
      showToast(`❌ Error: ${errorMsg}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!blogFile) {
      showToast('❌ Please select a cover image', 'error');
      return;
    }
    
    setLoading(true);
    const data = new FormData();
    
    data.append('title', blogData.title);
    data.append('slug', blogData.slug || blogData.title.toLowerCase().replace(/\s+/g, '-'));
    data.append('excerpt', blogData.excerpt);
    data.append('content', blogData.content);
    data.append('author', blogData.author);
    data.append('category', blogData.category);
    data.append('tags', blogData.tags);
    data.append('isPublished', blogData.isPublished.toString());
    data.append('coverImage', blogFile);

    try {
      console.log('📤 Publishing blog...');
      const response = await axios.post(`${API_URL}/api/blogs`, data, {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          'x-admin-key': ADMIN_KEY 
        }
      });
      
      console.log('✅ Blog Success:', response.data);
      showToast('✅ Blog post created successfully!', 'success');
      
      setBlogData({
        title: '', slug: '', excerpt: '', content: '',
        author: 'Admin', category: 'Tutorial', tags: '', isPublished: false
      });
      setBlogFile(null);
      fetchBlogs();
    } catch (err) {
      console.error('❌ Blog Error:', err);
      console.error('Error response:', err.response?.data);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Unknown error';
      showToast(`❌ Error: ${errorMsg}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionSubmit = async (e) => {
    e.preventDefault();
    
    // Validation - Cover Image
    if (!collectionFile) {
      showToast('❌ Please select a cover image', 'error');
      return;
    }
    
    // Validation - At least 1 prompt
    if (collectionData.prompts.length === 0) {
      showToast('⚠️ Please select at least 1 prompt for the collection', 'error');
      return;
    }
    
    // Validation - Description length (MUST be 10+ characters)
    if (collectionData.description.length < 10) {
      showToast('⚠️ Description must be at least 10 characters', 'error');
      return;
    }
    
    // Validation - Title length (MUST be 3+ characters)
    if (collectionData.title.length < 3) {
      showToast('⚠️ Title must be at least 3 characters', 'error');
      return;
    }
    
    setLoading(true);
    const data = new FormData();
    
    console.log('📦 Preparing collection data...');
    console.log('Collection data:', collectionData);
    console.log('Prompts selected:', collectionData.prompts.length);
    console.log('Description length:', collectionData.description.length);
    
    data.append('title', collectionData.title);
    data.append('slug', collectionData.slug || collectionData.title.toLowerCase().replace(/\s+/g, '-'));
    data.append('description', collectionData.description);
    data.append('category', collectionData.category);
    data.append('prompts', JSON.stringify(collectionData.prompts));
    data.append('isPublished', collectionData.isPublished.toString());
    data.append('coverImage', collectionFile);

    try {
      console.log('📤 Creating collection...');
      console.log('Request headers:', { 
        'Content-Type': 'multipart/form-data', 
        'x-admin-key': ADMIN_KEY 
      });
      
      const response = await axios.post(`${API_URL}/api/collections`, data, {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          'x-admin-key': ADMIN_KEY 
        }
      });
      
      console.log('✅ Collection Success:', response.data);
      showToast('✅ Collection created successfully!', 'success');
      
      setCollectionData({
        title: '', slug: '', description: '',
        category: 'Logo Design', prompts: [], isPublished: false
      });
      setCollectionFile(null);
      fetchCollections();
    } catch (err) {
      console.error('❌ Collection Error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      console.error('Error stack:', err.stack);
      
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Unknown error';
      showToast(`❌ Error: ${errorMsg}`, 'error');
      
      // Show detailed error in console for debugging
      if (err.response?.data?.stack) {
        console.error('Server stack trace:', err.response.data.stack);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = async (id) => {
    if(!window.confirm("Delete this prompt?")) return;
    try {
      await axios.delete(`${API_URL}/api/prompts/${id}`, {
        headers: { 'x-admin-key': ADMIN_KEY }
      });
      fetchPrompts();
      showToast('✅ Prompt deleted!', 'success');
    } catch (err) { 
      console.error('Delete Error:', err);
      showToast('❌ Error deleting prompt', 'error');
    }
  };

  const handleDeleteBlog = async (id) => {
    if(!window.confirm("Delete this blog post?")) return;
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`, {
        headers: { 'x-admin-key': ADMIN_KEY }
      });
      fetchBlogs();
      showToast('✅ Blog deleted!', 'success');
    } catch (err) { 
      console.error('Delete Error:', err);
      showToast('❌ Error deleting blog', 'error');
    }
  };

  const handleDeleteCollection = async (id) => {
    if(!window.confirm("Delete this collection?")) return;
    try {
      await axios.delete(`${API_URL}/api/collections/${id}`, {
        headers: { 'x-admin-key': ADMIN_KEY }
      });
      fetchCollections();
      showToast('✅ Collection deleted!', 'success');
    } catch (err) { 
      console.error('Delete Error:', err);
      showToast('❌ Error deleting collection', 'error');
    }
  };

  const addPromptToCollection = (promptId) => {
    if (!collectionData.prompts.includes(promptId)) {
      setCollectionData(prev => ({
        ...prev,
        prompts: [...prev.prompts, promptId]
      }));
      console.log('✅ Prompt added to collection:', promptId);
    }
  };

  const removePromptFromCollection = (promptId) => {
    setCollectionData(prev => ({
      ...prev,
      prompts: prev.prompts.filter(id => id !== promptId)
    }));
    console.log('❌ Prompt removed from collection:', promptId);
  };

  // Fast loading state
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          toast.type === 'success' 
            ? 'bg-green-600 text-white' 
            : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">×</button>
        </div>
      )}

      {/* Header with Logout */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-400">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('prompts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'prompts'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Image size={18} />
          Prompts ({prompts.length})
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'blogs'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <BookOpen size={18} />
          Blog ({blogs.length})
        </button>
        <button
          onClick={() => setActiveTab('collections')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'collections'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Folder size={18} />
          Collections ({collections.length})
        </button>
      </div>

      {/* PROMPTS TAB */}
      {activeTab === 'prompts' && (
        <div>
          <div className="bg-gray-800 p-6 rounded-xl mb-12 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Add New Prompt</h2>
            <form onSubmit={handlePromptSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Title (e.g., Cyberpunk City)" 
                className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-blue-500 outline-none"
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                required 
              />
              
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Media Type *</label>
                <select 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-blue-500 outline-none"
                  value={formData.mediaType} 
                  onChange={e => setFormData({...formData, mediaType: e.target.value})}
                >
                  {CATEGORY_STRUCTURE['Media Type'].map(type => (
                    <option key={type} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">AI Model *</label>
                <select 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-blue-500 outline-none"
                  value={formData.aiModel} 
                  onChange={e => setFormData({...formData, aiModel: e.target.value})} 
                  required
                >
                  {CATEGORY_STRUCTURE['AI Model'].map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Industry *</label>
                <select 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-blue-500 outline-none"
                  value={formData.industry} 
                  onChange={e => setFormData({...formData, industry: e.target.value})} 
                  required
                >
                  {CATEGORY_STRUCTURE['Industry'].map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Style/Topic *</label>
                <select 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-blue-500 outline-none"
                  value={formData.topic} 
                  onChange={e => setFormData({...formData, topic: e.target.value})} 
                  required
                >
                  {CATEGORY_STRUCTURE['Style'].map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              <input 
                type="text" 
                placeholder="Short Description" 
                className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-blue-500 outline-none"
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required 
              />
              
              <textarea 
                placeholder="The AI Prompt (e.g., /imagine prompt: a futuristic city...)" 
                className="bg-gray-900 p-3 rounded border border-gray-700 w-full h-32 text-white focus:border-blue-500 outline-none"
                value={formData.promptText} 
                onChange={e => setFormData({...formData, promptText: e.target.value})} 
                required 
              />

              <textarea 
                placeholder="Negative Prompt (e.g., blurry, low quality, distorted, ugly...)" 
                className="bg-gray-900 p-3 rounded border border-gray-700 w-full h-24 text-white focus:border-blue-500 outline-none"
                value={formData.negativePrompt} 
                onChange={e => setFormData({...formData, negativePrompt: e.target.value})} 
              />
              
              <div className="flex flex-wrap gap-4 items-center">
                <label className="flex items-center gap-2 text-white cursor-pointer bg-gray-900 px-4 py-3 rounded border border-gray-700 hover:border-yellow-500 transition">
                  <input 
                    type="checkbox" 
                    checked={formData.isTrending} 
                    onChange={e => setFormData({...formData, isTrending: e.target.checked})} 
                    className="w-5 h-5 accent-yellow-500"
                  />
                  <span>🔥 Trending</span>
                </label>

                <label className="flex items-center gap-2 text-white cursor-pointer bg-gray-900 px-4 py-3 rounded border border-gray-700 hover:border-purple-500 transition">
                  <input 
                    type="checkbox" 
                    checked={formData.isPromptOfDay} 
                    onChange={e => setFormData({...formData, isPromptOfDay: e.target.checked})} 
                    className="w-5 h-5 accent-purple-500"
                  />
                  <span>⭐ Prompt of the Day</span>
                </label>

                <input 
                  type="file" 
                  accept={formData.mediaType === 'video' ? "video/*" : "image/*"} 
                  className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                  onChange={e => setFile(e.target.files[0])} 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Uploading...
                  </>
                ) : (
                  '✨ Submit Prompt'
                )}
              </button>
            </form>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-blue-400">Manage Prompts</h2>
          <div className="space-y-4">
            {prompts.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No prompts yet. Create your first one!</p>
            ) : (
              prompts.map(prompt => (
                <div key={prompt._id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition">
                  <div className="flex items-center gap-4">
                    {prompt.mediaType === 'image' 
                      ? <img src={prompt.mediaUrl} className="w-16 h-16 object-cover rounded" alt="thumb"/>
                      : <video src={prompt.mediaUrl} className="w-16 h-16 object-cover rounded" />
                    }
                    <div>
                      <h4 className="font-bold text-white">{prompt.title}</h4>
                      <div className="flex gap-2 text-xs mt-1">
                        <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded">{prompt.aiModel}</span>
                        <span className="bg-purple-900 text-purple-300 px-2 py-1 rounded">{prompt.industry}</span>
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">{prompt.topic}</span>
                        {prompt.isTrending && <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded">🔥 Trending</span>}
                        {prompt.isPromptOfDay && <span className="bg-purple-900 text-purple-300 px-2 py-1 rounded">⭐ Prompt of Day</span>}
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">{prompt.copyCount} copies</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeletePrompt(prompt._id)} 
                    className="text-red-500 hover:text-red-400 hover:bg-red-900/30 p-2 rounded transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* BLOGS TAB */}
      {activeTab === 'blogs' && (
        <div>
          <div className="bg-gray-800 p-6 rounded-xl mb-12 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Add New Blog Post</h2>
            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Blog Title" 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-green-500 outline-none"
                  value={blogData.title} 
                  onChange={e => setBlogData({...blogData, title: e.target.value})} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Slug (e.g., how-to-write-midjourney-prompts)" 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-green-500 outline-none"
                  value={blogData.slug} 
                  onChange={e => setBlogData({...blogData, slug: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-green-500 outline-none"
                  value={blogData.category} 
                  onChange={e => setBlogData({...blogData, category: e.target.value})}
                >
                  <option>Tutorial</option>
                  <option>Tips & Tricks</option>
                  <option>AI News</option>
                  <option>Comparison</option>
                  <option>Review</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Author" 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-green-500 outline-none"
                  value={blogData.author} 
                  onChange={e => setBlogData({...blogData, author: e.target.value})} 
                />
              </div>

              <input 
                type="text" 
                placeholder="Short Excerpt (for blog list)" 
                className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-green-500 outline-none"
                value={blogData.excerpt} 
                onChange={e => setBlogData({...blogData, excerpt: e.target.value})} 
                required 
              />

              <textarea 
                placeholder="Blog Content (full article)" 
                className="bg-gray-900 p-3 rounded border border-gray-700 w-full h-64 text-white focus:border-green-500 outline-none"
                value={blogData.content} 
                onChange={e => setBlogData({...blogData, content: e.target.value})} 
                required 
              />

              <input 
                type="text" 
                placeholder="Tags (comma separated: e.g., midjourney, tutorial, beginners)" 
                className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-green-500 outline-none"
                value={blogData.tags} 
                onChange={e => setBlogData({...blogData, tags: e.target.value})} 
              />

              <div className="flex flex-wrap gap-4 items-center">
                <label className="flex items-center gap-2 text-white cursor-pointer bg-gray-900 px-4 py-3 rounded border border-gray-700 hover:border-green-500 transition">
                  <input 
                    type="checkbox" 
                    checked={blogData.isPublished} 
                    onChange={e => setBlogData({...blogData, isPublished: e.target.checked})} 
                    className="w-5 h-5 accent-green-500"
                  />
                  <span>📢 Publish Immediately</span>
                </label>

                <input 
                  type="file" 
                  accept="image/*" 
                  className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
                  onChange={e => setBlogFile(e.target.files[0])} 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Publishing...
                  </>
                ) : (
                  '📝 Publish Blog Post'
                )}
              </button>
            </form>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-green-400">Manage Blog Posts</h2>
          <div className="space-y-4">
            {blogs.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No blog posts yet. Create your first one!</p>
            ) : (
              blogs.map(blog => (
                <div key={blog._id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-green-500 transition">
                  <div className="flex items-center gap-4">
                    <img src={blog.coverImage} className="w-16 h-16 object-cover rounded" alt="thumb"/>
                    <div>
                      <h4 className="font-bold text-white">{blog.title}</h4>
                      <div className="flex gap-2 text-xs mt-1">
                        <span className="bg-green-900 text-green-300 px-2 py-1 rounded">{blog.category}</span>
                        {blog.isPublished ? (
                          <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded">📢 Published</span>
                        ) : (
                          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">📝 Draft</span>
                        )}
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">{blog.views} views</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteBlog(blog._id)} 
                    className="text-red-500 hover:text-red-400 hover:bg-red-900/30 p-2 rounded transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* COLLECTIONS TAB */}
      {activeTab === 'collections' && (
        <div>
          <div className="bg-gray-800 p-6 rounded-xl mb-12 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Create Prompt Collection</h2>
            <form onSubmit={handleCollectionSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Collection Title (e.g., 10 Best Logo Prompts)" 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-purple-500 outline-none"
                  value={collectionData.title} 
                  onChange={e => setCollectionData({...collectionData, title: e.target.value})} 
                  required 
                  minLength={3}
                />
                <input 
                  type="text" 
                  placeholder="Slug (e.g., best-logo-prompts)" 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-purple-500 outline-none"
                  value={collectionData.slug} 
                  onChange={e => setCollectionData({...collectionData, slug: e.target.value})} 
                />
              </div>

              <textarea 
                placeholder="Collection Description (min 10 characters)" 
                className="bg-gray-900 p-3 rounded border border-gray-700 w-full h-24 text-white focus:border-purple-500 outline-none"
                value={collectionData.description} 
                onChange={e => setCollectionData({...collectionData, description: e.target.value})} 
                required 
                minLength={10}
              />
              <p className="text-xs text-gray-500">
                {collectionData.description.length}/10 characters minimum
              </p>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Category *</label>
                <select 
                  className="bg-gray-900 p-3 rounded border border-gray-700 w-full text-white focus:border-purple-500 outline-none"
                  value={collectionData.category} 
                  onChange={e => setCollectionData({...collectionData, category: e.target.value})}
                >
                  {COLLECTION_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-2 block">Select Prompts to Include *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto bg-gray-900 p-3 rounded border border-gray-700">
                  {prompts.length === 0 ? (
                    <p className="text-gray-500 text-xs col-span-full text-center py-4">
                      No prompts available. Create some prompts first!
                    </p>
                  ) : (
                    prompts.map(prompt => (
                      <button
                        key={prompt._id}
                        type="button"
                        onClick={() => collectionData.prompts.includes(prompt._id) 
                          ? removePromptFromCollection(prompt._id)
                          : addPromptToCollection(prompt._id)
                        }
                        className={`p-2 rounded text-xs transition ${
                          collectionData.prompts.includes(prompt._id)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {prompt.title}
                      </button>
                    ))
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {collectionData.prompts.length} prompt{collectionData.prompts.length !== 1 ? 's' : ''} selected
                </p>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <label className="flex items-center gap-2 text-white cursor-pointer bg-gray-900 px-4 py-3 rounded border border-gray-700 hover:border-purple-500 transition">
                  <input 
                    type="checkbox" 
                    checked={collectionData.isPublished} 
                    onChange={e => setCollectionData({...collectionData, isPublished: e.target.checked})} 
                    className="w-5 h-5 accent-purple-500"
                  />
                  <span>📢 Publish Immediately</span>
                </label>

                <input 
                  type="file" 
                  accept="image/*" 
                  className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                  onChange={e => setCollectionFile(e.target.files[0])} 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || prompts.length === 0 || collectionData.description.length < 10 || collectionData.title.length < 3} 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Creating...
                  </>
                ) : (
                  '📦 Create Collection'
                )}
              </button>
              
              {prompts.length === 0 && (
                <p className="text-xs text-yellow-500 text-center">
                  ⚠️ You need to create at least 1 prompt before creating a collection
                </p>
              )}
              {collectionData.description.length > 0 && collectionData.description.length < 10 && (
                <p className="text-xs text-yellow-500 text-center">
                  ⚠️ Description must be at least 10 characters (currently {collectionData.description.length})
                </p>
              )}
              {collectionData.title.length > 0 && collectionData.title.length < 3 && (
                <p className="text-xs text-yellow-500 text-center">
                  ⚠️ Title must be at least 3 characters (currently {collectionData.title.length})
                </p>
              )}
            </form>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-purple-400">Manage Collections</h2>
          <div className="space-y-4">
            {collections.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No collections yet. Create your first one!</p>
            ) : (
              collections.map(collection => (
                <div key={collection._id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-purple-500 transition">
                  <div className="flex items-center gap-4">
                    <img src={collection.coverImage} className="w-16 h-16 object-cover rounded" alt="thumb"/>
                    <div>
                      <h4 className="font-bold text-white">{collection.title}</h4>
                      <div className="flex gap-2 text-xs mt-1">
                        <span className="bg-purple-900 text-purple-300 px-2 py-1 rounded">{collection.category}</span>
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">{collection.prompts?.length || 0} prompts</span>
                        {collection.isPublished ? (
                          <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded">📢 Published</span>
                        ) : (
                          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">📝 Draft</span>
                        )}
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">{collection.views} views</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteCollection(collection._id)} 
                    className="text-red-500 hover:text-red-400 hover:bg-red-900/30 p-2 rounded transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;