
import React from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import SocialFeed from '../components/SocialFeed';
import MarketingStrategies from '../components/MarketingStrategies';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <Dashboard />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SocialFeed />
          </div>
          <div className="lg:col-span-1">
            <MarketingStrategies />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
