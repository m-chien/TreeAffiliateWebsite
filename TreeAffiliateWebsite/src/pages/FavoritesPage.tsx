import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, Calendar, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { removeFavoriteProduct } from "../store/favoritesSlice";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State quản lý Sản phẩm (Redux)
  const favoriteProducts = useSelector((state: RootState) => state.favorites.products);
  
  // State quản lý Cẩm nang đã lưu (Local Storage)
  const [favoriteArticles, setFavoriteArticles] = useState<any[]>([]);

  // Lấy dữ liệu bài viết đã lưu khi load trang
  useEffect(() => {
    window.scrollTo(0, 0);
    const savedPosts = JSON.parse(localStorage.getItem('favorite_posts') || '[]');
    setFavoriteArticles(savedPosts);
  }, []);

  // Xóa Sản phẩm (Giữ nguyên gốc của bạn)
  const removeProduct = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFavoriteProduct(id));
  };

  // Xóa Bài viết khỏi danh sách và cập nhật Local Storage
  const removeArticle = (id: number | string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const updatedArticles = favoriteArticles.filter(a => a.id.toString() !== id.toString());
    setFavoriteArticles(updatedArticles);
    localStorage.setItem('favorite_posts', JSON.stringify(updatedArticles));
  };

  // Render sao đánh giá
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#ffc107" : "#eee", fontSize: "14px" }}>★</span>
    ));
  };

  // Format ngày cho bài viết
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1><Heart size={32} color="#c86c42" style={{ display: 'inline', marginRight: '10px', verticalAlign: 'middle' }} /> Danh Sách Yêu Thích</h1>
        <p>Nơi lưu giữ những mầm xanh và kiến thức mà bạn quan tâm nhất. Hãy chuẩn bị sẵn sàng cho một không gian sống tươi mát hơn.</p>
      </div>

      <div className="favorites-container">
        
        {/* Favorite Products Section (GIỮ NGUYÊN CODE CỦA BẠN) */}
        <section className="favorites-section">
          <h2 className="section-title"><Leaf size={24} /> Sản Phẩm Đã Lưu</h2>
          
          {favoriteProducts.length > 0 ? (
            <div className="fav-products-grid">
              <AnimatePresence>
                {favoriteProducts.map((product) => {
                  const subcategory = product.danhMucList && product.danhMucList.length > 0
                    ? product.danhMucList[0]
                    : product.kichThuoc;
                  const priceFormatted = (product.gia || 0).toLocaleString("vi-VN") + "₫";
                  const imageSrc = product.anh ? `/images/${product.anh}` : "https://via.placeholder.com/300x350?text=Chua+Co+Anh";

                  return (
                    <motion.div
                      key={product.id}
                      className="product-card"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => navigate(`/review/${product.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <button className="remove-btn" onClick={(e) => removeProduct(product.id, e)} title="Xóa khỏi danh sách">
                        <Trash2 size={16} />
                      </button>
                      <div className="product-image-container">
                        {product.giaThamKhao && <span className="discount-badge">Hot</span>}
                        <img src={imageSrc} alt={product.tenCay} />
                      </div>
                      <div className="product-meta" style={{ marginTop: '15px' }}>
                        <span className="subcategory" style={{ color: '#888', fontSize: '0.85rem' }}>{subcategory}</span>
                        <span className="rating">
                          {renderStars(Math.floor(product.diemDanhGia || 5))} {(product.diemDanhGia || 5.0).toFixed(1)}
                        </span>
                      </div>
                      <h3 className="product-title" style={{ fontSize: '1.1rem', margin: '10px 0' }}>
                        {product.tenCay.startsWith("Cây") ? product.tenCay : `Cây ${product.tenCay}`}
                      </h3>
                      <div className="price-row" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span className="current-price" style={{ color: 'var(--bg-dark-green)', fontWeight: 'bold' }}>{priceFormatted}</span>
                        {product.giaThamKhao && <span className="old-price" style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>{product.giaThamKhao}</span>}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="empty-state">
              <Heart size={48} color="#ccc" />
              <p>Bạn chưa yêu thích sản phẩm nào. Hãy dạo quanh cửa hàng và lưu lại nhé!</p>
            </div>
          )}
        </section>

        {/* Favorite Articles Section (ĐÃ ĐƯỢC CHỈNH SỬA ĐỂ HIỂN THỊ DỮ LIỆU THẬT) */}
        <section className="favorites-section">
          <h2 className="section-title"><Heart size={24} /> Cẩm Nang Đã Lưu</h2>
          
          {favoriteArticles.length > 0 ? (
            <div className="fav-articles-grid">
              <AnimatePresence>
                {favoriteArticles.map((article) => (
                  <motion.div 
                    key={article.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'relative' }}
                  >
                    <button className="remove-btn" onClick={(e) => removeArticle(article.id, e)} style={{ top: '10px', right: '10px', zIndex: 10 }}>
                      <Trash2 size={16} />
                    </button>
                    <Link to={`/blog/${article.id}`} className="related-card" style={{ display: 'block', height: '100%', textDecoration: 'none', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                      {/* Đã sửa đường dẫn ảnh để tương thích với dữ liệu thật */}
                      <img src={article.anhDaiDien ? `/images/${article.anhDaiDien}` : '/images/cay1.png'} alt={article.tieuDe} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                      <div className="related-info" style={{ padding: '20px' }}>
                        <span style={{ fontSize: '0.8rem', color: '#c86c42', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>{article.tenDanhMuc}</span>
                        <h4 style={{ color: '#333', fontSize: '1.1rem', marginBottom: '15px', lineHeight: 1.4 }}>{article.tieuDe}</h4>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#888', fontSize: '0.85rem' }}><Calendar size={14}/> {formatDate(article.ngayTao)}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="empty-state">
              <Heart size={48} color="#ccc" />
              <p>Bạn chưa lưu bài viết / cẩm nang nào cả!</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default FavoritesPage;