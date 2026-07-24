import React from "react";
import { motion } from "framer-motion";
import { MapPin, Package, Layers, Headset } from "lucide-react";

const SERVICES = [
  {
    icon: MapPin,
    t: "Long-Haul Freight",
    d: "Coast-to-coast dry van hauling with veteran drivers and full-load service across state lines.",
  },
  {
    icon: Package,
    t: "Regional & Local Delivery",
    d: "Same-day and next-day regional runs across California and the Southwest, dispatched fast.",
  },
  {
    icon: Layers,
    t: "Flatbed & Heavy Haul",
    d: "Oversized loads, construction materials, and equipment transport with the right permits and rigging.",
  },
  {
    icon: Headset,
    t: "Logistics & Dispatch",
    d: "Dedicated dispatch, route planning, and real-time tracking so your freight is never a mystery.",
  },
];

export default function Services() {
  return (
    <section id="lh-services" className="bg-lynn-asphalt py-24">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-lynn-amber text-sm font-bold uppercase tracking-[0.25em]">
            // Services
          </span>
          <h2 className="font-archivo text-white text-4xl md:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight mt-3">
            Built to <span className="text-lynn-amber">move</span> anything,
            anywhere.
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.t}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-lynn-steel border border-white/10 rounded-2xl p-7 hover:border-lynn-amber/60 transition-colors"
              >
                <span className="grid place-items-center w-12 h-12 rounded bg-lynn-amber/15 mb-5">
                  <Icon size={24} className="text-lynn-amber" />
                </span>
                <h3 className="font-archivo text-white text-xl font-bold uppercase tracking-tight">
                  {s.t}
                </h3>
                <p className="text-white/55 mt-3 leading-relaxed text-sm">
                  {s.d}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}