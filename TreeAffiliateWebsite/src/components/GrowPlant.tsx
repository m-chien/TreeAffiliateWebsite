import React from 'react';
import { ArrowRight } from 'lucide-react';
import './GrowPlant.css';

const GrowPlant: React.FC = () => {
  return (
    <section className="grow-plant bg-dark-green">
      <div className="container grow-plant-container grid">
        <div className="grow-plant-content">
          <h2 className="font-serif">Trồng Cây Cho <br/> Cuộc Sống Tốt Đẹp Hơn</h2>
        </div>
        
        <div className="grow-plant-images flex gap-4">
          <img 
            src="https://images.unsplash.com/photo-1487798452839-440eb76e1a47?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
            alt="Small plant component" 
            className="img-small"
            style={{ color: 'transparent' }}
          />
          <img 
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
            alt="Tall plant on stand component" 
            className="img-large"
            style={{ color: 'transparent' }}
          />
        </div>

        <div className="grow-plant-desc">
          <p>
            Chăm sóc cây xanh không chỉ làm đẹp không gian mà còn giúp cải thiện sức khỏe tinh thần và môi trường sống của bạn.
          </p>
          <a href="#" className="btn btn-primary gap-2 mt-4">
            Xem Thêm <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GrowPlant;
