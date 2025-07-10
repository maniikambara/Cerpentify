import React from "react";

const getShortContent = (text, minWords = 10, maxWords = 20) => {

  const cleanText = text.replace(/[^\w\s]/g, "");
  const words = cleanText.split(" ");

  if (words.length <= maxWords) {
    return text; 
  }

  return words.slice(0, Math.max(minWords, maxWords)).join(" ") + "...";  
};

const getShortTitle = (title, minWords = 2, maxWords = 3) => {
  const cleanTitle = title.replace(/[^\w\s]/g, "");
  const words = cleanTitle.split(" ");

  if (words.length <= maxWords) {
    return title; 
  }

  return words.slice(0, Math.max(minWords, maxWords)).join(" ") + "..."; 
};

export default function CardWhite({ id, title, author, content }) {
  return (
    <div
      className="max-w-xs w-75 h-75 p-9 mb-10 bg-white rounded-2xl shadow-md space-y-4 cursor-pointer transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
      onClick={() => alert(`Card dengan ID: ${id} diklik!`)}
    >
      {/* Judul */}
      <h2 className="text-xl font-semibold text-gray-800 break-words whitespace-nowrap overflow-hidden text-ellipsis">{getShortTitle(title)}</h2> {/* Menampilkan title yang sudah dipotong */}

      {/* Deskripsi */}
      <p className="text-sm text-gray-600 leading-relaxed break-words overflow-hidden text-ellipsis h-24">{getShortContent(content)} {/* Menampilkan konten yang sudah dipotong */}</p>

      {/* Rating */}
      <span className="text-sm text-purple-600 border border-purple-300 px-3 py-1 rounded-full">
        1056 Reviews
      </span>

      {/* Penulis */}
      <div className="flex items-center space-x-3 pt-2">
        <div className="bg-gray-100 p-2 rounded-full">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0v0a4 4 0 00-8 0M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{author}</p>
          <p className="text-xs text-gray-500">Penulis</p>
        </div>
      </div>
    </div>
  );
}
