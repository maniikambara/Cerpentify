import React, { useState, useEffect } from "react";
import BackgroundBlue from "../Component/Backgroundblue.jsx";
import Navbar from "../Component/Navbar.jsx";
import FloatButton from "../Component/FloatingAdd.jsx";
import CardWhite from "../Component/Whitecard.jsx";
import { db } from "../Firebase/firebase"; // Import db dari file firebase.js
import { collection, getDocs } from "firebase/firestore";

export default function Koleksi() {
  const [cerpenList, setCerpenList] = useState([]);
  const [filteredCerpen, setFilteredCerpen] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fungsi untuk mengambil data cerpen di Firestore
  const fetchCerpenData = async () => {
    try {
      const cerpenCollection = collection(db, "cerpen");
      const cerpenSnapshot = await getDocs(cerpenCollection);
      const cerpenData = cerpenSnapshot.docs.map((doc) => ({
        id: doc.id,  // Menambahkan id dokumen ke data
        ...doc.data(),  // Menambahkan data dokumen
      }));
      setCerpenList(cerpenData);  // Menyimpan data cerpen beserta id ke state
      setFilteredCerpen(cerpenData);  // Inisialisasi filteredCerpen dengan data awal
    } catch (error) {
      console.error("Error fetching cerpen data:", error);
    }
  };

  // Fungsi untuk menangani pencarian cerpen berdasarkan judul dan kategori
  const handleSearch = (searchTerm, selectedCategory) => {
    let filtered = cerpenList;

    // Filter berdasarkan judul
    if (searchTerm) {
      filtered = filtered.filter(
        (cerpen) =>
          cerpen.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter berdasarkan kategori
    if (selectedCategory) {
      filtered = filtered.filter((cerpen) => cerpen.category === selectedCategory);
    }

    setFilteredCerpen(filtered);  // Menampilkan hasil pencarian berdasarkan kategori dan judul
  };

  // Mengambil data cerpen ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchCerpenData();
  }, []); // Hanya sekali saat mount

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div className="fixed">
        <BackgroundBlue />
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        <Navbar onSearch={handleSearch} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translate(-50%, 0)",
          zIndex: 5,
          width: "100%",
          height: "auto",
          marginTop: "100px",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          boxSizing: "border-box",
        }}
      >
        {/* Render Cerpen Data */}
        {[...Array(4)].map((_, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "flex",
              justifyContent: "center", // Untuk menyejajarkan kartu di tengah
              alignItems: "center", // Untuk menyejajarkan kartu secara vertikal
              gap: "50px",
              width: "100%",
            }}
          >
            {filteredCerpen.slice(rowIdx * 5, rowIdx * 5 + 5).map((cerpen, cardIdx) => (
              <CardWhite
                key={cardIdx}
                id={cerpen.id}  // Menyertakan id sebagai prop
                title={cerpen.title}
                author={cerpen.author}
                content={cerpen.content}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Floating Action Button */}
      <div className="relative min-h-screen">
        <FloatButton />
        </div>
    </div>
  );
}
