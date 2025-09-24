import React from "react";
import { Home, Users, Wrench, DollarSign, Building } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Landing({ onLogin, onRegister }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold">PropertyVault</span>
          </div>
          <div className="flex gap-3">
            <button onClick={onLogin} className="px-3 py-1.5 rounded-md border">Login</button>
            <button onClick={onRegister} className="px-3 py-1.5 rounded-md bg-blue-600 text-white">Sign Up</button>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">Register or Login with Phone or Email</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">Owners manage properties; tenants join a household; trades & property managers resolve tickets.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <FeatureCard icon={<Users className="h-8 w-8 text-green-600" />} title="Multi-Role" desc="Super Admin, Owner, Tenant, Trade, PM." />
          <FeatureCard icon={<Wrench className="h-8 w-8 text-orange-600" />} title="Smart Maintenance" desc="Types, severity, emergency, assignees." />
          <FeatureCard icon={<DollarSign className="h-8 w-8 text-purple-600" />} title="Autopay & Ledger" desc="ACH/PAD/Card receipts + exports." />
          <FeatureCard icon={<Building className="h-8 w-8 text-blue-600" />} title="Property Vault" desc="Utilities, tax, contacts, photos, docs." />
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onRegister} className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Get started</button>
          <button onClick={onLogin} className="px-6 py-3 rounded-lg border hover:bg-white">I already have an account</button>
        </div>
      </section>
    </div>
  );
}