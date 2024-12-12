import React from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { blogPosts } from '../../data/blogPosts';

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Latest Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 text-center">
            Sharing insights about Web3 development, blockchain technology, and the future of decentralized applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;