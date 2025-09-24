import React from "react";
import MemberEditor from "./MemberEditor";

export default function HouseholdsHub({ properties, updateProperty }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Households</h2>
      {properties.map(p => (
        <div key={p.id} className="rounded-xl border bg-white p-4 shadow-sm mb-4">
          <div className="mb-2">
            <span className="font-semibold">{p.name}</span>
            <span className="ml-3 text-gray-600 text-sm">{p.type} • {p.city}</span>
          </div>
          <MemberEditor property={p} onChange={members => updateProperty(p.id, { household: { ...p.household, members } })} />
        </div>
      ))}
    </section>
  );
}