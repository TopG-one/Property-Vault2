import React from "react";
import EmptyState from "./EmptyState";

export default function PropertyVault({ property }) {
  if (!property) {
    return <EmptyState title="No property selected" subtitle="Choose a property to view its vault." />;
  }

  const renderData = (data) => {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return "—";
    }
    // You can customize this to display a list or a more formatted view.
    // For now, let's assume we want to show a count if it's an array.
    if (Array.isArray(data)) {
      return `${data.length} items`;
    }
    // Fallback for other data types, or you can enhance this with a more detailed view.
    return "Available";
  };

  return (
    <section className="rounded-xl border bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">{property.name} Vault</h2>
      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
        <li>Utilities: {renderData(property.utilities)}</li>
        <li>Contacts: {renderData(property.contacts)}</li>
        <li>Taxes: {renderData(property.taxes)}</li>
        <li>Documents: {property.documents ? property.documents.length : 0} files</li>
      </ul>
    </section>
  );
}