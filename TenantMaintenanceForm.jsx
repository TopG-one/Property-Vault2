import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function TenantMaintenanceForm({ property, user, onCreate, settings, onClose }) {
  const [form, setForm] = useState({
    title: "",
    type: settings.types[0],
    severity: settings.severities[0],
    emergency: false,
  });

  // Emergency logic: based on owner's rules
  const threshold = settings.emergencyRules.thresholds[form.type];
  const isEmergency = settings.emergencyRules.enabled && settings.severities.indexOf(form.severity) >= settings.severities.indexOf(threshold);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onCreate(property.id, {
      ...form,
      emergency: isEmergency,
      status: "Open",
      createdAt: new Date().toLocaleString(),
      createdBy: user,
      assignees: [],
      watchers: [],
      comments: [],
    });
    onClose();
  };

  return (
    <form className="mt-4 space-y-3 p-4 border rounded" onSubmit={handleSubmit}>
      <Input label="Title/Description" value={form.title} onChange={v => setForm({ ...form, title: v })} />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Type" value={form.type} onChange={v => setForm({ ...form, type: v })} options={settings.types} />
        <Select label="Severity" value={form.severity} onChange={v => setForm({ ...form, severity: v })} options={settings.severities} />
      </div>
      <div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isEmergency} disabled readOnly />
          Emergency (owner-defined)
        </label>
        {isEmergency && (
          <div className="text-xs text-red-600 mt-1">{settings.emergencyRules.guidance}</div>
        )}
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" className="rounded border px-3 py-1.5" onClick={onClose}>Cancel</button>
        <button type="submit" className="rounded bg-green-600 px-3 py-1.5 text-white">Submit</button>
      </div>
    </form>
  );
}