import React from "react";
import Toolbar from "./Toolbar";
import PropertyGrid from "./PropertyGrid";

export default function PropertiesPanel({ properties, setQuery, query, filteredProps, setShowAddModal, removeProperty }) {
  return (
    <section className="space-y-4">
      <Toolbar title="Properties" ctaLabel="Add property" onCta={() => setShowAddModal(true)} query={query} setQuery={setQuery} />
      <PropertyGrid items={filteredProps} onRemove={removeProperty} />
    </section>
  );
}