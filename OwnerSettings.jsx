import React from "react";
import OwnerMaintenanceSettings from "./OwnerMaintenanceSettings";

export default function OwnerSettings({ settings, setSettings }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Owner Settings</h2>
      <OwnerMaintenanceSettings settings={settings} setSettings={setSettings} />
    </section>
  );
}