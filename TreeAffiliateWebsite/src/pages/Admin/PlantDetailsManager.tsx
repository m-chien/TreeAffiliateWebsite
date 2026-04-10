import React, { useState, useEffect } from 'react';
import { Leaf, Info, HelpCircle, Tag, Plus, Trash2, Save, Check, Download } from 'lucide-react';
import styles from './PlantDetailsManager.module.css';
import { managedPlants } from '../../data/adminData';

interface FAQ {
  id: string;
  cauHoi: string;
  cauTraLoi: string;
}

const PlantDetailsManager: React.FC = () => {
  const [selectedPlantId, setSelectedPlantId] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);
  const [showImportBox, setShowImportBox] = useState(false);
  const [importText, setImportText] = useState('');

  // HuongDanChamSoc
  const [anhSang, setAnhSang] = useState('');
  const [cheDoNuoc, setCheDoNuoc] = useState('');
  const [datVaDinhDuong, setDatVaDinhDuong] = useState('');
  const [doAnToan, setDoAnToan] = useState('');

  // ThongTinNoiBat
  const [uuDiem, setUuDiem] = useState('');
  const [nhuocDiem, setNhuocDiem] = useState('');

  // CauHoiThuongGap
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: '1', cauHoi: '', cauTraLoi: '' }
  ]);

  // KhuyenMai
  const [tenKhuyenMai, setTenKhuyenMai] = useState('');
  const [phanTramGiam, setPhanTramGiam] = useState<number | ''>('');

  // Reset form when plant changes to simulate fetching new data
  useEffect(() => {
    if (selectedPlantId) {
      setAnhSang('Sáng gián tiếp, tránh ánh nắng gắt trực tiếp.');
      setCheDoNuoc('Tưới 1-2 lần/tuần khi đất trên bề mặt đã khô.');
      setDatVaDinhDuong('Đất tơi xốp, thoát ẩm tốt, giàu mùn.');
      setDoAnToan('Cần để xa tầm tay trẻ em và thú cưng (có thể gây ngộ độc nhẹ nếu ăn phải).');
      
      setUuDiem('Lá to đẹp, mang lại cảm giác nhiệt đới\nThanh lọc không khí rất tốt\nDễ chăm sóc, sinh trưởng mạnh');
      setNhuocDiem('Cần không gian rộng để phát triển\nLá dễ bám bụi cần lau chùi thường xuyên');
      
      setFaqs([
        { id: Date.now().toString(), cauHoi: 'Bao lâu thì cây ra lá mới?', cauTraLoi: 'Tùy vào điều kiện ánh sáng và dinh dưỡng, thường 1-2 tháng/lá.'}
      ]);

      setTenKhuyenMai('Giảm giá tháng xanh');
      setPhanTramGiam(10);
      setIsSaved(false);
    } else {
      setAnhSang(''); setCheDoNuoc(''); setDatVaDinhDuong(''); setDoAnToan('');
      setUuDiem(''); setNhuocDiem('');
      setFaqs([]);
      setTenKhuyenMai(''); setPhanTramGiam('');
    }
  }, [selectedPlantId]);

  const handleAddFaq = () => {
    setFaqs([...faqs, { id: Date.now().toString(), cauHoi: '', cauTraLoi: '' }]);
  };

  const handleRemoveFaq = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  const handleFaqChange = (id: string, field: 'cauHoi' | 'cauTraLoi', value: string) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleSave = () => {
    if (!selectedPlantId) return;
    
    // Simulate API call to save
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleQuickImport = () => {
    const lines = importText.split('\n');
    let tmpUuDiem: string[] = [];
    let tmpNhuocDiem: string[] = [];
    let tmpFaqs: FAQ[] = [];

    lines.forEach(line => {
      const text = line.trim();
      if (!text) return;
      
      if (text.startsWith('[Sang]')) setAnhSang(text.replace('[Sang]', '').trim());
      else if (text.startsWith('[Nuoc]')) setCheDoNuoc(text.replace('[Nuoc]', '').trim());
      else if (text.startsWith('[Dat]')) setDatVaDinhDuong(text.replace('[Dat]', '').trim());
      else if (text.startsWith('[AnToan]')) setDoAnToan(text.replace('[AnToan]', '').trim());
      else if (text.startsWith('[Uu]')) tmpUuDiem.push(text.replace('[Uu]', '').trim());
      else if (text.startsWith('[Nhuoc]')) tmpNhuocDiem.push(text.replace('[Nhuoc]', '').trim());
      else if (text.startsWith('[FAQ]')) {
        const parts = text.replace('[FAQ]', '').split('|');
        if (parts.length >= 2) {
          tmpFaqs.push({ 
            id: Date.now().toString() + Math.random().toString(), 
            cauHoi: parts[0].trim(), 
            cauTraLoi: parts[1].trim() 
          });
        }
      }
      else if (text.startsWith('[KM]')) {
        const parts = text.replace('[KM]', '').split('|');
        if (parts.length >= 1) setTenKhuyenMai(parts[0].trim());
        if (parts.length >= 2) setPhanTramGiam(Number(parts[1].trim()));
      }
    });

    if (tmpUuDiem.length > 0) setUuDiem(tmpUuDiem.join('\n'));
    if (tmpNhuocDiem.length > 0) setNhuocDiem(tmpNhuocDiem.join('\n'));
    if (tmpFaqs.length > 0) setFaqs(tmpFaqs);

    setShowImportBox(false);
    setImportText('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý Thông số Cây cảnh</h1>
        <p className={styles.subtitle}>Cập nhật hướng dẫn chăm sóc, thông tin nổi bật, giải đáp và khuyến mãi tương ứng từng cây</p>
      </div>

      {/* Select Plant */}
      <div className={styles.selectCard}>
        <div className={styles.selectGroup}>
          <label>Chọn cây cảnh để cấu hình</label>
          <select 
            className={styles.select} 
            value={selectedPlantId} 
            onChange={(e) => setSelectedPlantId(e.target.value)}
          >
            <option value="">-- Vui lòng chọn một cây --</option>
            {managedPlants.map(plant => (
              <option key={plant.id} value={plant.id}>
                {plant.name} ({plant.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedPlantId && (
        <div className={styles.formsWrapper}>
          
          {/* Quick Import Settings */}
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              className={styles.addBtn}
              onClick={() => setShowImportBox(!showImportBox)}
              style={{ backgroundColor: '#e2e8f0', color: '#1e293b', border: 'none' }}
            >
              <Download size={18} /> {showImportBox ? 'Đóng hộp nhập nhanh' : 'Nhập nhanh từ chuỗi'}
            </button>
          </div>

          {showImportBox && (
            <div className={styles.card} style={{ backgroundColor: '#f1f5f9', border: '1px dashed #94a3b8' }}>
              <h3 style={{ marginBottom: '10px', fontSize: '1rem' }}>Cú pháp Nhập liệu:</h3>
              <ul style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '16px', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li><code>[Sang] Nội dung ánh sáng</code></li>
                <li><code>[Nuoc] Nội dung chế độ nước</code></li>
                <li><code>[Dat] Nội dung đất và dinh dưỡng</code></li>
                <li><code>[AnToan] Nội dung an toàn</code></li>
                <li><code>[Uu] Nêu 1 ưu điểm (có thể dùng nhiều lần)</code></li>
                <li><code>[Nhuoc] Nêu 1 nhược điểm (có thể dùng nhiều lần)</code></li>
                <li><code>[FAQ] Cây có hoa không? | Dạ cây có hoa mọc theo chùm.</code> (Cách nhau bởi dấu <code>|</code>)</li>
                <li><code>[KM] Flash sale 15/4 | 20</code> (Tên KM | Phần trăm)</li>
              </ul>
              <textarea 
                className={styles.textarea}
                style={{ width: '100%', minHeight: '150px', marginBottom: '16px' }}
                placeholder="Dán chuỗi văn bản theo luật vào đây..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
              />
              <button 
                className={styles.saveBtn} 
                onClick={handleQuickImport}
                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
              >
                Xác nhận Nhập
              </button>
            </div>
          )}
          
          {/* Table: HuongDanChamSoc */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><Leaf size={20} color="#2e8b57"/> Hướng Dẫn Chăm Sóc</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Ánh Sáng</label>
                <textarea 
                  className={styles.textarea} 
                  placeholder="Yêu cầu về ánh sáng..."
                  value={anhSang}
                  onChange={(e) => setAnhSang(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Chế Độ Nước</label>
                <textarea 
                  className={styles.textarea} 
                  placeholder="Lịch tưới và lưu ý..."
                  value={cheDoNuoc}
                  onChange={(e) => setCheDoNuoc(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Đất Và Dinh Dưỡng</label>
                <textarea 
                  className={styles.textarea} 
                  placeholder="Loại đất phù hợp..."
                  value={datVaDinhDuong}
                  onChange={(e) => setDatVaDinhDuong(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Độ An Toàn</label>
                <textarea 
                  className={styles.textarea} 
                  placeholder="Lưu ý đối với trẻ em, vật nuôi..."
                  value={doAnToan}
                  onChange={(e) => setDoAnToan(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table: ThongTinNoiBat */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><Info size={20} color="#3b82f6"/> Thông Tin Nổi Bật</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Ưu Điểm (Pros)</label>
                <textarea 
                  className={styles.textarea} 
                  style={{ minHeight: '120px' }}
                  placeholder="Mỗi dòng 1 ưu điểm..."
                  value={uuDiem}
                  onChange={(e) => setUuDiem(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nhược Điểm (Cons)</label>
                <textarea 
                  className={styles.textarea} 
                  style={{ minHeight: '120px' }}
                  placeholder="Mỗi dòng 1 nhược điểm..."
                  value={nhuocDiem}
                  onChange={(e) => setNhuocDiem(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table: CauHoiThuongGap */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><HelpCircle size={20} color="#f59e0b"/> Câu Hỏi Thường Gặp (FAQ)</h2>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={faq.id} className={styles.faqItem}>
                  <button className={styles.removeFaqBtn} onClick={() => handleRemoveFaq(faq.id)} title="Xóa">
                    <Trash2 size={18} />
                  </button>
                  <div className={styles.formGroup} style={{ marginBottom: '12px', paddingRight: '30px' }}>
                    <label>Câu hỏi #{index + 1}</label>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={faq.cauHoi}
                      onChange={(e) => handleFaqChange(faq.id, 'cauHoi', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Câu trả lời</label>
                    <textarea 
                      className={styles.textarea} 
                      value={faq.cauTraLoi}
                      onChange={(e) => handleFaqChange(faq.id, 'cauTraLoi', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <button className={styles.addBtn} onClick={handleAddFaq}>
                <Plus size={18} /> Thêm Cặp Hỏi - Đáp
              </button>
            </div>
          </div>

          {/* Table: KhuyenMai */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><Tag size={20} color="#ef4444"/> Thông Tin Khuyến Mãi</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Tên Khuyến Mãi</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="VD: Flash Sale Cuối Tuần"
                  value={tenKhuyenMai}
                  onChange={(e) => setTenKhuyenMai(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phần Trăm Giảm (%)</label>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  step="0.01"
                  className={styles.input} 
                  placeholder="VD: 15.5"
                  value={phanTramGiam}
                  onChange={(e) => setPhanTramGiam(e.target.value ? Number(e.target.value) : '')}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.saveWrapper}>
            <button className={styles.saveBtn} onClick={handleSave}>
              {isSaved ? <><Check size={20} /> Đã lưu thành công</> : <><Save size={20} /> Lưu tất cả thông số</>}
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default PlantDetailsManager;
