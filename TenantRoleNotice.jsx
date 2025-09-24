import React from "react";

export default function TenantRoleNotice({ form, setForm }) {
  return (
    <div className="rounded-md border p-3 text-sm">
      <p className="font-medium">Household Role</p>
      <div className="mt-2 flex gap-2">
        {(["admin", "member"]).map((r) => (
          <button key={r} type="button" onClick={() => setForm({ ...form, householdRole: r })} className={`rounded-md border px-3 py-1.5 text-sm ${form.householdRole === r ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-white"}`}>{r}</button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">Only a household <b>admin</b> can view lease & ledger, pay rent, and send maintenance requests.</p>
    </div>
  );
}