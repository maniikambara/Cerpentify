import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Firebase/authContext.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Koleksi from './Pages/Koleksi.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Contact from './Pages/Contact.jsx';
import Landing from './Pages/Landing.jsx';
import ContactPageBefore from './Pages/ContactBefore.jsx';
import TambahCerpen from './Pages/TambahCerpen.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/koleksi" element={<Koleksi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/tambah" element={<TambahCerpen />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;