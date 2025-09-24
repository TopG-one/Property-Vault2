import React from "react";
import { Mail, Phone } from "lucide-react";

export default function LoginInputs({ loginForm, setLoginForm, showPassword, setShowPassword }) {
  return (
    <>
      <div className="inline-flex rounded-md overflow-hidden border">
        <button type="button" onClick={() => setLoginForm({ ...loginForm, loginType: "email" })} className={`px-3 py-2 ${loginForm.loginType === "email" ? "bg-blue-50 text-blue-700" : "bg-white text-gray-600"}`}><Mail size={16} /></button>
        <button type="button" onClick={() => setLoginForm({ ...loginForm, loginType: "phone" })} className={`px-3 py-2 border-l ${loginForm.loginType === "phone" ? "bg-blue-50 text-blue-700" : "bg-white text-gray-600"}`}><Phone size={16} /></button>
      </div>
      <div>
        <label className="text-sm text-gray-700">{loginForm.loginType === "email" ? "Email" : "Phone"}</label>
        <input required type={loginForm.loginType === "email" ? "email" : "tel"} value={loginForm.loginType === "email" ? loginForm.email : loginForm.phone} onChange={(e) => setLoginForm({ ...loginForm, [loginForm.loginType]: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="text-sm text-gray-700">Password</label>
        <div className="relative mt-1">
          <input required type={showPassword ? "text" : "password"} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
    </>
  );
}