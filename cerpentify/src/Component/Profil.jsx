import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profil = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: 'Manik Ganteng Banget',
    username: 'username_aja',
    email: 'manikmanikmanik@yois.co.id',
    password: '************************',
    age: 18
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAgeChange = (increment) => {
    setFormData(prev => ({
      ...prev,
      age: increment ? prev.age + 1 : Math.max(1, prev.age - 1)
    }));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Do not close panel on save
    }, 2000);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-8">Pengaturan Profil</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Nama Lengkap</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? (
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19C7 19 2.73 15.61 1 12c.64-1.15 1.54-2.19 2.67-3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M4.21 4.21a10.05 10.05 0 0116.58 0" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.88 9.88a3 3 0 014.24 4.24" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Umur */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-3">Umur</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleAgeChange(true)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <span className="text-xl font-medium text-gray-800 min-w-[60px] text-center">
                {formData.age}
              </span>
              <button
                onClick={() => handleAgeChange(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="px-6 py-3 bg-white border-2 border-purple-200 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors">
            Ubah Password
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-white border-2 border-pink-200 text-pink-600 rounded-full font-medium hover:bg-pink-50 transition-colors">
            Keluar
          </button>
        </div>

        {/* Save and Success */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleSave}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl font-medium transition-all transform hover:scale-105 active:scale-95"
          >
            Simpan Perubahan
          </button>
          {showSuccess && (
            <span className="text-green-800 font-medium">
              Perubahan Berhasil!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;