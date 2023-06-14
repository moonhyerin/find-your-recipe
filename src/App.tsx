import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import { LandingPage, RecipePage, AboutPage } from './pages';

function App() {
  return (
    <div className='text-center h-screen'>
      <BrowserRouter>
        <header>
          <Header />
        </header>
        {/* Landing page */}
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/recipes' element={<RecipePage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
        <footer>
          <div className='py-5'>
            <p className='text-xs font-light text-gray-300'>
              ⓒ 2023. Hyerin Moon all rights reserved.
            </p>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
