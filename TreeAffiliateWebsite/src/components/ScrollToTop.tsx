import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang TỨC THÌ (không dùng hiệu ứng cuộn)
    window.scrollTo({
      top: 0,
       left: 0,
       behavior: "auto" // Đảm bảo hiện ra ngay lập tức, không có animation
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
