import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Leaf } from "lucide-react";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./EmailSubscriptionModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EmailSubscriptionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setEmail("");
      }, 2000);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="email-modal-content"
            initial={{ opacity: 0, x: "-50%", y: "-35%", scale: 0.9 }}
            animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
            exit={{ opacity: 0, x: "-50%", y: "-35%", scale: 0.9 }}
          >
            <button className="modal-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
            
            {!submitted ? (
              <div className="modal-inner">
                <div className="modal-icon-wrapper">
                  <Leaf className="modal-leaf-icon" size={32} />
                </div>
                <h2>Vui lòng nhập Email</h2>
                <p>
                  Để thêm sản phẩm/bài viết vào danh sách yêu thích và nhận thông
                  báo mới nhất từ chúng tôi, bạn cần đăng nhập bằng email.
                </p>
                <form onSubmit={handleSubmit} className="email-form">
                  <div className="input-group">
                    <Mail className="input-icon" size={20} />
                    <input
                      type="email"
                      placeholder="Nhập email của bạn..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-submit-email">
                    Đăng nhập / Đăng ký
                  </button>
                </form>
              </div>
            ) : (
              <div className="modal-inner success-state">
                <div className="modal-icon-wrapper success">
                  <Leaf className="modal-leaf-icon" size={32} />
                </div>
                <h2>Thành công!</h2>
                <p>Đã ghi nhận nhận email của bạn. Chúc bạn một ngày tốt lành!</p>
              </div>
            )}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default EmailSubscriptionModal;
