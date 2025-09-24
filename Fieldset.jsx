import React from "react";

export default function Fieldset({ title, children }) {
  return (
    <fieldset className="rounded border p-3">
      <legend className="text-xs text-gray-500">{title}</legend>
      {children}
    </fieldset>
  );
}