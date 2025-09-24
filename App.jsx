import React, { useState } from "react";
import Shell from "./Shell";
import OwnerNav from "./OwnerNav";
import Landing from "./Landing";
import TenantApp from "./TenantApp";
import PMInbox from "./PMInbox";
import TradeInbox from "./TradeInbox";
import PropertiesPanel from "./PropertiesPanel";
import MaintenanceHub from "./MaintenanceHub";
import PaymentsHub from "./PaymentsHub";
import DocumentsHub from "./DocumentsHub";
import HouseholdsHub from "./HouseholdsHub";
import MassNotificationHub from "./MassNotificationHub";
import OwnerSettings from "./OwnerSettings";
import Overview from "./Overview";
import AddPropertyModal from "./AddPropertyModal";
import { localStamp } from "./helpers";

export default function App() {
  // Auth state
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "owner", "tenant", "pm", "trade"
  const [properties, setProperties] = useState([]);
  const [settings, setSettings] = useState({
    types: ["Plumbing", "Electrical"],
    severities: ["Low", "Medium", "High"],
    notifyBy: { email: true, sms: false },
    emergencyRules: { enabled: false, thresholds: {}, guidance: "" },
  });
  const [query, setQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Handlers
  const addToast = (msg) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const addProperty = (payload) => {
    const id = `p${Date.now()}`;
    setProperties((list) => [...list, { id, ...payload }]);
    addToast("Property added");
  };

  const removeProperty = (id) => {
    setProperties((list) => list.filter((p) => p.id !== id));
    addToast("Property removed");
  };

  const createTicket = (propertyId, ticket) => {
    setProperties((list) =>
      list.map((p) =>
        p.id === propertyId
          ? { ...p, maintenance: [...(p.maintenance || []), { id: `t${Date.now()}`, ...ticket }] }
          : p
      )
    );
    addToast("Ticket created");
  };

  const updateTicket = (propertyId, ticketId, patch) => {
    setProperties((list) =>
      list.map((p) =>
        p.id !== propertyId
          ? p
          : {
              ...p,
              maintenance: (p.maintenance || []).map((m) =>
                m.id === ticketId ? { ...m, ...patch } : m
              ),
            }
      )
    );
  };

  const assignTicket = (propertyId, ticketId, assignee) => {
    updateTicket(propertyId, ticketId, (m) => ({
      assignees: [...(m.assignees || []), assignee],
    }));
  };

  const commentTicket = (propertyId, ticketId, author, text) => {
    updateTicket(propertyId, ticketId, (m) => ({
      comments: [
        ...(m.comments || []),
        { id: `c${Date.now()}`, author, text, at: localStamp() },
      ],
    }));
  };

  const sendEmail = async ({ tenants, subject }) => {
    console.log("Email queued:", tenants.map((t) => t.email), subject);
    addToast("Email sent (demo)");
  };

  // If no user, show landing
  if (!user) {
    return (
      <Landing
        onLogin={() => {
          setUser({ id: "u1", name: "Demo Owner", role: "owner" });
          setRole("owner");
        }}
        onRegister={() => {
          setUser({ id: "u2", name: "Demo Tenant", role: "tenant" });
          setRole("tenant");
        }}
      />
    );
  }

  // Tenant dashboard
  if (role === "tenant") {
    return (
      <Shell user={user} onLogout={() => setUser(null)} toasts={toasts}>
        <TenantApp
          user={user}
          properties={properties}
          settings={settings}
          onCreate={createTicket}
        />
      </Shell>
    );
  }

  // Trade dashboard
  if (role === "trade") {
    return (
      <Shell user={user} onLogout={() => setUser(null)} toasts={toasts}>
        <TradeInbox
          user={user}
          properties={properties}
          onComment={commentTicket}
          onUpdate={updateTicket}
        />
      </Shell>
    );
  }

  // PM dashboard
  if (role === "pm") {
    return (
      <Shell user={user} onLogout={() => setUser(null)} toasts={toasts}>
        <PMInbox
          user={user}
          properties={properties}
          onComment={commentTicket}
          onUpdate={updateTicket}
        />
      </Shell>
    );
  }

  // Owner dashboard
  const [tab, setTab] = useState("overview");
  const filteredProps = properties.filter((p) =>
    [p.name, p.city, p.region].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Shell user={user} onLogout={() => setUser(null)} toasts={toasts}>
      <OwnerNav current={tab} onChange={setTab} />
      {tab === "overview" && <Overview properties={properties} />}
      {tab === "properties" && (
        <PropertiesPanel
          properties={properties}
          query={query}
          setQuery={setQuery}
          filteredProps={filteredProps}
          setShowAddModal={setShowAddModal}
          removeProperty={removeProperty}
        />
      )}
      {tab === "maintenance" && (
        <MaintenanceHub
          user={user}
          properties={properties}
          settings={settings}
          setSettings={setSettings}
          onCreate={createTicket}
          onUpdate={updateTicket}
          onAssign={assignTicket}
          onComment={commentTicket}
        />
      )}
      {tab === "payments" && <PaymentsHub properties={properties} />}
      {tab === "documents" && <DocumentsHub properties={properties} />}
      {tab === "households" && (
        <HouseholdsHub properties={properties} updateProperty={setProperties} />
      )}
      {tab === "notifications" && (
        <MassNotificationHub properties={properties} sendEmail={sendEmail} />
      )}
      {tab === "settings" && (
        <OwnerSettings settings={settings} setSettings={setSettings} />
      )}
      {showAddModal && (
        <AddPropertyModal onClose={() => setShowAddModal(false)} onSave={addProperty} />
      )}
    </Shell>
  );
}
