import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Clock, MapPinned, Award } from "lucide-react";

const STATS = [
  { n: 40, suffix: "+", l: "Trucks in fleet" },
  { n: 12, suffix: "+", l: "Years on the road" },
  { n: 50000, suffix: "+", l: "Miles hauled / month" },
  { n: 99, suffix: "%", l: "On-time delivery" },
];

const REASONS = [
  "Fully insured and DOT-compliant fleet",
  "24/7 dispatch and real-time load tracking",
  "Experienced, CDL-licensed drivers",
  "On-time guarantee with transparent pricing",
  "Heavy-haul permits and escort coordination",
  "Local Lancaster crew, statewide reach",
];

function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function Check2() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12l5 5L20 7"
        stroke="#0B0E11"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Feature({ icon: Icon, t, d }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-lynn-steel border border-white/10 rounded-xl p-5"
    >
      <Icon size={22} className="text-lynn-amber" />
      <h3 className="font-archivo text-white font-bold uppercase text-sm mt-3">
        {t}
      </h3>
      <p className="text-white/50 text-sm mt-1">{d}</p>
    </motion.div>
  );
}

export default function Why() {
  return (
    <section id="lh-why" className="bg-lynn-asphalt py-24">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-l-2 border-lynn-amber pl-5"
            >
              <p className="font-archivo text-4xl md:text-5xl font-extrabold text-white">
                <CountUp to={s.n} suffix={s.suffix} />
              </p>
              <p className="text-white/55 text-sm uppercase tracking-wider mt-2">
                {s.l}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-lynn-amber text-sm font-bold uppercase tracking-[0.25em]">
              // Why Lynnhomes
            </span>
            <h2 className="font-archivo text-white text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-3 leading-[0.95]">
              A fleet you can <span className="text-lynn-amber">trust</span> with
              the load.
            </h2>
            <p className="text-white/60 text-lg mt-5 leading-relaxed max-w-md">
              From dry van to heavy haul, we treat every shipment like it's our
              own — dispatched fast, tracked live, and delivered on time.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mt-8">
              {REASONS.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="grid place-items-center w-6 h-6 rounded bg-lynn-amber shrink-0 mt-0.5">
                    <Check2 />
                  </span>
                  <span className="text-white/75 text-sm font-medium leading-snug">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Feature icon={ShieldCheck} t="Fully insured" d="Cargo & liability coverage on every load." />
            <Feature icon={Clock} t="24/7 dispatch" d="Live tracking and support around the clock." />
            <Feature icon={MapPinned} t="Statewide reach" d="California, Nevada, Arizona & beyond." />
            <Feature icon={Award} t="Veteran crew" d="CDL drivers with 12+ years on the road." />
          </div>
        </div>
      </div>
    </section>
  );
}