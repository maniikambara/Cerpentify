import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';  // Menggunakan useLocation untuk mengambil state
import { db } from '../Firebase/firebase';  // Mengimpor firebase config
import { doc, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';  // Import Timestamp dari firestore
import BackgroundBlue from "../Component/Backgroundblue.jsx";
import Navbar from "../Component/Navbar.jsx";
import FloatButton from "../Component/FloatingAdd.jsx";

export const Cerpen = () => {
  const { id } = useParams();  // Mengambil ID cerpen dari URL
  const { state } = useLocation();  // Mengambil state yang diteruskan dari CardWhite
  const [cerpen, setCerpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengonversi Timestamp menjadi string tanggal yang lebih mudah dibaca
  const formatDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {  // Periksa apakah timestamp adalah instance dari Timestamp
      const date = timestamp.toDate(); // Mengubah Timestamp menjadi objek Date
      return date.toLocaleDateString('id-ID', { // Format tanggal Indonesia
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Tanggal tidak tersedia'; // Jika bukan Timestamp
  };

  useEffect(() => {
    const fetchCerpen = async () => {
      try {
        setLoading(true);  // Mulai loading
        const docRef = doc(db, "cerpen", id);  // Mengambil dokumen berdasarkan ID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCerpen(docSnap.data());
        } else {
          setError('Cerpen tidak ditemukan');
        }
      } catch (error) {
        setError('Terjadi kesalahan saat mengambil data cerpen: ' + error.message);
      } finally {
        setLoading(false);  // Selesai loading
      }
    };

    fetchCerpen();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <BackgroundBlue />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
        <Navbar />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "50px", position: "absolute", top: "5%", zIndex: 5, width: "100%", height: "auto", marginTop: "100px", boxSizing: "border-box" }}>
        <div style={{display:"flex", flexDirection: "column", gap:"10px", justifyContent: "center", alignItems: "center"}}>
          <div className="w-270 bg-white rounded-xl py-8 px-50 shadow-md">
            <h1 className="text-5xl w-full font-bold p-3 pb-5 rounded-lg mb-4">{cerpen.title}</h1>
            <div className="flex flex-wrap gap-2 pb-4">
              {cerpen.categories && cerpen.categories.map((category, index) => (
                <span key={index} className="flex bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">{category}</span>
              ))}
            </div>
            {/* Menampilkan scraped_at yang sudah diformat */}
            <p className="text-indigo-700 pl-3 pb-5">Penulis: {cerpen.author} | Tanggal Upload: {formatDate(state?.scraped_at)}</p>
            <p className="w-full min-h-60 p-4 border border-gray-200 rounded-lg shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 mb-6">
              {cerpen.content}
            </p>
          </div>
        </div>
      </div>
      <div className="relative min-h-screen">
        <FloatButton />
      </div>
    </div>
  );
};
