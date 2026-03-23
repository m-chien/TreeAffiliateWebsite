import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryCards from './components/CategoryCards';
import Products from './components/Products';
import GrowPlant from './components/GrowPlant';
import CareSteps from './components/CareSteps';
import BlogBanner from './components/BlogBanner';
import InstagramFeed from './components/InstagramFeed';
import ReviewSection from './components/ReviewSection';
import ComparisonTable from './components/ComparisonTable';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <CategoryCards />
        <Products />
        <ReviewSection />
        <ComparisonTable />
        <GrowPlant />
        <CareSteps />
        <BlogBanner />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}

export default App;
