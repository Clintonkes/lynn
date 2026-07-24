import React from "react";
import Navbar from "@/components/lynnhomes/Navbar";
import Hero from "@/components/lynnhomes/Hero";
import Marquee from "@/components/lynnhomes/Marquee";
import Services from "@/components/lynnhomes/Services";
import Fleet from "@/components/lynnhomes/Fleet";
import Why from "@/components/lynnhomes/Why";
import Quote from "@/components/lynnhomes/Quote";
import Footer from "@/components/lynnhomes/Footer";

export default function Lynnhomes() {
  return (
    <div className="bg-lynn-asphalt">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Fleet />
        <Why />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}