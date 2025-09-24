import React from "react";
import { Home, CheckCircle, DollarSign, AlertCircle, Receipt, Calendar } from "lucide-react";
import StatCard from "./StatCard";

export default function Overview({ properties }) {
  const occupied = properties.filter((p) => p.status === "Occupied").length;
  const openTickets = properties.reduce((acc, p) => acc + (p.maintenance || []).filter((m) => m.status !== "Completed" && m.status !== "Cancelled").length, 0);
  const mrr = properties.reduce((acc, p) => acc + (p.status === "Occupied" ? (p.rentAmount || 0) : 0), 0);
  return (
    <section className="grid md:grid-cols-3 gap-4">
      <StatCard icon={<Home />} label="Properties" value={properties.length} />
      <StatCard icon={<CheckCircle />} label="Occupied" value={occupied} />
      <StatCard icon={<DollarSign />} label="Monthly Rent (MRR)" value={`$${mrr.toLocaleString()}`} />
      <StatCard icon={<AlertCircle />} label="Active Tickets" value={openTickets} />
      <StatCard icon={<Receipt />} label="Last Month Collected" value="$2,400" sub="Demo data" />
      <StatCard icon={<Calendar />} label="Upcoming Renewals" value="1" />
    </section>
  );
}