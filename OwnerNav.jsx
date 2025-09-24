import React from "react";
import { Home, Building, Wrench, DollarSign, FileText, Users, Settings, Mail } from "lucide-react";

export default function OwnerNav({ current, onChange }) {
  const tabs = [
    { key: "overview", label: "Overview", icon: Home },
    { key: "properties", label: "Properties", icon: Building },
    { key: "maintenance", label: "Maintenance", icon: Wrench },
    { key: "payments", label: "Payments", icon: DollarSign },
    { key: "documents", label: "Documents", icon: FileText },
    { key: "households", label: "Households", icon: Users },
    { key: "notifications", label: "Notifications", icon: Mail },
    { key: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <nav className="sticky top-[57px] z-20 bg-white/70 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 overflow-x-auto">
        <ul className="flex gap-1 py-2">
          {tabs.map((t) => (
            <li key={t.key}>
              <button onClick={() => onChange(t.key)} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${current === t.key ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}