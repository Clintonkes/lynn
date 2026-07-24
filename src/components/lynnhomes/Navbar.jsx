import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Truck } from "lucide-react";

const LINKS = [
  { label: "Services", href: "#lh-services" },
  { label: "Fleet", href: "#lh-fleet" },
  { label: "Why Us", href: "#lh-why" },
  { label: "Quote", href: "#lh-quote" },
  { label: "Contact", href: "#lh-contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a href="#lh-top" className="flex items-center gap-2.5">
          <span className="grid place-items-center w-10 h-10 rounded bg-lynn-amber">
            <Truck size={20} className="text-lynn-asphalt" />
          </span>
          <span className="font-archivo text-white text-xl font-extrabold tracking-tight uppercase">
            Lynnhomes
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-lynn-amber text-sm font-bold uppercase tracking-wider transition"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#lh-quote"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded bg-lynn-amber text-lynn-asphalt text-sm font-bold uppercase tracking-wider hover:brightness-110 transition"
        >
          Get a Quote
        </a>
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
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/80 uppercase text-sm font-bold tracking-wider"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#lh-quote"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-center rounded bg-lynn-amber text-lynn-asphalt text-sm font-bold uppercase"
            >
              Get a Quote
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}