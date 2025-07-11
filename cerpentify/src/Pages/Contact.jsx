import React from "react";
import BackgroundPattern from "../Component/Background.jsx";
import Navbar from "../Component/Navbar.jsx";
import FloatButton from "../Component/FloatingAdd.jsx";

export default function ContactPage() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <BackgroundPattern />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
        <Navbar />
      </div>
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: "50px", 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)", 
        zIndex: 5, 
        width: "100%", 
        height: "auto", 
        paddingLeft: "5vw", 
        paddingRight: "5vw", 
        boxSizing: "border-box",
        marginTop: "60px"
      }}>
        {/* Main Title */}
        <h1 style={{ 
          fontSize: "3rem", 
          fontWeight: "bold", 
          color: "#1a1a1a", 
          textAlign: "center", 
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}>
          Jika Ada Permasalahan Bisa Kontak Kami...
        </h1>
        {/* Subtitle */}
        <p style={{ 
          fontSize: "1.1rem", 
          color: "#666", 
          textAlign: "center"
        }}>
          Hubungi Kontak Dibawah Ini
        </p>
        {/* Contact Cards Container */}
        <div className="flex gap-8 w-full max-w-[1000px] justify-center flex-wrap">
          {/* Email Card */}
          <div
            className="group bg-indigo-500 border-2 border-indigo-400 rounded-2xl p-10 text-white text-center min-w-[300px] flex-1 max-w-[450px] shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-2 hover:scale-105 hover:bg-indigo-600 hover:border-indigo-700"
          >
            <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#6B7280" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 font-sans">Support@help.com</h2>
            <p className="text-base opacity-100 leading-6">Jalan Tercepat untuk Menemukan Jawaban</p>
          </div>
          {/* Phone Card */}
          <div
            className="group bg-rose-500 border-2 border-rose-400 rounded-2xl p-10 text-white text-center min-w-[300px] flex-1 max-w-[450px] shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-2 hover:scale-105 hover:bg-rose-600 hover:border-rose-700"
          >
            <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#6B7280" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 font-sans">+6234567890</h2>
            <p className="text-base opacity-90 leading-6">Selalu Siap Memberikan Dukungan</p>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        width: "60px",
        height: "60px",
        opacity: "0.1",
        zIndex: 1
      }}>
        <svg viewBox="0 0 24 24" fill="#667eea">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
      <div style={{
        position: "absolute",
        top: "15%",
        right: "15%",
        width: "80px",
        height: "80px",
        opacity: "0.1",
        zIndex: 1
      }}>
        <svg viewBox="0 0 24 24" fill="#f5576c">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "8%",
        width: "70px",
        height: "70px",
        opacity: "0.1",
        zIndex: 1
      }}>
        <svg viewBox="0 0 24 24" fill="#764ba2">
          <path d="M9 11H7v9a2 2 0 002 2h8a2 2 0 002-2v-9h-2m-4-6V3a1 1 0 00-1-1h-4a1 1 0 00-1 1v2M3 6h18"/>
        </svg>
      </div>
      <div style={{
        position: "absolute",
        bottom: "15%",
        right: "10%",
        width: "90px",
        height: "90px",
        opacity: "0.1",
        zIndex: 1
      }}>
        <svg viewBox="0 0 24 24" fill="#f093fb">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <div className="relative min-h-screen">
        <FloatButton />
      </div>
    </div>
  );
}