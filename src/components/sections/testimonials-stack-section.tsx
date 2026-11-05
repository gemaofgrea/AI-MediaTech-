"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "They treated our national documentary series with the human care and cinematic grandeur it deserved: clearer visual journeys, less friction, and a master production system our whole team could build on.",
    author: "Richard Dood",
    role: "Digital Director",
    company: "@Macmillan Media",
  },
  {
    id: "test-2",
    quote:
      "LUMA Atelier compressed our six-month sci-fi virtual production schedule into 21 days. The in-camera VFX and 8K neural finishing was indistinguishable from an actual location shoot.",
    author: "Julian Vance",
    role: "Executive Producer",
    company: "@A24 Horizon Films",
  },
  {
    id: "test-3",
    quote:
      "Our Autumn couture lookbook was digitally double-cast and rendered across 14 virtual runway models in 72 hours. The cloth dynamics rivaled the physical Paris runway.",
    author: "Sophie Delacroix",
    role: "Global Creative Director",
    company: "@Maison de L'Ombre (Milan)",
  },
  {
    id: "test-4",
    quote:
      "The synergy between top-tier human cinematographers and generative prompt architects is the holy grail. Groundbreaking masters delivered on schedule.",
    author: "Kaito Tanaka",
    role: "Head of Creative Innovation",
    company: "@Tokyo CyberVision",
  },
  {
    id: "test-5",
    quote:
      "Nothing is beyond possibility when directing with this atelier. They're able to rise to any challenge by bringing a deep curiosity, technical mastery and artistic expertise to every project.",
    author: "Gaidar Magdanurov",
    role: "COO",
    company: "@Acronis Media",
  },
];

interface ScrollCardProps {
  item: Testimonial;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onCardClick: () => void;
}

function ScrollCard({
  item,
  index,
  total,
  scrollYProgress,
  onCardClick,
}: ScrollCardProps) {
  const maxIdx = total - 1;
  const progressPoints: number[] = [];
  const yValues: number[] = [];
  const xValues: number[] = [];
  const opacityValues: number[] = [];

  if (index === 0) {
    // Card 0 starts at position (0, 0) and tucks back into the top-right fan as cards 1..N enter
    progressPoints.push(0);
    yValues.push(0);
    xValues.push(0);
    opacityValues.push(1);

    for (let k = 1; k <= maxIdx; k++) {
      const p = k / maxIdx;
      progressPoints.push(p);
      yValues.push(-(k * 20));
      xValues.push(k * 16);
      opacityValues.push(Math.max(0.3, 1 - k * 0.15));
    }
  } else {
    // Card index > 0 starts below the viewport and slides up from bottom at its entry point
    const enterStart = Math.max(0, (index - 0.75) / maxIdx);
    const enterEnd = index / maxIdx;

    progressPoints.push(0);
    yValues.push(700);
    xValues.push(0);
    opacityValues.push(0);

    if (enterStart > 0) {
      progressPoints.push(enterStart);
      yValues.push(700);
      xValues.push(0);
      opacityValues.push(0);
    }

    progressPoints.push(enterEnd);
    yValues.push(0);
    xValues.push(0);
    opacityValues.push(1);

    for (let k = index + 1; k <= maxIdx; k++) {
      const p = k / maxIdx;
      const s = k - index;
      progressPoints.push(p);
      yValues.push(-(s * 20));
      xValues.push(s * 16);
      opacityValues.push(Math.max(0.3, 1 - s * 0.15));
    }
  }

  const y = useTransform(scrollYProgress, progressPoints, yValues);
  const x = useTransform(scrollYProgress, progressPoints, xValues);
  const opacity = useTransform(scrollYProgress, progressPoints, opacityValues);

  return (
    <motion.div
      style={{
        y,
        x,
        opacity,
        zIndex: index * 10 + 10,
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      onClick={onCardClick}
      className="testimonial-card absolute inset-0 rounded-2xl sm:rounded-[24px] bg-[#121214] border border-white/[0.12] p-8 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.75)] backdrop-blur-md cursor-pointer hover:border-white/25 transition-all duration-300 flex flex-col justify-between will-change-transform"
    >
      {/* Testimonial Quote Text */}
      <div className="flex-1 flex items-start pt-2">
        <p className="testimonial-quote font-primary text-base sm:text-lg md:text-[1.2rem] text-white font-normal leading-[1.48] tracking-tight">
          {item.quote}
        </p>
      </div>

      {/* Author Attribution Footer */}
      <div className="testimonial-footer pt-6 mt-6 border-t border-white/[0.08] flex items-center font-primary text-xs sm:text-[13px] md:text-sm">
        <span className="testimonial-author font-semibold text-white mr-1.5">{item.author}</span>
        <span className="testimonial-role text-[#8a8a8a] font-normal">
          - {item.role} {item.company}
        </span>
      </div>
    </motion.div>
  );
}

export function TestimonialsStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the extended container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Advance to next card when clicking the active card
  const handleNextClick = () => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    const currentProgress = Math.max(
      0,
      Math.min(1, (currentScroll - containerTop) / (containerHeight - windowHeight))
    );

    const currentCardIdx = Math.floor(currentProgress * (TESTIMONIALS.length - 1));
    const nextCardIdx = (currentCardIdx + 1) % TESTIMONIALS.length;
    const targetScroll =
      containerTop + (nextCardIdx / (TESTIMONIALS.length - 1)) * (containerHeight - windowHeight);

    window.scrollTo({ top: targetScroll + 5, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative w-full h-[320vh] bg-[#0c0c0e] text-white select-none"
    >
      {/* Sticky Viewport pinned for the scroll duration */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Exact Headline & Subtitle with smooth entrance animation */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col items-start justify-center will-change-transform"
            >
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem] font-normal leading-[1.04] tracking-[-0.03em] text-white">
                <span className="font-primary text-white">What </span>
                <span className="font-secondary italic font-light text-white">people</span>
                <br />
                <span className="font-primary text-white">have to say</span>
              </h2>

              {/* Offset Subtitle (Indented under 'people' as in screenshot) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="pl-8 sm:pl-20 md:pl-28 lg:pl-36 mt-8 sm:mt-10 md:mt-12"
              >
                <p className="font-primary text-xs sm:text-[13px] md:text-sm text-[#8a8a8a] leading-relaxed max-w-[360px]">
                  Curious what it&apos;s really like to direct with our atelier?
                  <br />
                  Don&apos;t take our word for it. Here&apos;s what global studio partners say.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column: Exact Card Stack with smooth reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative flex items-center justify-center pt-14 pb-8 pr-2 sm:pr-6 lg:pr-8 will-change-transform"
            >
              <div className="relative w-full max-w-[560px] h-[360px] sm:h-[330px] md:h-[360px]">
                {TESTIMONIALS.map((item, index) => (
                  <ScrollCard
                    key={item.id}
                    item={item}
                    index={index}
                    total={TESTIMONIALS.length}
                    scrollYProgress={scrollYProgress}
                    onCardClick={handleNextClick}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
