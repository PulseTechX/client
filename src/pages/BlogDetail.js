import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/${slug}`);
        setBlog(res.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]); // ✅ Now fetchBlog is inside useEffect

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Blog post not found</p>
          <Link to="/blog" className="text-blue-400 hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ArrowLeft size={18} />
          <span>Back to Blog</span>
        </Link>

        {/* Blog Content */}
        <article className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          {/* Cover Image */}
          <div className="aspect-video bg-gray-900">
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
              <span className="text-blue-400 font-semibold">{blog.category}</span>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {blog.views} views
              </div>
              <div className="flex items-center gap-1">
                <User size={14} />
                {blog.author}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{blog.title}</h1>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div 
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;