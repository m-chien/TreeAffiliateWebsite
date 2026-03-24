import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ComparisonPage from './pages/ComparisonPage';
import BlogListingPage from './pages/BlogListingPage';
import PlantReviewPage from './pages/PlantReviewPage';
import ReviewListingPage from './pages/ReviewListingPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/blog" element={<BlogListingPage />} />
        <Route path="/reviews" element={<ReviewListingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/review/monstera" element={<PlantReviewPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
