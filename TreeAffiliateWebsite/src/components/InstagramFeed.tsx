import React from "react";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import "./InstagramFeed.css";

const INSTA_POSTS = [
  {
    id: 1,
    likes: 234,
    img: "/images/bush3.jpg",
  },
  {
    id: 2,
    likes: 189,
    img: "/images/bush1.jpg",
  },
  {
    id: 3,
    likes: 541,
    img: "/images/bush2.jpg",
  },
  {
    id: 4,
    likes: 320,
    img: "/images/bush4.jpg",
  },
  {
    id: 5,
    likes: 672,
    img: "/images/bush.jpg",
  },
];

const InstagramFeed = () => {
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
