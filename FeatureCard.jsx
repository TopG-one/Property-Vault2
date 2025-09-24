import React from "react";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-xl border bg-white p-4 flex flex-col items-center shadow-sm">
      <div className="mb-2">{icon}</div>
      <div className="font-bold">{title}</div>
      <div className="text-sm text-gray-600">{desc}</div>
    </div>
  );
}