import React, { useState } from "react";
import OwnerMaintenanceSettings from "./OwnerMaintenanceSettings";
import Th from "./Th";
import Td from "./Td";
import TicketRow from "./TicketRow";
import Select from "./Select";

export default function MaintenanceHub({ user, properties, settings, onCreate, onAssign, onComment, onUpdate, setSettings }) {
  const all = properties.flatMap((p) => (p.maintenance || []).map((m) => ({ ...m, property: p.name, propertyId: p.id })));
  const [filter, setFilter] = useState({ status: "All", type: "All", severity: "All", emergency: "All" });
  const filtered = all.filter((t) =>
    (filter.status === "All" || t.status === filter.status) &&
    (filter.type === "All" || t.type === filter.type) &&
    (filter.severity === "All" || t.severity === filter.severity) &&
    (filter.emergency === "All" || String(t.emergency) === (filter.emergency === "Yes" ? "true" : "false"))
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Maintenance</h2>
        <div className="flex gap-2">
          <Select value={filter.status} onChange={v => setFilter({ ...filter, status: v })} options={["All", "Open", "In Progress", "Completed", "Cancelled"]} />
          <Select value={filter.type} onChange={v => setFilter({ ...filter, type: v })} options={["All", ...settings.types]} />
          <Select value={filter.severity} onChange={v => setFilter({ ...filter, severity: v })} options={["All", ...settings.severities]} />
          <Select value={filter.emergency} onChange={v => setFilter({ ...filter, emergency: v })} options={["All", "Yes", "No"]} />
          <button className="rounded-md bg-blue-600 px-3 py-2 text-white" onClick={() =>
            onCreate(properties[0].id, {
              title: "New ticket (demo)",
              type: settings.types[0],
              severity: settings.severities[0],
              emergency: false,
              status: "Open",
              createdAt: new Date().toLocaleString(),
              createdBy: user,
              assignees: [],
              watchers: [],
              comments: [],
            })
          }>New Ticket</button>
        </div>
      </div>
      <OwnerMaintenanceSettings settings={settings} setSettings={setSettings} />
      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <Th>Property</Th>
              <Th>Title</Th>
              <Th>Type</Th>
              <Th>Severity</Th>
              <Th>Emergency</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th>Assignees</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <TicketRow key={t.id} ticket={t} onAssign={onAssign} onUpdate={onUpdate} onComment={onComment} currentUser={user} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}