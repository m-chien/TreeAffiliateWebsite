import React from 'react';
import { Instagram } from 'lucide-react';
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
      <h3 className="font-serif insta-title">Theo Dõi Chúng Tôi Trên Instagram</h3>
      <div className="insta-grid grid">
        {INSTA_POSTS.map(post => (
          <div key={post.id} className="insta-item">
            <img src={post.img} alt={`Instagram feed ${post.id}`} />
            <div className="insta-overlay flex flex-col items-center justify-center">
              <Instagram size={36} color="white" />
              <span>{post.likes} Lượt thích</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
