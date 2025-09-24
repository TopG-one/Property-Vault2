import React from "react";

export default function RoleToggle({ who, setWho }) {
  const roles = ["owner", "tenant", "trade", "pm", "super"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
      <span className="text-gray-600">I am a</span>
      {roles.map((r) => (
        <button key={r} type="button" onClick={() => setWho(r)} className={`rounded-md border px-3 py-1.5 ${who === r ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-white"}`}>{labelForRole(r)}</button>
      ))}
    </div>
  );
}

export function labelForRole(r) {
  switch (r) {
    case "super": return "Super Admin";
    case "owner": return "Owner";
    case "tenant": return "Tenant";
    case "trade": return "Trade";
    case "pm": return "Property Manager";
    default: return r || "User";
  }
}