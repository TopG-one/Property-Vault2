import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function MemberEditor({ property, onChange }) {
  const [newMember, setNewMember] = useState({ name: "", age: "", phone: "", role: "member" });
  const members = property.household?.members || [];
  const add = () => {
    const ageNum = Number(newMember.age || 0);
    const role = ageNum < 18 ? "minor" : newMember.role;
    if (!newMember.name.trim()) return;
    const payload = { id: `m${Date.now()}`, name: newMember.name.trim(), role, ...(ageNum ? { age: ageNum } : {}), ...(role !== "minor" && newMember.phone ? { phone: newMember.phone } : {}) };
    onChange([...(members || []), payload]);
    setNewMember({ name: "", age: "", phone: "", role: "member" });
  };
  const remove = (id) => onChange((members || []).filter((m) => m.id !== id));
  return (
    <div className="mt-3">
      <div className="grid md:grid-cols-3 gap-3">
        {(members || []).map((m) => (
          <div key={m.id} className="rounded-md border p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-xs text-gray-600">{m.role}{m.age ? ` • ${m.age}` : ""}{m.phone ? ` • ${m.phone}` : ""}</p>
              </div>
              <button className="text-red-600 text-sm" onClick={() => remove(m.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md border p-3">
        <h4 className="font-medium text-sm">Add Family Member</h4>
        <div className="mt-2 grid md:grid-cols-4 gap-3">
          <Input label="Name" value={newMember.name} onChange={(v) => setNewMember({ ...newMember, name: v })} />
          <Input label="Age" type="number" value={newMember.age} onChange={(v) => setNewMember({ ...newMember, age: v })} />
          {Number(newMember.age || 0) >= 18 && (
            <>
              <Input label="Phone" value={newMember.phone} onChange={(v) => setNewMember({ ...newMember, phone: v })} />
              <Select label="Role" value={newMember.role} onChange={(v) => setNewMember({ ...newMember, role: v })} options={["admin","member"]} />
            </>
          )}
        </div>
        <div className="mt-3"><button className="rounded-md bg-green-600 px-3 py-1.5 text-white" onClick={add}>Add Member</button></div>
        <p className="text-xs text-gray-500 mt-2">If the member is a <b>minor</b> (age &lt; 18), only a <b>name</b> is required and they cannot log in.</p>
      </div>
    </div>
  );
}