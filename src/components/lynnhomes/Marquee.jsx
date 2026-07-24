import React from "react";

const ITEMS = [
  "Long-Haul Freight",
  "Regional Delivery",
  "Flatbed & Heavy Haul",
  "Logistics & Dispatch",
  "24/7 Tracking",
  "On-Time Guaranteed",
  "Fully Insured",
  "Fleet of 40+ Trucks",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-lynn-amber text-lynn-asphalt py-4 overflow-hidden border-y border-lynn-asphalt/20">
      <div className="flex w-max animate-lynn-marquee">
        {row.map((it, i) => (
          <div key={i} className="flex items-center gap-10 px-6">
            <span className="font-archivo text-sm font-extrabold uppercase tracking-[0.2em] whitespace-nowrap">
              {it}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-lynn-asphalt" />
          </div>
        ))}
      </div>
    </div>
  );
}