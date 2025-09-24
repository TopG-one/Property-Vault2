import React, { useState } from "react";

export default function TagEditor({ items, onChange, placeholder }) {
  const [input, setInput] = useState("");
  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-2">
        {items.map((t, i) => (
          <span key={t} className="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
            {t}
            <button type="button" className="ml-1 text-blue-400 hover:text-red-600" onClick={() => onChange(items.filter((x, idx) => idx !== i))}>✕</button>
          </span>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if ((e.key === "Enter" || e.key === ",") && input.trim()) {
            e.preventDefault();
            if (!items.includes(input.trim())) {
              onChange([...items, input.trim()]);
            }
            setInput("");
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-md border px-2 py-1 text-xs"
      />
    </div>
  );
}