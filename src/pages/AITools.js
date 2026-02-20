import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, Zap, Image, Video, PenTool, Code, Music, Mic, Palette, Search, Filter, ChevronDown, ChevronUp, Layers, Wand2, Sparkles, Crop, Brush, Film, Mic2, Bot, MessageSquare, Briefcase, GraduationCap } from 'lucide-react';
import CoffeeButton from '../components/CoffeeButton';

// ⚠️ REPLACE WITH YOUR ACTUAL AFFILIATE LINKS
const AI_TOOLS = [
  // 🎨 IMAGE GENERATION - Text to Image (17 Tools)
  {
    name: 'Midjourney',
    description: 'Best AI image generator with stunning artistic quality',
    url: 'https://midjourney.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-purple-500 to-pink-500',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'DALL-E 3',
    description: 'OpenAI\'s powerful image generation model integrated with ChatGPT',
    url: 'https://openai.com/dall-e-3?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-green-500 to-emerald-500',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'Stable Diffusion',
    description: 'Open-source AI image generation with full control and customization',
    url: 'https://stability.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Palette,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Leonardo AI',
    description: 'Professional AI art generation platform for games and design',
    url: 'https://leonardo.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Palette,
    color: 'from-cyan-500 to-blue-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Ideogram',
    description: 'AI image generator specialized in text within images',
    url: 'https://ideogram.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-purple-500 to-blue-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Playground AI',
    description: 'Free AI image generation with multiple model options',
    url: 'https://playgroundai.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Palette,
    color: 'from-green-500 to-teal-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'SeaArt AI',
    description: 'Free AI art generator with anime and realistic styles',
    url: 'https://seaart.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-blue-500 to-purple-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Bing Image Creator',
    description: 'Microsoft\'s free DALL-E 3 powered image generator',
    url: 'https://bing.com/images/create?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Craiyon',
    description: 'Free AI image generator formerly known as DALL-E Mini',
    url: 'https://craiyon.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-yellow-500 to-orange-500',
    popular: false,
    free: true,
    rating: 3
  },
  {
    name: 'NightCafe',
    description: 'AI art generator with multiple algorithms and styles',
    url: 'https://nightcafe.studio/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'DreamStudio',
    description: 'Stability AI\'s official image generation platform',
    url: 'https://dreamstudio.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: false,
    rating: 4
  },
  {
    name: 'Pixai AI',
    description: 'AI art generator specialized in anime-style images',
    url: 'https://pixai.art/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-pink-500 to-rose-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Tensor.art',
    description: 'Free AI image generator with custom models',
    url: 'https://tensor.art/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Palette,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'LiblibAI',
    description: 'Chinese AI image generation platform with Stable Diffusion models',
    url: 'https://liblib.art/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Palette,
    color: 'from-purple-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Tiamat',
    description: 'Chinese AI art generation platform',
    url: 'https://tiamat.art/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-pink-500 to-purple-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Flux AI',
    description: 'Next-generation image generation model with exceptional quality',
    url: 'https://flux.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Image,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Recraft AI',
    description: 'Professional vector and raster AI design tool',
    url: 'https://recraft.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Text to Image',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // 🎨 IMAGE GENERATION - Image Editing (7 Tools)
  {
    name: 'Adobe Firefly',
    description: 'Adobe\'s AI image generator integrated with Creative Cloud',
    url: 'https://firefly.adobe.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Editing',
    icon: Brush,
    color: 'from-red-500 to-orange-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Canva AI',
    description: 'Design platform with integrated AI image generation and editing',
    url: 'https://canva.com/ai?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Editing',
    icon: Palette,
    color: 'from-purple-500 to-blue-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Photoshop AI',
    description: 'Adobe Photoshop with Generative Fill and AI features',
    url: 'https://adobe.com/photoshop?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Editing',
    icon: Brush,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'Remove.bg',
    description: 'AI background removal tool for images',
    url: 'https://remove.bg/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Editing',
    icon: Crop,
    color: 'from-green-500 to-emerald-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Clipdrop',
    description: 'AI-powered image editing and enhancement tools',
    url: 'https://clipdrop.co/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Editing',
    icon: Wand2,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Meitu',
    description: 'Chinese AI photo and video editing app',
    url: 'https://meitu.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Editing',
    icon: Brush,
    color: 'from-pink-500 to-rose-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Fotor AI',
    description: 'AI-powered photo editor and graphic design tool',
    url: 'https://fotor.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Editing',
    icon: Brush,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // 🎨 IMAGE GENERATION - Image Enhancement (3 Tools)
  {
    name: 'Upscale.media',
    description: 'AI image upscaler to enhance resolution',
    url: 'https://upscale.media/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Enhancement',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Let\'s Enhance',
    description: 'AI photo enhancer and upscaler',
    url: 'https://letsenhance.io/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Enhancement',
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-500',
    popular: false,
    free: false,
    rating: 4
  },
  {
    name: 'Topaz Photo AI',
    description: 'Professional AI photo enhancement software',
    url: 'https://topazlabs.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'Image Enhancement',
    icon: Sparkles,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: false,
    rating: 5
  },
  
  // 🎨 IMAGE GENERATION - AI Avatars (3 Tools)
  {
    name: 'Lensa AI',
    description: 'AI avatar generator from your selfies',
    url: 'https://lensa.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'AI Avatars',
    icon: Image,
    color: 'from-pink-500 to-rose-500',
    popular: true,
    free: false,
    rating: 4
  },
  {
    name: 'Dawn AI',
    description: 'AI avatar creation from your photos',
    url: 'https://dawna.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'AI Avatars',
    icon: Image,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: false,
    rating: 4
  },
  {
    name: 'Artsmart AI',
    description: 'AI avatar and portrait generation',
    url: 'https://artsmart.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Image Generation',
    subcategory: 'AI Avatars',
    icon: Palette,
    color: 'from-blue-500 to-purple-500',
    popular: false,
    free: true,
    rating: 4
  },

  // 🎬 VIDEO GENERATION - Text to Video (7 Tools)
  {
    name: 'Runway ML',
    description: 'AI-powered video editing and generation platform',
    url: 'https://runwayml.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Text to Video',
    icon: Video,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Pika Labs',
    description: 'Text-to-video AI generation with impressive quality',
    url: 'https://pika.art/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Text to Video',
    icon: Video,
    color: 'from-purple-500 to-orange-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Luma Dream Machine',
    description: 'High-quality AI video generation from text',
    url: 'https://lumalabs.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Text to Video',
    icon: Video,
    color: 'from-purple-500 to-pink-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Kling AI',
    description: 'Chinese AI video generation with realistic motion',
    url: 'https://klingai.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Text to Video',
    icon: Video,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Haiper AI',
    description: 'Short-form AI video generation tool',
    url: 'https://haiper.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Text to Video',
    icon: Video,
    color: 'from-orange-500 to-yellow-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Vidu',
    description: 'Chinese AI video generation platform',
    url: 'https://vidu.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Text to Video',
    icon: Video,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Luma AI',
    description: '3D capture and AI video generation',
    url: 'https://lumalabs.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Text to Video',
    icon: Video,
    color: 'from-purple-500 to-pink-500',
    popular: true,
    free: true,
    rating: 5
  },
  
  // 🎬 VIDEO GENERATION - AI Avatars (3 Tools)
  {
    name: 'HeyGen',
    description: 'AI avatar and video creation for presentations',
    url: 'https://heygen.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'AI Avatars',
    icon: Video,
    color: 'from-blue-500 to-purple-500',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'Synthesia',
    description: 'AI video generator with realistic avatars',
    url: 'https://synthesia.io/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'AI Avatars',
    icon: Video,
    color: 'from-green-500 to-emerald-500',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'D-ID',
    description: 'AI talking head video generator',
    url: 'https://d-id.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'AI Avatars',
    icon: Video,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: false,
    rating: 4
  },
  
  // 🎬 VIDEO GENERATION - Video Editing (7 Tools)
  {
    name: 'InVideo AI',
    description: 'Text-to-video AI for marketing and social media',
    url: 'https://invideo.io/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Video Editing',
    icon: Film,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Veed.io',
    description: 'Online video editor with AI features',
    url: 'https://veed.io/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Video Editing',
    icon: Film,
    color: 'from-purple-500 to-blue-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Descript',
    description: 'AI-powered video and podcast editing',
    url: 'https://descript.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Video Editing',
    icon: Film,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Opus Clip',
    description: 'AI tool to create short clips from long videos',
    url: 'https://opus.pro/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Video Editing',
    icon: Film,
    color: 'from-purple-500 to-pink-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Fliki',
    description: 'Text-to-video with AI voices and stock footage',
    url: 'https://fliki.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Video Editing',
    icon: Film,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'CapCut AI',
    description: 'ByteDance\'s AI-powered video editing tool',
    url: 'https://capcut.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Video Editing',
    icon: Film,
    color: 'from-gray-700 to-gray-900',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Captions AI',
    description: 'AI-powered video captions and editing for social media',
    url: 'https://captions.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Video Editing',
    icon: Film,
    color: 'from-pink-500 to-rose-500',
    popular: true,
    free: false,
    rating: 4
  },
  {
    name: 'Wondershare Filmora',
    description: 'AI-powered video editing software',
    url: 'https://filmora.wondershare.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Video Generation',
    subcategory: 'Video Editing',
    icon: Film,
    color: 'from-green-500 to-emerald-500',
    popular: true,
    free: false,
    rating: 4
  },

  // ✍️ WRITING - Content Writing (4 Tools)
  {
    name: 'Jasper AI',
    description: 'AI writing assistant for content creators and marketers',
    url: 'https://jasper.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'Content Writing',
    icon: PenTool,
    color: 'from-orange-500 to-yellow-500',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'Copy.ai',
    description: 'AI copywriting tool for marketing and sales',
    url: 'https://copy.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'Content Writing',
    icon: PenTool,
    color: 'from-pink-500 to-rose-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Writesonic',
    description: 'AI writing for articles, ads, and content',
    url: 'https://writesonic.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'Content Writing',
    icon: PenTool,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Rytr',
    description: 'Affordable AI writing assistant for all content types',
    url: 'https://rytr.me/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'Content Writing',
    icon: PenTool,
    color: 'from-purple-500 to-blue-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // ✍️ WRITING - Grammar & Editing (4 Tools)
  {
    name: 'Grammarly',
    description: 'AI writing assistant and grammar checker',
    url: 'https://grammarly.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'Grammar & Editing',
    icon: PenTool,
    color: 'from-green-500 to-emerald-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'QuillBot',
    description: 'AI paraphrasing and writing enhancement tool',
    url: 'https://quillbot.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'Grammar & Editing',
    icon: PenTool,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Wordtune',
    description: 'AI writing companion for rewriting and editing',
    url: 'https://wordtune.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'Grammar & Editing',
    icon: PenTool,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Hemingway Editor',
    description: 'AI-powered writing clarity and readability tool',
    url: 'https://hemingwayapp.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'Grammar & Editing',
    icon: PenTool,
    color: 'from-orange-500 to-yellow-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // ✍️ WRITING - SEO Writing (3 Tools)
  {
    name: 'Surfer SEO',
    description: 'AI-powered content optimization for SEO',
    url: 'https://surferseo.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'SEO Writing',
    icon: PenTool,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'Frase',
    description: 'AI content brief and optimization tool',
    url: 'https://frase.io/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'SEO Writing',
    icon: PenTool,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    free: false,
    rating: 4
  },
  {
    name: 'Anyword',
    description: 'AI copywriting with predictive performance scores',
    url: 'https://anyword.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Writing',
    subcategory: 'SEO Writing',
    icon: PenTool,
    color: 'from-orange-500 to-red-500',
    popular: false,
    free: false,
    rating: 4
  },

  // 💬 CHAT - AI Assistants (11 Tools)
  {
    name: 'ChatGPT Plus',
    description: 'Advanced AI chatbot by OpenAI with GPT-4',
    url: 'https://chat.openai.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-green-500 to-teal-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Claude AI',
    description: 'Anthropic\'s helpful, harmless AI assistant',
    url: 'https://claude.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-orange-500 to-amber-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Google Gemini',
    description: 'Google\'s multimodal AI assistant',
    url: 'https://gemini.google.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-blue-500 to-purple-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Microsoft Copilot',
    description: 'AI assistant integrated with Windows and Office',
    url: 'https://copilot.microsoft.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'DeepSeek',
    description: 'Chinese AI assistant with advanced reasoning capabilities',
    url: 'https://deepseek.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Qwen (Alibaba)',
    description: 'Chinese AI model by Alibaba with multilingual support',
    url: 'https://qwen.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-orange-500 to-red-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Grok (xAI)',
    description: 'Elon Musk\'s AI with real-time X/Twitter integration',
    url: 'https://grok.x.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-gray-700 to-gray-900',
    popular: true,
    free: false,
    rating: 4
  },
  {
    name: 'Mistral AI',
    description: 'European open-weight AI models with excellent performance',
    url: 'https://mistral.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-orange-500 to-yellow-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Baidu ERNIE Bot',
    description: 'Chinese AI assistant by Baidu with search integration',
    url: 'https://yiyan.baidu.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Doubao (ByteDance)',
    description: 'Chinese AI assistant by ByteDance (TikTok parent)',
    url: 'https://doubao.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-pink-500 to-rose-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'MiniMax',
    description: 'Chinese AI company with advanced language models',
    url: 'https://minimax.io/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-purple-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Zhipu AI',
    description: 'Chinese AI company with GLM language models',
    url: 'https://zhipu.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Assistants',
    icon: Bot,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // 💬 CHAT - AI Search (3 Tools)
  {
    name: 'Perplexity AI',
    description: 'AI-powered search engine with citations',
    url: 'https://perplexity.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Search',
    icon: Search,
    color: 'from-cyan-500 to-blue-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'You.com',
    description: 'AI search engine with customizable results',
    url: 'https://you.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'AI Search',
    icon: Search,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Perplexity Pro',
    description: 'AI search with advanced features and unlimited queries',
    url: 'https://perplexity.ai/pro?ref=YOUR_AFFILIATE_ID',
    category: 'Search',
    subcategory: 'AI Search',
    icon: Search,
    color: 'from-cyan-500 to-blue-500',
    popular: true,
    free: false,
    rating: 5
  },
  
  // 💬 CHAT - Character Chat (2 Tools)
  {
    name: 'Character.ai',
    description: 'Chat with AI characters and celebrities',
    url: 'https://character.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'Character Chat',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Poe',
    description: 'Multi-bot AI chat platform by Quora',
    url: 'https://poe.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Chat & Assistant',
    subcategory: 'Character Chat',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-500',
    popular: false,
    free: true,
    rating: 4
  },

  // 🎵 AUDIO - Text to Speech (5 Tools)
  {
    name: 'ElevenLabs',
    description: 'AI voice generation and text-to-speech',
    url: 'https://elevenlabs.io/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Text to Speech',
    icon: Mic,
    color: 'from-purple-500 to-pink-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Murf AI',
    description: 'Professional AI voiceover studio',
    url: 'https://murf.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Text to Speech',
    icon: Mic2,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'Play.ht',
    description: 'AI voice generator for podcasts and videos',
    url: 'https://play.ht/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Text to Speech',
    icon: Mic2,
    color: 'from-purple-500 to-blue-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'WellSaid Labs',
    description: 'Enterprise AI voiceover platform',
    url: 'https://wellsaidlabs.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Text to Speech',
    icon: Mic2,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: false,
    rating: 4
  },
  {
    name: 'Adobe Podcast AI',
    description: 'AI audio enhancement for podcasts and voice recordings',
    url: 'https://podcast.adobe.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Text to Speech',
    icon: Mic,
    color: 'from-purple-500 to-blue-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // 🎵 AUDIO - Music Generation (4 Tools)
  {
    name: 'Suno AI',
    description: 'AI music generation from text prompts',
    url: 'https://suno.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Music Generation',
    icon: Music,
    color: 'from-red-500 to-orange-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Udio',
    description: 'AI music creation with full songs',
    url: 'https://udio.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Music Generation',
    icon: Music,
    color: 'from-purple-500 to-pink-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Soundraw',
    description: 'AI music generator for content creators',
    url: 'https://soundraw.io/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Music Generation',
    icon: Music,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Aiva',
    description: 'AI composer for classical and cinematic music',
    url: 'https://aiva.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Music Generation',
    icon: Music,
    color: 'from-purple-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // 🎵 AUDIO - Voice Cloning (2 Tools)
  {
    name: 'Resemble AI',
    description: 'AI voice cloning and generation platform',
    url: 'https://resemble.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Voice Cloning',
    icon: Mic,
    color: 'from-green-500 to-emerald-500',
    popular: false,
    free: false,
    rating: 4
  },
  {
    name: 'Descript Overdub',
    description: 'AI voice cloning for podcast editing',
    url: 'https://descript.com/overdub?ref=YOUR_AFFILIATE_ID',
    category: 'Audio',
    subcategory: 'Voice Cloning',
    icon: Mic,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: false,
    rating: 4
  },

  // 💻 CODING - Code Assistants (5 Tools)
  {
    name: 'GitHub Copilot',
    description: 'AI pair programmer for developers',
    url: 'https://github.com/copilot?ref=YOUR_AFFILIATE_ID',
    category: 'Coding',
    subcategory: 'Code Assistants',
    icon: Code,
    color: 'from-gray-700 to-gray-900',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'GitHub Copilot X',
    description: 'Next-gen AI pair programmer with chat and voice',
    url: 'https://github.com/copilot?ref=YOUR_AFFILIATE_ID',
    category: 'Coding',
    subcategory: 'Code Assistants',
    icon: Code,
    color: 'from-gray-700 to-gray-900',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'Cursor',
    description: 'AI-powered code editor built for developers',
    url: 'https://cursor.sh/?ref=YOUR_AFFILIATE_ID',
    category: 'Coding',
    subcategory: 'Code Assistants',
    icon: Code,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Tabnine',
    description: 'AI code completion for multiple IDEs',
    url: 'https://tabnine.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Coding',
    subcategory: 'Code Assistants',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Codeium',
    description: 'Free AI code completion and chat',
    url: 'https://codeium.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Coding',
    subcategory: 'Code Assistants',
    icon: Code,
    color: 'from-purple-500 to-blue-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // 💻 CODING - AI IDEs (4 Tools)
  {
    name: 'Replit AI',
    description: 'AI-assisted online coding platform',
    url: 'https://replit.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Coding',
    subcategory: 'AI IDEs',
    icon: Code,
    color: 'from-orange-500 to-yellow-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Windsurf',
    description: 'Next-gen AI-powered IDE',
    url: 'https://windsurf.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Coding',
    subcategory: 'AI IDEs',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Bolt.new',
    description: 'AI web development in the browser',
    url: 'https://bolt.new/?ref=YOUR_AFFILIATE_ID',
    category: 'Coding',
    subcategory: 'AI IDEs',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'v0.dev',
    description: 'AI-powered UI generation by Vercel',
    url: 'https://v0.dev/?ref=YOUR_AFFILIATE_ID',
    category: 'Coding',
    subcategory: 'AI IDEs',
    icon: Code,
    color: 'from-gray-700 to-gray-900',
    popular: true,
    free: true,
    rating: 5
  },

  // 🎯 PRODUCTIVITY - Automation (2 Tools)
  {
    name: 'Zapier',
    description: 'AI automation for connecting apps',
    url: 'https://zapier.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Productivity',
    subcategory: 'Automation',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Make.com',
    description: 'Visual automation platform with AI',
    url: 'https://make.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Productivity',
    subcategory: 'Automation',
    icon: Zap,
    color: 'from-purple-500 to-blue-500',
    popular: true,
    free: true,
    rating: 5
  },
  
  // 🎯 PRODUCTIVITY - Notes & Workspace (3 Tools)
  {
    name: 'Notion AI',
    description: 'AI-powered workspace and notes',
    url: 'https://notion.so/ai?ref=YOUR_AFFILIATE_ID',
    category: 'Productivity',
    subcategory: 'Notes & Workspace',
    icon: Layers,
    color: 'from-gray-600 to-gray-800',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'Mem.ai',
    description: 'AI-powered note-taking and organization',
    url: 'https://mem.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Productivity',
    subcategory: 'Notes & Workspace',
    icon: Layers,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Obsidian AI',
    description: 'AI-powered knowledge base and note-taking',
    url: 'https://obsidian.md/?ref=YOUR_AFFILIATE_ID',
    category: 'Productivity',
    subcategory: 'Notes & Workspace',
    icon: Layers,
    color: 'from-purple-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // 🎯 PRODUCTIVITY - Meeting Assistants (2 Tools)
  {
    name: 'Otter.ai',
    description: 'AI meeting notes and transcription',
    url: 'https://otter.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Productivity',
    subcategory: 'Meeting Assistants',
    icon: Mic,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Fireflies.ai',
    description: 'AI meeting assistant and note-taker',
    url: 'https://fireflies.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Productivity',
    subcategory: 'Meeting Assistants',
    icon: Mic,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: true,
    rating: 4
  },
  
  // 🎯 PRODUCTIVITY - Calendar & Tasks (2 Tools)
  {
    name: 'Motion',
    description: 'AI calendar and task management',
    url: 'https://usemotion.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Productivity',
    subcategory: 'Calendar & Tasks',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: false,
    rating: 4
  },
  {
    name: 'Clockwise',
    description: 'AI calendar optimization for teams',
    url: 'https://clockwise.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Productivity',
    subcategory: 'Calendar & Tasks',
    icon: Zap,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },

  // 📊 BUSINESS - CRM & Sales (2 Tools)
  {
    name: 'HubSpot AI',
    description: 'AI-powered CRM and marketing platform',
    url: 'https://hubspot.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Business',
    subcategory: 'CRM & Sales',
    icon: Briefcase,
    color: 'from-orange-500 to-red-500',
    popular: true,
    free: true,
    rating: 5
  },
  {
    name: 'Salesforce Einstein',
    description: 'AI for sales and customer service',
    url: 'https://salesforce.com/einstein?ref=YOUR_AFFILIATE_ID',
    category: 'Business',
    subcategory: 'CRM & Sales',
    icon: Briefcase,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: false,
    rating: 5
  },
  
  // 📊 BUSINESS - Marketing (4 Tools)
  {
    name: 'AdCreative.ai',
    description: 'AI-generated ad creatives and banners',
    url: 'https://adcreative.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Business',
    subcategory: 'Marketing',
    icon: Image,
    color: 'from-purple-500 to-blue-500',
    popular: false,
    free: false,
    rating: 4
  },
  {
    name: 'Mutiny',
    description: 'AI personalization for B2B websites',
    url: 'https://mutinyhq.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Business',
    subcategory: 'Marketing',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: false,
    rating: 4
  },
  {
    name: 'Lavender',
    description: 'AI email coaching for sales teams',
    url: 'https://lavender.ai/?ref=YOUR_AFFILIATE_ID',
    category: 'Business',
    subcategory: 'Marketing',
    icon: PenTool,
    color: 'from-purple-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Xiaohongshu AI',
    description: 'Chinese social platform with AI content tools',
    url: 'https://xiaohongshu.com/?ref=YOUR_AFFILIATE_ID',
    category: 'Business',
    subcategory: 'Marketing',
    icon: Briefcase,
    color: 'from-red-500 to-pink-500',
    popular: false,
    free: true,
    rating: 4
  },

  // 🎓 EDUCATION - Learning Platforms (2 Tools)
  {
    name: 'Khanmigo',
    description: 'AI tutor by Khan Academy',
    url: 'https://khanacademy.org/khanmigo?ref=YOUR_AFFILIATE_ID',
    category: 'Education',
    subcategory: 'Learning Platforms',
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500',
    popular: true,
    free: false,
    rating: 5
  },
  {
    name: 'Quizlet AI',
    description: 'AI-powered study tools and flashcards',
    url: 'https://quizlet.com/ai?ref=YOUR_AFFILIATE_ID',
    category: 'Education',
    subcategory: 'Learning Platforms',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
    free: true,
    rating: 4
  },
  
  // 🎓 EDUCATION - Presentations (2 Tools)
  {
    name: 'Tome',
    description: 'AI-powered presentation and storytelling',
    url: 'https://tome.app/?ref=YOUR_AFFILIATE_ID',
    category: 'Education',
    subcategory: 'Presentations',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    popular: true,
    free: true,
    rating: 4
  },
  {
    name: 'Gamma',
    description: 'AI presentation and document creation',
    url: 'https://gamma.app/?ref=YOUR_AFFILIATE_ID',
    category: 'Education',
    subcategory: 'Presentations',
    icon: Zap,
    color: 'from-purple-500 to-blue-500',
    popular: true,
    free: true,
    rating: 5
  },

  // 🔍 SEARCH - Research (2 Tools)
  {
    name: 'Consensus',
    description: 'AI search engine for scientific research',
    url: 'https://consensus.app/?ref=YOUR_AFFILIATE_ID',
    category: 'Search',
    subcategory: 'Research',
    icon: Search,
    color: 'from-blue-500 to-indigo-500',
    popular: false,
    free: true,
    rating: 4
  },
  {
    name: 'Elicit',
    description: 'AI research assistant for academics',
    url: 'https://elicit.org/?ref=YOUR_AFFILIATE_ID',
    category: 'Search',
    subcategory: 'Research',
    icon: Search,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    free: true,
    rating: 4
  }
];

// Organize categories with subcategories
const CATEGORY_STRUCTURE = {
  'Image Generation': ['Text to Image', 'Image Editing', 'Image Enhancement', 'AI Avatars'],
  'Video Generation': ['Text to Video', 'AI Avatars', 'Video Editing'],
  'Writing': ['Content Writing', 'Grammar & Editing', 'SEO Writing'],
  'Chat & Assistant': ['AI Assistants', 'AI Search', 'Character Chat'],
  'Audio': ['Text to Speech', 'Music Generation', 'Voice Cloning'],
  'Coding': ['Code Assistants', 'AI IDEs'],
  'Productivity': ['Automation', 'Notes & Workspace', 'Meeting Assistants', 'Calendar & Tasks'],
  'Business': ['CRM & Sales', 'Marketing'],
  'Education': ['Learning Platforms', 'Presentations'],
  'Search': ['AI Search', 'Research']
};

const AITools = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  // Get unique categories
  const categories = ['All', ...Object.keys(CATEGORY_STRUCTURE)];

  // Get subcategories for selected category
  const getSubcategories = (category) => {
    if (category === 'All') return ['All'];
    return ['All', ...(CATEGORY_STRUCTURE[category] || [])];
  };

  const subcategories = getSubcategories(selectedCategory);

  // Filter tools
  const filteredTools = AI_TOOLS.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'All' || tool.subcategory === selectedSubcategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group filtered tools by category
  const toolsByCategory = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = {};
    }
    if (!acc[tool.category][tool.subcategory]) {
      acc[tool.category][tool.subcategory] = [];
    }
    acc[tool.category][tool.subcategory].push(tool);
    return acc;
  }, {});

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            🚀 Top 110+ AI Tools of 2026
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-4 max-w-2xl mx-auto">
            Curated list of the best AI tools across all categories. Find the perfect tool for your needs with our comprehensive guide.
          </p>
          <div className="flex justify-center gap-2">
            <CoffeeButton size="small" />
          </div>
        </div>

        {/* Back to Gallery */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ExternalLink size={16} className="rotate-180" />
          <span className="text-sm">Back to Gallery</span>
        </Link>

        {/* Search & Filter */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white text-sm pl-10 pr-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 outline-none placeholder-gray-500"
            />
          </div>

          {/* Category Filter - Professional Layout */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Filter size={14} />
              <span>Filter:</span>
            </div>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSubcategory('All');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Subcategory Filter - Only show if category selected */}
          {selectedCategory !== 'All' && (
            <div className="flex flex-wrap items-center gap-2 pl-0">
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Layers size={14} />
                <span>Subcategory:</span>
              </div>
              
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => setSelectedSubcategory(subcategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedSubcategory === subcategory
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          )}

          {/* Results Count */}
          <p className="text-gray-500 text-xs">
            Showing {filteredTools.length} of {AI_TOOLS.length} tools
          </p>
        </div>

        {/* Tools Display */}
        {selectedCategory === 'All' ? (
          // Show all categories expanded
          Object.keys(CATEGORY_STRUCTURE).map((category) => {
            const categoryTools = filteredTools.filter(t => t.category === category);
            if (categoryTools.length === 0) return null;

            return (
              <div key={category} className="mb-8">
                <div 
                  className="flex items-center justify-between mb-4 cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    {category}
                    <span className="text-gray-500 text-sm font-normal">({categoryTools.length})</span>
                  </h2>
                  {expandedCategories[category] !== false ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
                
                {(expandedCategories[category] !== false) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryTools.map((tool, index) => (
                      <ToolCard key={index} tool={tool} />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          // Show selected category with subcategories
          Object.keys(toolsByCategory[selectedCategory] || {}).map((subcategory) => {
            const subcategoryTools = toolsByCategory[selectedCategory][subcategory];
            if (!subcategoryTools || subcategoryTools.length === 0) return null;

            return (
              <div key={subcategory} className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
                  {subcategory}
                  <span className="text-gray-500 text-sm font-normal">({subcategoryTools.length})</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {subcategoryTools.map((tool, index) => (
                    <ToolCard key={index} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })
        )}

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <Search size={32} className="text-gray-600" />
            </div>
            <p className="text-gray-400 mb-2">No tools found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Ad Placeholder */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700 text-center">
          <p className="text-gray-500 text-xs mb-2">Advertisement</p>
          <div className="h-24 flex items-center justify-center text-gray-600 text-sm">
            Google AdSense Banner (728x90)
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs mb-2">
            ⚠️ Some links are affiliate links. We may earn a commission at no extra cost to you.
          </p>
          <p className="text-gray-600 text-xs">
            Last updated: {new Date().toLocaleDateString()} • {AI_TOOLS.length} tools listed
          </p>
        </div>

      </div>
    </div>
  );
};

// Tool Card Component
const ToolCard = ({ tool }) => {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20"
    >
      {/* Badges */}
      <div className="absolute top-3 right-3 flex gap-1">
        {tool.popular && (
          <Star size={14} className="text-yellow-400" fill="currentColor" />
        )}
        {tool.free && (
          <span className="text-[10px] bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded">Free</span>
        )}
      </div>
      
      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < tool.rating ? 'text-yellow-400' : 'text-gray-600'}
            fill={i < tool.rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      
      {/* Icon */}
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3`}>
        <tool.icon size={20} className="text-white" />
      </div>
      
      {/* Content */}
      <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition">
        {tool.name}
      </h3>
      <p className="text-gray-400 text-xs mb-3 line-clamp-2">
        {tool.description}
      </p>
      
      {/* Category Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        <span className="text-[10px] bg-gray-700/50 text-gray-400 px-1.5 py-0.5 rounded">
          {tool.category}
        </span>
        <span className="text-[10px] bg-gray-700/30 text-gray-500 px-1.5 py-0.5 rounded">
          {tool.subcategory}
        </span>
      </div>
      
      {/* Link Button */}
      <div className="flex items-center gap-2 text-xs text-blue-400 group-hover:text-blue-300 transition">
        <span>Visit Website</span>
        <ExternalLink size={12} />
      </div>
    </a>
  );
};

export default AITools;