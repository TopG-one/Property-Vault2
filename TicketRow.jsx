import React, { useState } from "react";
import Select from "./Select";
import AssignDropdown from "./AssignDropdown";
import { labelForRole } from "./RoleToggle";
import Td from "./Td";

export default function TicketRow({ ticket, onAssign, onUpdate, onComment, currentUser }) {
  const [note, setNote] = useState("");
  const statusOptions = ["Open", "In Progress", "Completed", "Cancelled"];

  return (
    <tr className="border-t align-top">
      <Td>{ticket.property}</Td>
      <Td>
        <div className="font-medium">{ticket.title}</div>
        <div className="text-xs text-gray-500">by {ticket.createdBy?.name} • {ticket.createdAt}</div>
        <div className="mt-2 space-y-1">
          {(ticket.comments || []).map((c) => (
            <div key={c.id} className="rounded bg-gray-50 p-2 text-xs"><b>{c.author?.name}</b> • {c.at}<br />{c.text}</div>
          ))}
          <div className="flex gap-1 mt-1">
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add comment…" className="w-full rounded-md border px-2 py-1 text-xs" />
            <button className="rounded-md border px-2 text-xs" onClick={() => { if (!note.trim()) return; onComment(ticket.propertyId, ticket.id, currentUser, note.trim()); setNote(""); }}>Post</button>
          </div>
        </div>
      </Td>
      <Td>{ticket.type}</Td>
      <Td>{ticket.severity}</Td>
      <Td>{ticket.emergency ? <span className="rounded-full bg-red-100 text-red-700 px-2">Yes</span> : "No"}</Td>
      <Td>
        <Select value={ticket.status} onChange={(v) => onUpdate(ticket.propertyId, ticket.id, { status: v })} options={statusOptions} />
      </Td>
      <Td>{ticket.createdAt}</Td>
      <Td>
        <div className="space-y-1 text-xs">
          {(ticket.assignees || []).map((a) => (<div key={a.id} className="rounded bg-gray-50 px-2 py-1">{labelForRole(a.role)}: {a.name}</div>))}
          <AssignDropdown onSelect={(assignee) => onAssign(ticket.propertyId, ticket.id, assignee)} />
        </div>
      </Td>
      <Td>
        <button className="rounded-md border px-2 text-xs" disabled={!['owner','super','pm'].includes(currentUser?.role)} title={!['owner','super','pm'].includes(currentUser?.role) ? 'Only Owner/PM can toggle' : ''} onClick={() => onUpdate(ticket.propertyId, ticket.id, { emergency: !ticket.emergency })}>Toggle Emergency</button>
      </Td>
    </tr>
  );
}