import React from "react";
import EmptyState from "./EmptyState";
import Th from "./Th";
import TicketRow from "./TicketRow";

export default function PMInbox({ user, properties, onComment, onUpdate }) {
  // List tickets assigned to PM
  const myTickets = properties.flatMap(
    p => (p.maintenance || []).filter(m => (m.assignees || []).some(a => a.id === user?.id))
      .map(m => ({ ...m, property: p.name, propertyId: p.id }))
  );
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">My Assigned Tickets</h2>
      {!myTickets.length && <EmptyState title="No tickets" subtitle="No maintenance tickets assigned to you yet." />}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <Th>Property</Th><Th>Title</Th><Th>Type</Th><Th>Severity</Th><Th>Status</Th><Th>Comments</Th>
            </tr>
          </thead>
          <tbody>
            {myTickets.map(t => (
              <TicketRow key={t.id} ticket={t} onComment={onComment} onUpdate={onUpdate} currentUser={user} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}