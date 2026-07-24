import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TRUCKS = [
  {
    name: "Dry Van Fleet",
    spec: "53' trailers · 26,000 lbs capacity",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/a99fa42f8_generated_image.png",
  },
  {
    name: "Flatbed Rigs",
    spec: "Oversize & construction loads",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/03b3e6d86_generated_image.png",
  },
  {
    name: "Regional Box Trucks",
    spec: "Same-day CA & NV runs",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/533173719_generated_image.png",
  },
  {
    name: "Heavy Haul",
    spec: "Permitted super-loads",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/fb31857bc_generated_image.png",
  },
];

export default function Fleet() {
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((p) => (p + 1) % TRUCKS.length), []);
  const prev = () => setI((p) => (p - 1 + TRUCKS.length) % TRUCKS.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const t = TRUCKS[i];

  return (
    <section id="lh-fleet" className="bg-lynn-steel py-24">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-lynn-amber text-sm font-bold uppercase tracking-[0.25em]">
              // The Fleet
            </span>
            <h2 className="font-archivo text-white text-4xl md:text-6xl font-extrabold uppercase tracking-tight mt-3">
              Rigs built for the <span className="text-lynn-amber">long haul</span>.
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="grid place-items-center w-12 h-12 rounded border border-white/20 text-white hover:bg-lynn-amber hover:text-lynn-asphalt hover:border-lynn-amber transition"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              className="grid place-items-center w-12 h-12 rounded border border-white/20 text-white hover:bg-lynn-amber hover:text-lynn-asphalt hover:border-lynn-amber transition"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img
                src={t.img}
                alt={t.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lynn-asphalt via-lynn-asphalt/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <span className="inline-block bg-lynn-amber text-lynn-asphalt text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 mb-3">
                  0{i + 1} / 0{TRUCKS.length}
                </span>
                <h3 className="font-archivo text-white text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
                  {t.name}
                </h3>
                <p className="text-white/70 mt-1">{t.spec}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-6 right-6 md:right-12 flex gap-2 z-10">
            {TRUCKS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-10 bg-lynn-amber" : "w-4 bg-white/40"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}