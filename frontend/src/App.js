// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Ye components aapko banane padenge, agar already nahi bane hain
import Home from './pages/Home';
import Timer from './pages/Timer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<Timer />} />
        {/* Agar koi route match nahi hota, toh NotFound component show hoga */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
