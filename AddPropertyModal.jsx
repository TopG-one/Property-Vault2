import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function AddPropertyModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    type: "Single-Family Home",
    address: "",
    city: "",
    region: "",
    country: "Canada",
    rentAmount: "",
    status: "Vacant",
  });
  const save = () => {
    const payload = {
      ...form,
      rentAmount: Number(form.rentAmount) || 0,
      contacts: {},
      utilities: {},
      propertyTax: {},
      systems: {},
      docs: [],
      photos: [],
      household: { members: [], lease: {}, ledger: [] },
    };
    onSave(payload);
  };
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add Property</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Input label="Property name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Select label="Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={["Single-Family Home","Condominium","Townhouse","Apartment","Basement","Cottage","Duplex","Triplex","Multi-Family"]} />
          <Input className="col-span-2" label="Street address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
          <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
          <Input label="Province/State" value={form.region} onChange={(v) => setForm({ ...form, region: v })} />
          <Select label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} options={["Canada","United States"]} />
          <Input label="Monthly Rent ($)" type="number" value={form.rentAmount} onChange={(v) => setForm({ ...form, rentAmount: v })} />
          <Select label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })} options={["Vacant","Occupied"]} />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border px-3 py-1.5">Cancel</button>
          <button onClick={save} className="rounded-md bg-green-600 px-3 py-1.5 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}