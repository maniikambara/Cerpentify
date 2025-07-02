import React from "react";
import abc from "../assets/abc.png";
import globe from "../assets/globe.png";
import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";
import shape3 from "../assets/shape3.png";
import computer from "../assets/computer.png";
import cat from "../assets/cat.png";

const icons = [
  { src: computer, alt: "computer icon", style: "top-[20px] left-[40px]" },
  { src: abc, alt: "abc icon", style: "top-[24px] left-[160px]" },
  { src: globe, alt: "globe icon", style: "top-[220px] left-[36px]" },
  { src: shape1, alt: "shape1 icon", style: "bottom-[80px] left-[150px]" },
  { src: globe, alt: "globe icon", style: "bottom-[40px] right-[50px]" },
  { src: computer, alt: "computer icon", style: "bottom-[100px] right-[20px]" },
  { src: shape2, alt: "shape2 icon", style: "top-[30px] right-[40px]" },
  { src: abc, alt: "abc icon", style: "bottom-[140px] left-[60px]" },
  { src: shape3, alt: "shape3 icon", style: "top-[200px] right-[60px]" },
  { src: cat, alt: "cat icon", style: "bottom-[50px] right-[200px]" },
];

const squiggles = [
  { style: "top-[60px] left-[33%]" },
  { style: "bottom-[80px] right-[25%]" },
  { style: "top-[35%] right-[60px]" },
  { style: "bottom-[40%] left-[60px]" },
];

export default function BackgroundPattern() {
  return (
    <div className="relative w-full h-screen bg-[#FCEEED] overflow-hidden">
      {/* Background Icons */}
      {icons.map((icon, index) => (
        <img
          key={index}
          src={icon.src}
          alt={icon.alt}
          className={`absolute opacity-30 w-10 h-10 ${icon.style}`}
        />
      ))}

      {/* Decorative Squiggles */}
      {squiggles.map((item, index) => (
        <div
          key={index}
          className={`absolute w-16 h-1 bg-purple-400 rotate-12 rounded-full ${item.style}`}
        />
      ))}
    </div>
  );
}
