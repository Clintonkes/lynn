import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Phone, Mail, MapPin } from "lucide-react";
import { extractErrorMessage } from "@/lib/apiError";

const API_URL = import.meta.env.VITE_API_URL || "";

const TYPES = [
  "Dry Van Freight",
  "Flatbed Load",
  "Heavy / Oversized Haul",
  "Regional Delivery",
  "Other",
];

export default function Quote() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    type: TYPES[0],
    pickup: "",
    delivery: "",
    notes: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const messageParts = [
      `Load Type: ${form.type}`,
      `Pickup: ${form.pickup}`,
      `Delivery: ${form.delivery}`,
    ];
    if (form.company) messageParts.unshift(`Company: ${form.company}`);
    if (form.notes) messageParts.push(`Notes: ${form.notes}`);

    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Quote Request - ${form.type}`,
          message: messageParts.join("\n"),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(extractErrorMessage(data?.detail, "Failed to submit quote request"));
      }
      setDone(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lh-quote" className="bg-lynn-asphalt py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <span className="text-lynn-amber text-sm font-bold uppercase tracking-[0.25em]">
            // Get a Quote
          </span>
          <h2 className="font-archivo text-white text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-3 leading-[0.95]">
            Haul with us.
          </h2>
          <p className="text-white/60 mt-5 leading-relaxed">
            Send us your load details — we'll come back with a rate and a truck
            within one business day.
          </p>
          <div className="mt-10 space-y-4 text-white/75">
            <a
              href="tel:+15102994646"
              className="flex items-center gap-3 hover:text-lynn-amber transition"
            >
              <Phone size={18} className="text-lynn-amber" /> +1 (510) 299-4646
            </a>
            <a
              href="mailto:lynnhomesx@proton.me"
              className="flex items-center gap-3 hover:text-lynn-amber transition"
            >
              <Mail size={18} className="text-lynn-amber" /> lynnhomesx@proton.me
            </a>
            <p className="flex items-start gap-3">
              <MapPin size={18} className="text-lynn-amber mt-1" /> 43903
              Rembrandt St, Lancaster, CA 93535
            </p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 bg-lynn-steel rounded-2xl p-7 md:p-9 border border-white/10"
        >
          {done ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-lynn-amber mx-auto mb-5 grid place-items-center">
                <Check size={28} className="text-lynn-asphalt" />
              </div>
              <h3 className="font-archivo text-white text-2xl font-bold uppercase mb-2">
                Thanks, {form.name || "partner"}!
              </h3>
              <p className="text-white/55">
                Our dispatch team will reach out within one business day.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="sm:col-span-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="lyh-input"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Company (optional)">
                <input
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  className="lyh-input"
                  placeholder="Company"
                />
              </Field>
              <Field label="Phone">
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="lyh-input"
                  placeholder="(510) 555-0100"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="lyh-input"
                  placeholder="you@company.com"
                />
              </Field>
              <Field label="Load Type">
                <select
                  value={form.type}
                  onChange={(e) => set("type", e.target.value)}
                  className="lyh-input"
                >
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Pickup Location">
                <input
                  required
                  value={form.pickup}
                  onChange={(e) => set("pickup", e.target.value)}
                  className="lyh-input"
                  placeholder="City, State"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Delivery Location">
                  <input
                    required
                    value={form.delivery}
                    onChange={(e) => set("delivery", e.target.value)}
                    className="lyh-input"
                    placeholder="City, State"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Notes (optional)">
                  <textarea
                    rows="3"
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    className="lyh-input"
                    placeholder="Weight, dates, special equipment…"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-9 py-4 rounded bg-lynn-amber text-lynn-asphalt font-bold uppercase tracking-wide hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Request a Quote"}
                </button>
              </div>
            </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-white/55 text-xs font-bold uppercase tracking-[0.12em] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}