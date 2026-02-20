import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import AdminPanel from './pages/AdminPanel';
import PromptDetail from './pages/PromptDetail';
import SavedPrompts from './pages/SavedPrompts';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import AITools from './pages/AITools';
import Collections from './pages/Collections'; // NEW IMPORT
import CollectionDetail from './pages/CollectionDetail'; // NEW IMPORT

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <Navbar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        <div className="container mx-auto px-4 py-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <Gallery 
                  searchQuery={searchQuery} 
                  onSearchChange={setSearchQuery} 
                /> 
              } 
            />
            <Route path="/prompt/:id" element={<PromptDetail />} />
            <Route path="/saved" element={<SavedPrompts />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/collections" element={<Collections />} /> {/* NEW */}
            <Route path="/collections/:slug" element={<CollectionDetail />} /> {/* NEW */}
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;