import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import './InstagramFeed.css';

const INSTA_POSTS = [
  { id: 1, likes: 234, img: 'https://images.unsplash.com/photo-1416879598555-523e00dd2f97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 2, likes: 189, img: 'https://images.unsplash.com/photo-1459385311090-671c668b5ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 3, likes: 541, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 4, likes: 320, img: 'https://images.unsplash.com/photo-1497250681554-fc1acffc19f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 5, likes: 672, img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
];

const InstagramFeed: React.FC = () => {
  return (
    <section className="insta-feed container section-padding text-center">
      <motion.h3 
        className="font-serif insta-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        Theo Dõi Chúng Tôi Trên Instagram
      </motion.h3>
      <div className="insta-grid grid">
        {INSTA_POSTS.map((post, index) => (
          <motion.div 
            key={post.id} 
            className="insta-item"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={post.img} alt={`Instagram feed ${post.id}`} />
            <div className="insta-overlay flex flex-col items-center justify-center">
              <Instagram size={36} color="white" />
              <span>{post.likes} Lượt thích</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
