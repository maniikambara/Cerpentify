import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import Koleksi from './Pages/Koleksi.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/koleksi" element={<Koleksi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
