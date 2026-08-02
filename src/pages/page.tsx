"use client";

import { useState } from "react";
import {
  AllDonorsModal,
} from "../components/AllDonorsModal";
import { DONORS } from "../components/ninhoPageShared";
import { DonationFormSection } from "../components/DonationFormSection";
import { FooterSection } from "../components/FooterSection";
import { HeroSection } from "../components/HeroSection";
import { InstagramSection } from "../components/InstagramSection";
import { JourneySection } from "../components/JourneySection";
import { LoveWallSection } from "../components/LoveWallSection";
import { NavbarSection } from "../components/NavbarSection";
import { TransparencySection } from "../components/TransparencySection";

export default function Page() {
  const [showAllDonors, setShowAllDonors] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-warm-cream-bg font-body-md text-on-surface">
      <style>{`
        @keyframes pulseSoft { 0%, 100% { opacity: 1; } 50% { opacity: 0.85; } }
        .animate-pulse-soft { animation: pulseSoft 3s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float-slow { animation: floatSlow 4s ease-in-out infinite; }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in-right { animation: slideInRight 0.3s ease-out; }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scaleIn 0.3s ease-out; }
      `}</style>

      <NavbarSection />

      <main>
        <HeroSection />
        <LoveWallSection onOpenDonors={() => setShowAllDonors(true)} />
        <JourneySection />
        <TransparencySection />
        <InstagramSection />
        <DonationFormSection />
      </main>

      <FooterSection />

      {showAllDonors && <AllDonorsModal donors={DONORS} onClose={() => setShowAllDonors(false)} />}
    </div>
  );
}
