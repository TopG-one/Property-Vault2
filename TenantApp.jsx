import React, { useState } from "react";
import TenantMaintenanceForm from "./TenantMaintenanceForm";
import EmptyState from "./EmptyState";

export default function TenantApp({ user, properties, onCreate, settings }) {
  // Show only properties where user is household member
  const myProps = properties.filter(
    p => (p.household?.members || []).some(m => m.id === user?.id)
  );
  const [showForm, setShowForm] = useState(false);
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">My Property</h2>
      {!myProps.length && <EmptyState title="No property found" subtitle="Contact your landlord to be added." />}
      {myProps.map(p => (
        <div key={p.id} className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <div className="text-sm text-gray-600">{p.address}, {p.city}, {p.region}</div>
              <div className="text-xs mt-2">
                Lease: {p.household?.lease?.start} — {p.household?.lease?.end}
              </div>
            </div>
            <div>
              <button className="rounded-md bg-blue-600 px-3 py-2 text-white" onClick={() => setShowForm(f => !f)}>
                {showForm ? "Hide" : "Request Maintenance"}
              </button>
            </div>
          </div>
          {showForm && (
            <TenantMaintenanceForm property={p} user={user} onCreate={onCreate} settings={settings} onClose={() => setShowForm(false)} />
          )}
        </div>
      ))}
    </section>
  );
}