import React from "react";
import Input from "./Input";

export default function RegisterInputs({ form, setForm }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Input label="First name" value={form.first} onChange={(v) => setForm({ ...form, first: v })} />
        <Input label="Last name" value={form.last} onChange={(v) => setForm({ ...form, last: v })} />
      </div>
      <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
      <Input label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
        <Input label="Confirm" type="password" value={form.confirm} onChange={(v) => setForm({ ...form, confirm: v })} />
      </div>
    </>
  );
}