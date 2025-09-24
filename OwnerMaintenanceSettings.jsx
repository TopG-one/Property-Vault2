import React, { useState } from "react";
import Fieldset from "./Fieldset";
import TagEditor from "./TagEditor";
import Select from "./Select";

export default function OwnerMaintenanceSettings({ settings, setSettings }) {
  const [local, setLocal] = useState(settings);
  const save = () => setSettings(local);
  const thresholds = local.emergencyRules.thresholds || {};
  const sevOptions = local.severities || ["Low", "Medium", "High", "Critical"];
  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="font-medium">Maintenance Settings (Owner Controlled)</h3>
      <div className="mt-3 grid md:grid-cols-3 gap-3">
        <Fieldset title="Types">
          <TagEditor items={local.types} onChange={(items) => setLocal({ ...local, types: items })} placeholder="Add type…" />
        </Fieldset>
        <Fieldset title="Severities">
          <TagEditor items={local.severities} onChange={(items) => setLocal({ ...local, severities: items })} placeholder="Add severity…" />
        </Fieldset>
        <Fieldset title="Notifications">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!local.notifyBy?.email} onChange={e => setLocal({ ...local, notifyBy: { ...local.notifyBy, email: e.target.checked } })} />
            Email
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!local.notifyBy?.sms} onChange={e => setLocal({ ...local, notifyBy: { ...local.notifyBy, sms: e.target.checked } })} />
            SMS
          </label>
        </Fieldset>
      </div>
      <div className="mt-4 rounded border p-3">
        <div className="flex items-center gap-3">
          <label className="font-medium text-sm">Emergency Thresholds by Type</label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!local.emergencyRules?.enabled} onChange={e => setLocal({ ...local, emergencyRules: { ...local.emergencyRules, enabled: e.target.checked } })} />
            Emergency rules enabled
          </label>
        </div>
        <div className="mt-2 grid md:grid-cols-3 gap-3">
          {local.types.map((type) => (
            <div key={type} className="flex items-center gap-1">
              <span className="text-gray-700 text-sm">{type}</span>
              <span className="text-xs text-gray-500">≥</span>
              <Select
                value={thresholds[type] || sevOptions[sevOptions.length - 1]}
                onChange={v =>
                  setLocal({
                    ...local,
                    emergencyRules: {
                      ...local.emergencyRules,
                      thresholds: { ...local.emergencyRules.thresholds, [type]: v },
                    },
                  })
                }
                options={sevOptions}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium">Emergency Guidance</label>
          <textarea
            className="w-full rounded border p-2 mt-1 text-sm"
            value={local.emergencyRules.guidance}
            onChange={e => setLocal({ ...local, emergencyRules: { ...local.emergencyRules, guidance: e.target.value } })}
            rows={2}
          />
        </div>
        <div className="mt-3 flex justify-end">
          <button className="rounded-md bg-blue-600 px-3 py-1.5 text-white" onClick={save}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}