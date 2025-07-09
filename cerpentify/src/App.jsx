// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FirebaseProvider, useFirebase } from './contexts/FirebaseContext';
import Dashboard from './Pages/Dashboard.jsx';
import Koleksi from './Pages/Koleksi.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Contact from './Pages/Contact.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Loading component
const AppLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <LoadingSpinner />
  </div>
);

// Main App component wrapped with auth logic
const AppContent = () => {
  const { loading } = useFirebase();

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/koleksi" element={<Koleksi />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/kontak" element={<Contact />} />
      
      {/* Protected routes - uncomment if you want authentication */}
      {/* <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      /> */}
      
      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App component
function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <div className="App">
          <AppContent />
        </div>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;