"use client";

import React from "react";

interface FloatingInputProps {
  label: string;
  type: "text" | "email" | "tel" | "textarea";
}

const FloatingInput: React.FC<FloatingInputProps> = ({ label, type }) => {
  const baseStyles =
    "peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-white text-gray-700 placeholder-transparent";

  const labelStyles =
    "absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600";

  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea placeholder=" " rows={4} className={`${baseStyles} resize-none`} />
      ) : (
        <input type={type} placeholder=" " className={baseStyles} />
      )}
      <label className={labelStyles}>{label}</label>
    </div>
  );
};

export default FloatingInput;
