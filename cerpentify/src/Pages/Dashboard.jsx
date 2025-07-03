import React from "react";
import BackgroundPattern from "../Component/Background.jsx";
import Navbar from "../Component/Navbar.jsx";

export default function Dashboard() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <BackgroundPattern />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}>
        <Navbar />
      </div>
    </div>
  );
}
