import React from "react";

export default function InfoRow({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500">{label}:</span>
      <span>{value}</span>
    </div>
  );
}