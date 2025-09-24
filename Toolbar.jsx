import React from "react";
import { Search, Plus } from "lucide-react";

export default function Toolbar({ title, ctaLabel, onCta, query, setQuery }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, city…" className="w-64 rounded-md border pl-8 pr-3 py-2" />
        </div>
        {onCta && <button onClick={onCta} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"><Plus className="h-4 w-4" /> {ctaLabel}</button>}
      </div>
    </div>
  );
}