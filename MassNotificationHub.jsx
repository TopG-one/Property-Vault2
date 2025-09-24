import React, { useState } from "react";
import Select from "./Select";

// Helper to get all unique tenants in selected properties
function getTenantMembers(properties, propertyIds) {
  const seen = new Set();
  let tenants = [];
  properties.forEach(p => {
    if (!propertyIds.includes(p.id)) return;
    if (!p.household?.members) return;
    p.household.members.forEach(m => {
      // Only real tenant users (skip minors, etc.)
      if (m.role === "tenant" || m.householdRole) {
        if (!seen.has(m.email)) {
          tenants.push(m);
          seen.add(m.email);
        }
      }
    });
  });
  return tenants;
}

export default function MassNotificationHub({ properties, sendEmail }) {
  const [selectedProps, setSelectedProps] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const propertyOptions = properties.map(p => ({
    value: p.id,
    label: `${p.name} (${p.city})`
  }));

  const tenants = getTenantMembers(properties, selectedProps);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!selectedProps.length || !subject.trim() || !message.trim()) return;
    setSending(true);
    await sendEmail({
      tenants,
      subject,
      message,
      properties: selectedProps
    });
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="rounded-xl border bg-white p-6 my-6">
      <h2 className="text-xl font-semibold mb-4">Mass Notification to Tenants</h2>
      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Properties</label>
          <Select
            value={selectedProps}
            onChange={v => setSelectedProps(Array.isArray(v) ? v : [v])}
            options={propertyOptions}
            multiple
          />
        </div>
        <div>
          <label className="text-sm font-medium">Subject</label>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full rounded-md border px-3 py-2 mt-1"
            required
            placeholder="Email subject"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Message</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full rounded-md border px-3 py-2 mt-1"
            rows={4}
            required
            placeholder="Your notification message"
          />
        </div>
        <div>
          <b>Recipients:</b> {tenants.length ? tenants.map(t => t.name).join(", ") : <span className="text-gray-400">None selected</span>}
        </div>
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white" disabled={sending || !tenants.length}>
          {sending ? "Sending..." : "Send Email"}
        </button>
        {sent && <div className="text-green-600 mt-2">Message sent!</div>}
        <div className="text-xs text-gray-500 mt-2">
          <b>SMS/Text support coming soon.</b>
        </div>
      </form>
    </section>
  );
}