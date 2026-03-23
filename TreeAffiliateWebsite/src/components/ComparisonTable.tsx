import React from 'react';
import { Star, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import './ComparisonTable.css';

const PLANTS_DATA = [
  { id: 'fiddle', name: 'Fiddle Leaf Fig', difficulty: 4, light: 'Sáng gián tiếp', air: 1, pet: false, price: '1.150.000₫', recommended: false },
  { id: 'monstera', name: 'Monstera', difficulty: 3, light: 'Bóng râm', air: 1, pet: false, price: '750.000₫', recommended: false },
  { id: 'snake', name: 'Snake Plant', difficulty: 2, light: 'Bóng râm', air: 2, pet: false, price: '380.000₫', recommended: true },
  { id: 'peace', name: 'Peace Lily', difficulty: 3, light: 'Ít sáng', air: 2, pet: false, price: '500.000₫', recommended: false },
];

const ComparisonTable: React.FC = () => {
  const renderStars = (count: number) => {
    return (
      <div className="flex justify-center gap-1">
        {[...Array(count)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
      </div>
    );
  };

  const renderAir = (count: number) => {
    return (
      <div className="flex justify-center gap-2">
        {[...Array(count)].map((_, i) => (
          <div key={i} style={{width: 24, height: 24, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Check size={14} color="#ffffff" strokeWidth={3} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="comparison-section section-padding container" id="compare">
      <motion.div 
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-serif section-title">So Sánh Cây Cảnh</h2>
        <p className="subtitle mx-auto">Tìm ra người bạn đồng hành xanh mát phù hợp với không gian và phong cách sống của bạn.</p>
      </motion.div>

      <motion.div 
        className="table-responsive-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <table className="compare-table">
          <thead>
            <tr>
              <th className="criteria-col" style={{textAlign: 'left'}}>Tiêu chí</th>
              {PLANTS_DATA.map(p => (
                <th key={p.id} className={p.recommended ? 'recommended-col' : ''}>
                  {p.recommended && <div className="rec-badge">Lựa Chọn Tốt Nhất</div>}
                  <h4 className="font-serif">{p.name}</h4>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="criteria-col font-medium">Độ khó chăm sóc</td>
              {PLANTS_DATA.map(p => <td key={p.id} className={p.recommended ? 'recommended-col' : ''}>{renderStars(p.difficulty)}</td>)}
            </tr>
            <tr>
              <td className="criteria-col font-medium">Ánh sáng cần thiết</td>
              {PLANTS_DATA.map(p => <td key={p.id} className={p.recommended ? 'recommended-col' : ''}>{p.light}</td>)}
            </tr>
            <tr>
              <td className="criteria-col font-medium">Lọc không khí</td>
              {PLANTS_DATA.map(p => <td key={p.id} className={p.recommended ? 'recommended-col' : ''}>{renderAir(p.air)}</td>)}
            </tr>
            <tr>
              <td className="criteria-col font-medium">Phù hợp pet</td>
              {PLANTS_DATA.map(p => (
                <td key={p.id} className={p.recommended ? 'recommended-col' : ''}>
                  {p.pet ? (
                    <div style={{width: 24, height: 24, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                      <Check size={14} color="#ffffff" strokeWidth={3} />
                    </div>
                  ) : (
                    <div style={{width: 24, height: 24, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                      <X size={14} color="#EF4444" strokeWidth={3} />
                    </div>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="criteria-col font-medium">Giá tham khảo</td>
              {PLANTS_DATA.map(p => <td key={p.id} className={`price-cell ${p.recommended ? 'recommended-col font-bold text-orange' : ''}`}>{p.price}</td>)}
            </tr>
            <tr>
              <td className="criteria-col font-medium">Nơi Bán</td>
              {PLANTS_DATA.map(p => (
                <td key={p.id} className={p.recommended ? 'recommended-col' : ''}>
                  <a href="#" className={`btn ${p.recommended ? 'btn-primary' : 'btn-outline'} btn-sm`}>Xem giá tốt nhất</a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </motion.div>
    </section>
  );
};

export default ComparisonTable;
