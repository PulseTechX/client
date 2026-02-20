import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
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
        <h1 className="text-4xl font-bold text-white mb-4">📝 AI Prompt Blog</h1>
        <p className="text-gray-400 mb-8">
          Tips, tutorials, and guides for AI art creation
        </p>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No blog posts yet. Check back soon!</p>
            <Link to="/admin" className="text-blue-400 hover:underline mt-2 inline-block">
              Create a blog post →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition"
              >
                <div className="aspect-video bg-gray-900 overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-blue-400 font-semibold">{blog.category}</span>
                  <h2 className="text-lg font-bold text-white mt-2 mb-2 group-hover:text-blue-400 transition">
                    {blog.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {blog.views} views
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;