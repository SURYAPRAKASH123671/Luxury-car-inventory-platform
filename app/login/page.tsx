"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, ShieldCheck, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { demoAdmin, demoCustomer, storageKeys, writeJson } from "@/lib/storage";
import { DemoUser } from "@/types";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"USER" | "ADMIN">("USER");
  const [form, setForm] = useState<DemoUser>(demoCustomer);
  const [password, setPassword] = useState("buyer123");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectMode = (nextMode: "USER" | "ADMIN") => {
    setMode(nextMode);
    setForm(nextMode === "ADMIN" ? demoAdmin : demoCustomer);
    setPassword(nextMode === "ADMIN" ? "admin123" : "buyer123");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const session = await api.login(form.email, password);
      writeJson(storageKeys.session, session);
      writeJson(storageKeys.user, session.user);
      toast.success(`${session.user.role === "ADMIN" ? "Admin" : "Buyer"} JWT session started`);
      router.push(session.user.role === "ADMIN" ? "/admin" : "/profile");
    } catch (error) {
      writeJson(storageKeys.user, { ...form, role: mode });
      toast.error("Backend unavailable or credentials invalid. Started local demo session.");
      router.push(mode === "ADMIN" ? "/admin" : "/profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-luxury-metallic-red">
            Demo Authentication
          </p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Buyer & Admin Login
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-luxury-silver">
            Spring Security login using seeded buyer and admin accounts, with a
            local fallback so the UI remains demo-ready even when the API is offline.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
            <h2 className="mb-4 text-xl font-semibold">Choose role</h2>
            <div className="space-y-3">
              {[
                ["USER", "Buyer profile, wishlist, bookings", UserRound],
                ["ADMIN", "Inventory and booking operations", ShieldCheck],
              ].map(([role, text, Icon]) => (
                <button
                  key={String(role)}
                  onClick={() => selectMode(role as "USER" | "ADMIN")}
                  className={`flex w-full items-center gap-3 rounded-md border p-4 text-left transition-colors ${
                    mode === role
                      ? "border-luxury-metallic-red bg-luxury-metallic-red/15"
                      : "border-luxury-silver/10 bg-luxury-black hover:border-luxury-silver/30"
                  }`}
                >
                  <Icon className="text-luxury-metallic-red" />
                  <div>
                    <p className="font-semibold">{String(role)}</p>
                    <p className="text-sm text-luxury-silver">{String(text)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <LogIn className="text-luxury-metallic-red" />
              <h2 className="text-2xl font-semibold">Start Session</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Name"
                className="rounded-md border border-luxury-silver/20 bg-luxury-black px-4 py-3 text-white focus:border-luxury-metallic-red focus:outline-none"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                type="email"
                placeholder="Email"
                className="rounded-md border border-luxury-silver/20 bg-luxury-black px-4 py-3 text-white focus:border-luxury-metallic-red focus:outline-none"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="Phone"
                className="rounded-md border border-luxury-silver/20 bg-luxury-black px-4 py-3 text-white focus:border-luxury-metallic-red focus:outline-none"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Password"
                className="rounded-md border border-luxury-silver/20 bg-luxury-black px-4 py-3 text-white focus:border-luxury-metallic-red focus:outline-none"
              />
            </div>
            <button
              disabled={isSubmitting}
              className="mt-5 rounded-md bg-luxury-metallic-red px-6 py-3 font-semibold transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Connecting..." : "Continue"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
