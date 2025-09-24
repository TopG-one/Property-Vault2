import React from "react";

export default function AssignDropdown({ onSelect }) {
  // For demo, these are static. In a real app, pull from directory/users.
  const options = [
    { group: "Owner", users: [{ id: "owner1", name: "Olivia Owner", role: "owner" }] },
    { group: "Property Manager", users: [{ id: "pm1", name: "Pat Manager", role: "pm" }] },
    { group: "Trades", users: [{ id: "trade1", name: "Tim the Handyman", role: "trade" }] },
    { group: "Tenant Admin", users: [{ id: "tenantA1", name: "John Smith", role: "tenant", householdRole: "admin" }] },
  ];
  return (
    <details className="rounded border">
      <summary className="cursor-pointer px-2 py-1">Assign…</summary>
      <div className="p-2 text-xs space-y-2">
        {options.map((g) => (
          <div key={g.group}>
            <div className="text-gray-500 mb-1">{g.group}</div>
            {g.users.map((u) => (
              <button key={u.id} className="block w-full text-left rounded px-2 py-1 hover:bg-gray-100" onClick={e => { e.preventDefault(); onSelect(u); }}>{u.name}</button>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
}