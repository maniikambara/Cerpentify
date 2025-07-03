import React from "react";
import BackgroundPattern from "../Component/Background.jsx";
import Navbar from "../Component/Navbar.jsx";
import CardWhite from "../Component/Whitecard.jsx";

export default function Dashboard() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <BackgroundPattern />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
        <Navbar />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "80px", position: "absolute", top: "15%", left: "50%", transform: "translate(-50%, 0)", zIndex: 5, width: "100%", height: "auto" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "200px", width: "100%" }}>
          <CardWhite />
          <CardWhite />
          <CardWhite />
          <CardWhite />
          <CardWhite />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "200px", width: "100%" }}>
          <CardWhite />
          <CardWhite />
          <CardWhite />
          <CardWhite />
          <CardWhite />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "200px", width: "100%" }}>
          <CardWhite />
          <CardWhite />
          <CardWhite />
          <CardWhite />
          <CardWhite />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "200px", width: "100%" }}>
          <CardWhite />
          <CardWhite />
          <CardWhite />
          <CardWhite />
          <CardWhite />
        </div>
      </div>
    </div>
  );
}
