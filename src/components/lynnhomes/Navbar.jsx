import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Truck } from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";

const LINKS = [
  { label: "Services", id: "lh-services" },
  { label: "Fleet", id: "lh-fleet" },
  { label: "Why Us", id: "lh-why" },
  { label: "Quote", id: "lh-quote" },
  { label: "Contact", id: "lh-contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => () => scrollToSection(id);
  const goAndClose = (id) => () => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-lynn-asphalt/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <button onClick={go("lh-top")} className="flex items-center gap-2.5">
          <span className="grid place-items-center w-10 h-10 rounded bg-lynn-amber">
            <Truck size={20} className="text-lynn-asphalt" />
          </span>
          <span className="font-archivo text-white text-xl font-extrabold tracking-tight uppercase">
            Lynnhomes
          </span>
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={go(l.id)}
              className="text-white/70 hover:text-lynn-amber text-sm font-bold uppercase tracking-wider transition"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={go("lh-quote")}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded bg-lynn-amber text-lynn-asphalt text-sm font-bold uppercase tracking-wider hover:brightness-110 transition"
        >
          Get a Quote
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-lynn-asphalt border-t border-white/10 px-6 py-5">
          <nav className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={goAndClose(l.id)}
                className="text-left text-white/80 uppercase text-sm font-bold tracking-wider"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={goAndClose("lh-quote")}
              className="px-4 py-3 text-center rounded bg-lynn-amber text-lynn-asphalt text-sm font-bold uppercase"
            >
              Get a Quote
            </button>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
