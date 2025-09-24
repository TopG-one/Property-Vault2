import React from "react";
import InfoRow from "./InfoRow";
import EmptyState from "./EmptyState";

export default function PropertyGrid({ items, onRemove }) {
  if (!items.length) return <EmptyState title="No properties" subtitle="Add your first property to get started." />;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p) => (
        <div key={p.id} className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.type} • {p.city}, {p.region}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "Occupied" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"}`}>{p.status}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <InfoRow label="Tenant" value={p.household?.members?.find((m) => m.role === "tenant" || m.householdRole)?.name || "—"} />
            <InfoRow label="Rent" value={p.rentAmount ? `$${p.rentAmount}` : "—"} />
            <InfoRow label="Electric" value={p.utilities?.electricity?.provider || "—"} />
            <InfoRow label="Water" value={p.utilities?.water?.provider || "—"} />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button className="rounded-md border px-3 py-1.5 text-sm text-red-600" onClick={() => onRemove?.(p.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}