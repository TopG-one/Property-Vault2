import React from "react";
import Th from "./Th";
import Td from "./Td";

export default function DocumentsHub({ properties }) {
  const allDocs = properties.flatMap(p => (p.docs || []).map(d => ({ ...d, property: p.name })));
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Documents</h2>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <Th>Property</Th><Th>Name</Th><Th>Kind</Th><Th>Added</Th><Th>Link</Th>
            </tr>
          </thead>
          <tbody>
            {allDocs.map(d => (
              <tr key={d.id}>
                <Td>{d.property}</Td>
                <Td>{d.name}</Td>
                <Td>{d.kind}</Td>
                <Td>{d.added}</Td>
                <Td><a href={d.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View</a></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}