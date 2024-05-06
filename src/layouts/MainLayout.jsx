// src/components/Layout.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-slate-100 px-24 py-3">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
