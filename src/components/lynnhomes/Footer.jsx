import React from "react";
import { Truck, Phone, Mail, MapPin } from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";

export default function Footer() {
  return (
    <footer id="lh-contact" className="bg-lynn-asphalt border-t border-white/10">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-10 h-10 rounded bg-lynn-amber">
                <Truck size={20} className="text-lynn-asphalt" />
              </span>
              <span className="font-archivo text-white text-2xl font-extrabold tracking-tight uppercase">
                Lynnhomes
              </span>
            </div>
            <p className="text-white/55 mt-4 max-w-xs leading-relaxed">
              Lancaster-based trucking and freight logistics, hauling across
              California and the Southwest. On time, every time.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-lynn-amber text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Dispatch
            </p>
            <a
              href="tel:+15102994646"
              className="flex items-center gap-3 text-white/80 hover:text-lynn-amber transition"
            >
              <Phone size={18} className="text-lynn-amber" /> +1 (510) 299-4646
            </a>
            <a
              href="mailto:lynnhomesx@proton.me"
              className="flex items-center gap-3 text-white/80 hover:text-lynn-amber transition"
            >
              <Mail size={18} className="text-lynn-amber" /> lynnhomesx@proton.me
            </a>
            <p className="flex items-start gap-3 text-white/60">
              <MapPin size={18} className="text-lynn-amber mt-1" /> 43903
              Rembrandt St, Lancaster, CA 93535
            </p>
          </div>
          <div>
            <p className="text-lynn-amber text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Ready to ship?
            </p>
            <button
              onClick={() => scrollToSection("lh-quote")}
              className="inline-flex items-center px-6 py-3 rounded bg-lynn-amber text-lynn-asphalt font-bold text-sm uppercase tracking-wide hover:brightness-110 transition"
            >
              Get a Quote
            </button>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs uppercase tracking-wide text-white/40">
          <span>
            © {new Date().getFullYear()} Lynnhomes LLC · All Rights Reserved
          </span>
          <span>DOT-Compliant · Fully Insured · Lancaster, CA</span>
        </div>
      </div>
    </footer>
  );
}