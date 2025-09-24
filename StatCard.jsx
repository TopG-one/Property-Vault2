import React from "react";

export default function StatCard({ icon, label, value, sub }) {
  return (
    <div className="rounded-xl border bg-white p-4 flex flex-col items-center">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  );
}