import React from "react";

export default function Select({ label, value, onChange, options, className, multiple }) {
  return (
    <div className={className}>
      {label && <label className="text-sm text-gray-700">{label}</label>}
      <select
        multiple={!!multiple}
        value={value}
        onChange={e => {
          if (multiple) {
            const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
            onChange(selected);
          } else {
            onChange(e.target.value);
          }
        }}
        className="mt-1 w-full rounded-md border px-3 py-2"
      >
        {options.map(opt =>
          typeof opt === "string"
            ? <option key={opt} value={opt}>{opt}</option>
            : <option key={opt.value} value={opt.value}>{opt.label}</option>
        )}
      </select>
    </div>
  );
}