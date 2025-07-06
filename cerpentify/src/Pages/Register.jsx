import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundBlue from '../Component/Backgroundblue.jsx';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    // Tambahkan logika pendaftaran di sini
    console.log('Register clicked', { email, username, password, agreeTerms });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBlue />
      {/* Main content container */}
      <div className="flex items-center justify-center min-h-screen px-8">
        <div className="flex items-center justify-between max-w-7xl w-full">
          {/* Left side - Hero content */}
          <div className="flex-1 max-w-2xl">
            {/* Top navigation badge */}
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 border border-purple-200 inline-block">
                <span className="text-purple-600 font-medium">Website Kumpulan Cerpen Terbaik!</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Jelajahi Dunia Cerita Pendek di{' '}
              <span className="text-purple-600">Cerpentify</span>!
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Baca, bagikan, dan temukan cerita pendek terbaik dari penulis berbakat.<br />
              Mulai petualangan literasi Anda sekarang – gratis, mudah, dan penuh inspirasi!
            </p>
            {/* Action buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Sudah Punya Akun?
              </button>
              <button className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-3 rounded-full font-medium border-2 border-purple-200 transition-colors">
                Lupa Sandi?
              </button>
            </div>
          </div>
          {/* Right side - Registration form */}
          <div className="flex-shrink-0 ml-16">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-[480px] border border-gray-100">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Bergabunglah dengan Komunitas Cerpentify!
              </h2>
              <p className="text-gray-600 text-center mb-8 text-sm">
                Mulailah menjelajahi perjalanan literasimu. Daftar untuk mengakses koleksi cerpen pribadi, riwayat baca, dan komunitas.
              </p>
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Masukkan Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Masukkan Nama User Anda"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan kata sandi Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                {/* Terms checkbox */}
                <div className="flex items-start gap-3 mt-6">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    Saya menyetujui semua Ketentuan dan Kebijakan Privasi
                  </label>
                </div>
                <button
                  onClick={handleRegister}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-medium transition-colors transform hover:scale-105 active:scale-95 mt-6"
                  disabled={!agreeTerms || !email || !username || !password}
                >
                  Daftar Sekarang
                </button>
              </div>
              <div className="mt-6 text-center">
                <span className="text-gray-500 text-sm">Atau lanjutkan dengan</span>
              </div>
              <div className="mt-4 flex gap-4">
                <button className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">…</svg>
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">…</svg>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}