import React from "react";
import { Home } from "lucide-react";

export default function AuthCard({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-50 grid place-items-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Home className="h-7 w-7 text-blue-600" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}