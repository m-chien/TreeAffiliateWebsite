import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ComparisonPage from './pages/ComparisonPage';
import BlogListingPage from './pages/BlogListingPage';
import BlogDetailPage from './pages/BlogDetailPage';
import PlantReviewPage from './pages/PlantReviewPage';
import ReviewListingPage from './pages/ReviewListingPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/AdminLogin';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/blog" element={<BlogListingPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/reviews" element={<ReviewListingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/review/monstera" element={<PlantReviewPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
