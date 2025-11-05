'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  image: string;
  featured: boolean;
  content?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Luxury Brand Design: 2024 Trends That Matter',
    excerpt: 'Discover the emerging design trends that are reshaping luxury brand experiences, from neo-brutalism to immersive 3D interfaces.',
    author: {
      name: 'Elena Rodriguez',
      avatar: '/placeholder.svg',
    },
    category: 'Design Trends',
    tags: ['Design', 'Luxury', 'Trends', '2024'],
    publishDate: '2024-01-15',
    readTime: '8 min read',
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: '2',
    title: 'Performance Optimization: How We Achieved 99% Core Web Vitals',
    excerpt: 'A deep dive into the technical strategies and optimization techniques that helped us achieve perfect Core Web Vitals scores.',
    author: {
      name: 'Marcus Chen',
      avatar: '/placeholder.svg',
    },
    category: 'Development',
    tags: ['Performance', 'Web Vitals', 'Optimization'],
    publishDate: '2024-01-10',
    readTime: '12 min read',
    image: '/placeholder.svg',
    featured: false,
  },
  {
    id: '3',
    title: 'Data-Driven Design: Converting Insights into User Experiences',
    excerpt: 'Learn how we use analytics, user research, and behavioral data to create designs that drive real business results.',
    author: {
      name: 'Sophia Williams',
      avatar: '/placeholder.svg',
    },
    category: 'Strategy',
    tags: ['UX', 'Data', 'Analytics', 'Strategy'],
    publishDate: '2024-01-05',
    readTime: '6 min read',
    image: '/placeholder.svg',
    featured: false,
  },
  {
    id: '4',
    title: 'Building Trust in Digital Luxury: The Psychology of Premium UX',
    excerpt: 'Understanding the psychological principles that make users perceive digital experiences as premium and trustworthy.',
    author: {
      name: 'David Kim',
      avatar: '/placeholder.svg',
    },
    category: 'Psychology',
    tags: ['Psychology', 'UX', 'Luxury', 'Trust'],
    publishDate: '2024-01-01',
    readTime: '10 min read',
    image: '/placeholder.svg',
    featured: false,
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="insights" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            Latest{' '}
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Insights
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Explore our thoughts on design, technology, and strategy. Stay ahead 
            of the curve with insights from our team of industry experts.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-1"
            >
              <FeaturedPostCard post={featuredPost} />
            </motion.div>
          )}

          {/* Regular Posts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-6"
          >
            {regularPosts.map((post, index) => (
              <BlogPostCard 
                key={post.id} 
                post={post} 
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <Button
            onClick={() => scrollToSection('#contact')}
            variant="outline"
            className="border-2 border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-glow-gold"
          >
            <span className="flex items-center gap-2">
              View All Insights
              <ArrowRight size={20} />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

interface FeaturedPostCardProps {
  post: BlogPost;
}

function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-gold-500/30 transition-all duration-500 hover:shadow-luxury"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        />
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-luxury-900/60 backdrop-blur-sm"
        />

        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gold-500/90 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
          >
            Featured
          </motion.span>
        </div>

        {/* Read More Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8 
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 right-6"
        >
          <Button
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full px-6 py-2 backdrop-blur-sm"
            size="sm"
          >
            Read More
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(post.publishDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-gold-600 transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              <Tag size={12} />
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-foreground">{post.author.name}</div>
            <div className="text-sm text-muted-foreground">{post.category}</div>
          </div>
        </div>
      </div>

      {/* Shimmer Effect */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="absolute inset-0 bg-shimmer opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        }}
      />
    </motion.article>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  isInView: boolean;
}

function BlogPostCard({ post, index, isInView }: BlogPostCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
      className="group flex gap-6 bg-card rounded-2xl p-6 border border-border/50 hover:border-gold-500/30 transition-all duration-500 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 8 }}
    >
      {/* Thumbnail */}
      <div className="relative w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-luxury-900/40"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
          <span className="bg-gold-500/10 text-gold-600 px-2 py-1 rounded-md">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(post.publishDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>

        <h4 className="font-bold text-foreground mb-2 leading-tight group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h4>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-foreground">
              {post.author.name}
            </span>
          </div>

          <motion.div
            animate={isHovered ? { x: 4 } : { x: 0 }}
            className="text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ArrowRight size={16} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
