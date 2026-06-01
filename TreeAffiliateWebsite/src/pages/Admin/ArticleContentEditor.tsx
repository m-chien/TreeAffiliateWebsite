import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  X, 
  Save, 
  Search, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Bold, 
  Italic, 
  List, 
  Plus
} from 'lucide-react';
import styles from './ArticleContentEditor.module.css';
import type { ManagedArticle } from '../../types';
// Tạm thời comment mock data lại vì chúng ta sẽ gọi API thật
// import { managedPlants } from '../../data/adminData';

interface Props {
  article: ManagedArticle;
  onClose: () => void;
  onSave: (article: ManagedArticle) => void;
}

const ArticleContentEditor: React.FC<Props> = ({ article, onClose, onSave }) => {
  const [content, setContent] = useState(article.content || '');
  const [title, setTitle] = useState(article.title);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State lưu danh sách cây cảnh lấy từ API
  const [plantsList, setPlantsList] = useState<any[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 1. Fetch danh sách cây cảnh từ Spring Boot khi mở Editor
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/cay-canh?page=0&size=50');
        const data = res.data.result?.content || [];
        
        const formattedPlants = data.map((item: any) => {
          // Xử lý thông minh: Nếu có ảnh thì kiểm tra xem nó là link web (http) hay file cục bộ
          const imagePath = item.anh 
            ? (item.anh.startsWith('http') ? item.anh : `/images/${item.anh}`) 
            : 'https://via.placeholder.com/150';

          return {
            id: item.id,
            name: item.tenCay || 'Cây chưa có tên',
            imageUrl: imagePath // Dùng đường dẫn đã xử lý
          };
        });
        
        setPlantsList(formattedPlants);
      } catch (error) {
        console.error("Lỗi khi tải danh sách cây cảnh:", error);
      }
    };
    fetchPlants();
  }, []);

  const filteredProducts = plantsList.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const insertText = (before: string, after: string = '') => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = content;
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    setContent(newText);
    
    // Reset focus and selection
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  // 2. GỌI API LƯU LIÊN KẾT & CHÈN KHỐI HTML QUẢNG CÁO ĐẸP MẮT
  const insertProductLink = async (p: any) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/bai-viet/${article.id}/cay-canh/${p.id}`);
      
      // Chỉ chèn một mã Shortcode đơn giản mang theo ID của cây
      const productTag = `\n\n[PRODUCT_LINK:${p.id}]\n\n`;
      insertText(productTag);
      
    } catch (error) {
      console.error("Lỗi khi gắn cây:", error);
      alert("Đã xảy ra lỗi khi lưu liên kết vào hệ thống.");
    }
  };

  const handleSave = () => {
    onSave({
      ...article,
      title,
      content
    });
  };

  return (
    <div className={styles.editorOverlay}>
      <header className={styles.editorHeader}>
        <div className={styles.editorTitle}>
          <button className={styles.btnSecondary} onClick={onClose} style={{ padding: '8px' }}>
            <X size={20} />
          </button>
          <span>Đang soạn thảo: <strong>{article.title}</strong></span>
        </div>
        <div className={styles.editorActions}>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>
            <Save size={18} /> Lưu bài viết
          </button>
        </div>
      </header>

      <div className={styles.editorBody}>
        <main className={styles.mainForm}>
          <div className={styles.inputGroup}>
            <label>Tiêu đề bài viết</label>
            <input 
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề hấp dẫn..."
              disabled // Tiêu đề thường được quản lý ở Form ngoài, trong này chỉ soạn nội dung
            />
          </div>

          <div className={styles.contentArea}>
            <label>Nội dung chi tiết</label>
            <div className={styles.toolbar}>
              <button className={styles.toolbarBtn} onClick={() => insertText('**', '**')} title="In đậm"><Bold size={16}/></button>
              <button className={styles.toolbarBtn} onClick={() => insertText('_', '_')} title="In nghiêng"><Italic size={16}/></button>
              <button className={styles.toolbarBtn} onClick={() => insertText('\n- ')} title="Danh sách"><List size={16}/></button>
              <button className={styles.toolbarBtn} onClick={() => insertText('<a href="url" target="_blank">', '</a>')} title="Gắn link ngoại"><LinkIcon size={16}/></button>
              <button className={styles.toolbarBtn} onClick={() => insertText('<img src="link_anh" alt="mô_tả" width="100%">') } title="Chèn ảnh"><ImageIcon size={16}/></button>
            </div>
            <textarea 
              ref={textareaRef}
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Bắt đầu câu chuyện về những mầm xanh của bạn tại đây... (Hỗ trợ viết HTML/Markdown)"
            />
          </div>
        </main>

        <aside className={styles.productSidebar}>
          <div className={styles.sidebarHeader}>
            <h3 className={styles.sidebarTitle}>
              <Search size={18} /> Gắn sản phẩm cây
            </h3>
            <div className={styles.searchBox}>
              <Search size={16} color="#94a3b8" />
              <input 
                placeholder="Tìm tên cây để chèn link..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.productList}>
            {filteredProducts.map(p => (
              <div key={p.id} className={styles.productItem}>
                <img src={p.imageUrl} alt={p.name} className={styles.productImg} />
                <div className={styles.productInfo}>
                  <span className={styles.productName}>{p.name}</span>
                  <button className={styles.insertBtn} onClick={() => insertProductLink(p)}>
                    <Plus size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                    Gắn vào bài
                  </button>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', marginTop: '20px' }}>
                Đang tải hoặc không tìm thấy cây...
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticleContentEditor;