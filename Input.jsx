import React from "react";

export default function Input({ label, value, onChange, type = "text", className }) {
  return (
    <div className={className}>
      {label && <label className="text-sm text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}