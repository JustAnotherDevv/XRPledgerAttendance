import React from "react";

const ModernButton = ({ text, onClick }) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-sm"
    onClick={onClick}
  >
    {text}
  </button>
);

export default ModernButton;
