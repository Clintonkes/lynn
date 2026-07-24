import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const SLIDES = [
  "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/a99fa42f8_generated_image.png",
  "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/03b3e6d86_generated_image.png",
  "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/533173719_generated_image.png",
  "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/fb31857bc_generated_image.png",
];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="lh-top"
      className="relative bg-lynn-asphalt min-h-screen flex items-center overflow-hidden"
    >
      <AnimatePresence>
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[i]}
            alt="Lynnhomes fleet on the road"
            className="absolute inset-0 w-full h-full object-cover lyh-kenburns"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-lynn-asphalt via-lynn-asphalt/85 to-lynn-asphalt/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-lynn-asphalt via-transparent to-lynn-asphalt/40" />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-8 w-full pt-28 pb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-lynn-amber text-sm font-bold uppercase tracking-[0.25em] mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-lynn-amber animate-pulse" />{" "}
          Lancaster, CA · Freight & Logistics
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-archivo text-white text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.9] tracking-tight max-w-4xl"
        >
          Freight that <span className="text-lynn-amber">moves</span> on time,
          every time.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-white/75 text-lg md:text-xl mt-6 max-w-xl leading-relaxed"
        >
          Lynnhomes LLC is a Lancaster-based trucking company hauling freight,
          heavy loads, and logistics solutions across California and the
          Southwest.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-9"
        >
          <a
            href="#lh-quote"
            className="inline-flex items-center gap-2 px-7 py-4 rounded bg-lynn-amber text-lynn-asphalt font-bold uppercase tracking-wide hover:brightness-110 transition"
          >
            <ArrowRight size={18} /> Request a Quote
          </a>
          <a
            href="#lh-fleet"
            className="inline-flex items-center gap-2 px-7 py-4 rounded border border-white/30 text-white font-bold uppercase tracking-wide hover:bg-white hover:text-lynn-asphalt transition"
          >
            <Play size={18} /> View the Fleet
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-3 mt-12"
        >
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === i ? "w-12 bg-lynn-amber" : "w-6 bg-white/30"
              }`}
            />
          ))}
          <span className="ml-3 text-white/40 text-xs font-mono tracking-wider">
            0{i + 1} / 0{SLIDES.length}
          </span>
        </motion.div>
      </div>
    </section>
  );
}