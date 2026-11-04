"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface GreenRibbedCurtainProps {
  fadeDirection?: "bottom" | "top" | "both" | "none";
  className?: string;
}

export function GreenRibbedCurtain({
  fadeDirection = "bottom",
  className = "pointer-events-none absolute inset-0 z-0 h-full w-full",
}: GreenRibbedCurtainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const getDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? Math.max(parent.clientHeight, 400) : window.innerHeight;
      return { w, h };
    };

    let { w: width, h: height } = getDimensions();
    canvas.width = width;
    canvas.height = height;

    const isTopFade = fadeDirection === "top";

    // Spotlight physics object driven by GSAP
    const light = {
      x: width * 0.22,
      y: isTopFade ? height * 0.7 : height * 0.42,
      radius: Math.min(Math.max(width * 0.30, 340), 440),
      intensity: 0.9,
      scaleX: 1.0,
    };

    // Silky smooth GSAP quickTo tracking
    const xTo = gsap.quickTo(light, "x", { duration: 0.75, ease: "power3.out" });
    const yTo = gsap.quickTo(light, "y", { duration: 0.75, ease: "power3.out" });
    const scaleXTo = gsap.quickTo(light, "scaleX", { duration: 0.45, ease: "power2.out" });

    let lastX = light.x;

    const handleResize = () => {
      if (!canvas) return;
      const dims = getDimensions();
      width = canvas.width = dims.w;
      height = canvas.height = dims.h;
      light.radius = Math.min(Math.max(width * 0.30, 340), 440);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const vx = Math.abs(mouseX - lastX);
      lastX = mouseX;
      xTo(mouseX);
      yTo(mouseY);
      scaleXTo(1 + Math.min(vx * 0.01, 0.35));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      xTo(e.touches[0].clientX - rect.left);
      yTo(e.touches[0].clientY - rect.top);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let time = 0;

    // Synchronize render with GSAP's high-precision 60-120fps hardware ticker
    const tick = () => {
      time += 0.016;

      // Base: Velvet dark forest emerald
      ctx.fillStyle = "#091d0a";
      ctx.fillRect(0, 0, width, height);

      // Fluted rib geometry (22px on desktop, 16px on mobile)
      const ribWidth = width < 768 ? 16 : 22;
      const ribCount = Math.ceil(width / ribWidth);

      const spotX = light.x;
      const spotY = light.y;
      const spotRadius = light.radius;

      // Ambient autonomous theatrical sweeping beam
      const ambX = width * (0.18 + 0.16 * Math.sin(time * 0.45));
      const ambY = isTopFade
        ? height * (0.68 + 0.1 * Math.cos(time * 0.3))
        : height * (0.45 + 0.12 * Math.cos(time * 0.3));
      const ambRadius = Math.max(width * 0.44, 540);

      // Render vertical pleated 3D ribs with cylindrical lighting
      for (let i = 0; i < ribCount; i++) {
        const waveOffset = Math.sin(time * 0.8 + i * 0.15) * 1.2;
        const x = i * ribWidth + waveOffset;
        const ribCenterX = x + ribWidth * 0.5;

        // Radial light falloff from mouse spotlight (theatrical cone focus)
        const dxSpot = (ribCenterX - spotX) / spotRadius;
        const dySpot = ((isTopFade ? height * 0.65 : height * 0.42) - spotY) / spotRadius;
        const spotDistSq = dxSpot * dxSpot + dySpot * dySpot * 0.65;
        const spotFactor = Math.max(0, 1 - Math.sqrt(spotDistSq));

        // Radial light falloff from ambient beam
        const dxAmb = (ribCenterX - ambX) / ambRadius;
        const dyAmb = ((isTopFade ? height * 0.65 : height * 0.42) - ambY) / ambRadius;
        const ambDistSq = dxAmb * dxAmb + dyAmb * dyAmb;
        const ambFactor = Math.max(0, 1 - Math.sqrt(ambDistSq));

        // 10% reduced brightness factor (multiplied by 0.90)
        const illumination = Math.min(1.65, (ambFactor * 0.95 + spotFactor * 1.30) * 0.90);

        // Cylinder Lighting Model
        const ribGrad = ctx.createLinearGradient(x, 0, x + ribWidth, 0);

        // 10% reduced RGB brightness values
        const litR = Math.floor(8 + illumination * 102);
        const litG = Math.floor(25 + illumination * 153);
        const litB = Math.floor(8 + illumination * 40);

        const shadowR = Math.max(2, Math.floor(litR * 0.15));
        const shadowG = Math.max(5, Math.floor(litG * 0.19));
        const shadowB = Math.max(2, Math.floor(litB * 0.15));

        const crestR = Math.min(235, Math.floor(litR * 1.32 + 12));
        const crestG = Math.min(235, Math.floor(litG * 1.25 + 19));
        const crestB = Math.min(235, Math.floor(litB * 1.20 + 10));

        ribGrad.addColorStop(0, `rgb(${shadowR}, ${shadowG}, ${shadowB})`);
        ribGrad.addColorStop(0.2, `rgb(${crestR}, ${crestG}, ${crestB})`);
        ribGrad.addColorStop(0.55, `rgb(${litR}, ${litG}, ${litB})`);
        ribGrad.addColorStop(0.92, `rgb(${Math.floor(litR * 0.38)}, ${Math.floor(litG * 0.44)}, ${Math.floor(litB * 0.34)})`);
        ribGrad.addColorStop(1, `rgb(${shadowR}, ${shadowG}, ${shadowB})`);

        ctx.fillStyle = ribGrad;
        ctx.fillRect(x, 0, ribWidth + 0.6, height);
      }

      // Additive Screen blending for volumetric spotlight glows
      ctx.globalCompositeOperation = "screen";

      // 1. Mouse Interactive Spotlight (Theatrical Fresnel Cone with focused hotspot, 10% reduced brightness)
      ctx.save();
      ctx.translate(spotX, spotY);
      ctx.scale(light.scaleX, 1.05);

      const spotGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, spotRadius);
      spotGlow.addColorStop(0, "rgba(205, 255, 95, 0.52)");      // Crisp hot center (-10% brightness)
      spotGlow.addColorStop(0.22, "rgba(160, 246, 58, 0.39)");   // Focused inner spotlight cone
      spotGlow.addColorStop(0.48, "rgba(85, 205, 36, 0.22)");    // Mid falloff
      spotGlow.addColorStop(0.76, "rgba(30, 118, 20, 0.09)");    // Penumbra
      spotGlow.addColorStop(1, "rgba(0, 0, 0, 0)");              // Feathered outer boundary

      ctx.fillStyle = spotGlow;
      ctx.fillRect(-spotRadius, -spotRadius, spotRadius * 2, spotRadius * 2);

      // Subtle theatrical Fresnel aperture ring
      const ringGlow = ctx.createRadialGradient(0, 0, spotRadius * 0.42, 0, 0, spotRadius * 0.68);
      ringGlow.addColorStop(0, "rgba(0, 0, 0, 0)");
      ringGlow.addColorStop(0.5, "rgba(165, 250, 60, 0.065)");
      ringGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ringGlow;
      ctx.fillRect(-spotRadius, -spotRadius, spotRadius * 2, spotRadius * 2);

      ctx.restore();

      // 2. Ambient Theatrical Stage Beam (10% reduced brightness)
      const ambGlow = ctx.createRadialGradient(
        ambX,
        ambY,
        20,
        ambX,
        ambY,
        ambRadius
      );
      ambGlow.addColorStop(0, "rgba(148, 224, 52, 0.41)");  // -10% from 0.46
      ambGlow.addColorStop(0.4, "rgba(82, 182, 32, 0.23)"); // -10% from 0.26
      ambGlow.addColorStop(0.75, "rgba(23, 92, 20, 0.09)"); // -10% from 0.10
      ambGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambGlow;
      ctx.fillRect(0, 0, width, height);

      // Reset to source-over for fade gradients
      ctx.globalCompositeOperation = "source-over";

      if (fadeDirection === "bottom") {
        const bottomFade = ctx.createLinearGradient(0, height * 0.52, 0, height);
        bottomFade.addColorStop(0, "rgba(0, 0, 0, 0)");
        bottomFade.addColorStop(0.45, "rgba(4, 12, 4, 0.5)");
        bottomFade.addColorStop(0.8, "rgba(3, 8, 3, 0.88)");
        bottomFade.addColorStop(1, "rgba(2, 6, 2, 0.98)");
        ctx.fillStyle = bottomFade;
        ctx.fillRect(0, 0, width, height);
      } else if (fadeDirection === "top") {
        const topFade = ctx.createLinearGradient(0, 0, 0, height * 0.45);
        topFade.addColorStop(0, "rgba(12, 12, 14, 0.98)");
        topFade.addColorStop(0.3, "rgba(12, 12, 14, 0.85)");
        topFade.addColorStop(0.65, "rgba(4, 12, 4, 0.45)");
        topFade.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = topFade;
        ctx.fillRect(0, 0, width, height);
      } else if (fadeDirection === "both") {
        const topFade = ctx.createLinearGradient(0, 0, 0, height * 0.35);
        topFade.addColorStop(0, "rgba(12, 12, 14, 0.98)");
        topFade.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = topFade;
        ctx.fillRect(0, 0, width, height * 0.35);

        const bottomFade = ctx.createLinearGradient(0, height * 0.65, 0, height);
        bottomFade.addColorStop(0, "rgba(0, 0, 0, 0)");
        bottomFade.addColorStop(1, "rgba(2, 6, 2, 0.98)");
        ctx.fillStyle = bottomFade;
        ctx.fillRect(0, height * 0.65, width, height * 0.35);
      }
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [fadeDirection]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}

