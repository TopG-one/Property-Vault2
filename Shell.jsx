import React from "react";
import { Home, Bell } from "lucide-react";
import { labelForRole } from "./RoleToggle";

export default function Shell({ children, user, onLogout, toasts }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">PropertyVault</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="hidden sm:inline text-gray-600">{user?.name} • {labelForRole(user?.role)}{user?.householdRole ? ` (${user.householdRole})` : ""}</span>
            <button onClick={onLogout} className="rounded-md border px-3 py-1.5">Logout</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4">
        {toasts?.length > 0 && (
          <div className="fixed bottom-4 right-4 space-y-2 z-50">
            {toasts.map((t) => (
              <div key={t.id} className="rounded-md bg-black text-white px-3 py-2 text-sm shadow-lg">{t.msg}</div>
            ))}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}