import React from "react";

export default function EmptyState({ title, subtitle }) {
  return (
    <div className="rounded-xl border bg-white p-8 text-center text-gray-600">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm">{subtitle}</p>
    </div>
  );
}