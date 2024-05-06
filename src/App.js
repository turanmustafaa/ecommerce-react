// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/MainLayout';
import Home from './pages/Home';
import CardDetail from './pages/CardDetail';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-detail/:id" element={<CardDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
