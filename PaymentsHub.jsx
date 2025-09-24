import React from "react";
import Th from "./Th";
import Td from "./Td";

export default function PaymentsHub({ properties }) {
  const allPayments = properties.flatMap(
    p => (p.household?.ledger || []).map(l => ({ ...l, property: p.name }))
  );
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Payments</h2>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <Th>Property</Th><Th>Date</Th><Th>Type</Th><Th>Amount</Th><Th>Method</Th><Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {allPayments.map(p => (
              <tr key={p.id}>
                <Td>{p.property}</Td>
                <Td>{p.date}</Td>
                <Td>{p.type}</Td>
                <Td>${p.amount}</Td>
                <Td>{p.method}</Td>
                <Td>{p.status}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}