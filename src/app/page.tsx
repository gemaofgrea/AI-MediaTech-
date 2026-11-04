"use client";

import React, { useState } from "react";
import { FloatingDock } from "@/components/layout/floating-dock";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { HeroSection } from "@/components/sections/hero-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { RealPlaySection } from "@/components/sections/real-play-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { ServicesMarqueeSection } from "@/components/sections/services-marquee-section";
import { ViewcaseSection } from "@/components/sections/viewcase-section";
import { TestimonialsStackSection } from "@/components/sections/testimonials-stack-section";
import { KineticStatementSection } from "@/components/sections/kinetic-statement-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { ContactFooterSection } from "@/components/sections/contact-footer-section";
import { ShowreelModal } from "@/components/modals/showreel-modal";
import { LeadsHudModal } from "@/components/modals/leads-hud-modal";
import { InquiryModal } from "@/components/modals/inquiry-modal";

export default function Home() {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isLeadsHudOpen, setIsLeadsHudOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("");

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col selection:bg-lime-400 selection:text-black">
      {/* Interactive Custom Cursor Follower */}
      <CustomCursor />

      {/* Main Experience */}
      <main className="flex-1">
        {/* 1. Hero: Exact kstoimenov.com Green Ribbed Curtain & Typography Layout */}
        <HeroSection
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onOpenLeadsHud={() => setIsLeadsHudOpen(true)}
          onOpenInquiry={() => setIsInquiryOpen(true)}
        />

        {/* 2. Philosophy & Approach Manifesto (Exact Design from kstoimenov.com) */}
        <ManifestoSection />

        {/* 3. Real Play: Kinetic Showreel & Collaborative Canvas */}
        <RealPlaySection onOpenShowreel={() => setIsShowreelOpen(true)} />

        {/* 4. Track Record & Metrics (Exact 4-Column Design with Hover Highlight) */}
        <MetricsSection />

        {/* 5. Services+ Marquee Section (Exact 1:1 Design from Screenshot) */}
        <ServicesMarqueeSection />

        {/* 6. Viewcase: Selected Projects (Exact 1:1 Design from Macmillan Screenshot) */}
        <ViewcaseSection onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* 7. What People Have to Say: Stacking Testimonial Cards (Exact 1:1 Design from Screenshot) */}
        <TestimonialsStackSection />

        {/* 8. Kinetic Parallax Statement: Design to scale & drive experiences with data */}
        <KineticStatementSection />

        {/* 9. Valuable Partners: 5-Column Grid with Hairline Borders */}
        <PartnersSection />
      </main>

      {/* Signature Floating Island Navigation Dock */}
      <FloatingDock
        onOpenLeadsHud={() => setIsLeadsHudOpen(true)}
        onOpenShowreel={() => setIsShowreelOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Colophon & Contact Footer (Exact Screenshot Layout with Green Pleated Lighting) */}
      <ContactFooterSection onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Global Modals */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      <LeadsHudModal
        isOpen={isLeadsHudOpen}
        onClose={() => setIsLeadsHudOpen(false)}
      />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        onOpenLeadsHud={() => setIsLeadsHudOpen(true)}
        initialService={selectedService}
        initialBudget={selectedBudget}
        initialTimeline={selectedTimeline}
      />
    </div>
  );
}
