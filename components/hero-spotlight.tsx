"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSpotlight() {
  const [lightRight, setLightRight] = useState(false);

  useEffect(() => {
    let pastThreshold = false;
    const syncWithScroll = () => {
      const next = window.scrollY > 80;
      // Only crossing the threshold changes the selection, so a click is not
      // immediately undone by small scroll events on the same side of it.
      if (next !== pastThreshold) {
        pastThreshold = next;
        setLightRight(next);
      }
    };
    const frame = window.requestAnimationFrame(syncWithScroll);
    window.addEventListener("scroll", syncWithScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncWithScroll);
    };
  }, []);

  return (
    <button
      className={`dd-device-scene ${lightRight ? "is-right" : "is-left"}`}
      type="button"
      onClick={() => setLightRight((value) => !value)}
      aria-label="Chiếu sáng laptop"
      aria-pressed={lightRight}
      aria-describedby="dd-spotlight-hint"
    >
      <svg className="dd-device-light" viewBox="0 0 1200 580" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="dd-hero-beam-fade" x1="600" y1="26" x2="600" y2="565" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity=".16" />
            <stop offset=".22" stopColor="white" stopOpacity=".09" />
            <stop offset=".7" stopColor="white" stopOpacity=".025" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="dd-hero-wall-glow" cx="50%" cy="43%" r="50%" fx="50%" fy="27%">
            <stop stopColor="#f5f5f5" stopOpacity=".6" />
            <stop offset=".18" stopColor="#efefef" stopOpacity=".43" />
            <stop offset=".45" stopColor="#dedede" stopOpacity=".22" />
            <stop offset=".74" stopColor="#d3d3d3" stopOpacity=".065" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dd-hero-light-halo">
            <stop stopColor="white" stopOpacity=".26" />
            <stop offset=".4" stopColor="white" stopOpacity=".08" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <filter id="dd-hero-beam-soft" x="-50%" y="-20%" width="200%" height="140%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
          <filter id="dd-hero-source-soft" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="dd-hero-glow-grain" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="12" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope=".3" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" result="lit-grain" />
            <feBlend in="SourceGraphic" in2="lit-grain" mode="soft-light" />
          </filter>
        </defs>
        <g className="dd-device-beam">
          <path d="M530 26 Q600 6 670 26 L840 520 Q600 620 360 520 Z" fill="url(#dd-hero-beam-fade)" filter="url(#dd-hero-beam-soft)" />
        </g>
        <g className="dd-device-pool">
          <ellipse cx="312" cy="310" rx="395" ry="315" fill="url(#dd-hero-wall-glow)" filter="url(#dd-hero-glow-grain)" />
          <ellipse cx="312" cy="485" rx="250" ry="40" fill="url(#dd-hero-light-halo)" opacity=".45" />
        </g>
        <g className="dd-device-light-source" filter="url(#dd-hero-source-soft)">
          <ellipse cx="600" cy="26" rx="116" ry="40" fill="url(#dd-hero-light-halo)" opacity=".55" />
        </g>
      </svg>
      <span className="dd-device-image dd-device-phone" aria-hidden="true">
        <Image src="/images/hero/phone-hd.png" alt="" fill unoptimized priority />
      </span>
      <span className="dd-device-image dd-device-laptop" aria-hidden="true">
        <Image src="/images/hero/laptop-hd.png" alt="" fill unoptimized priority />
      </span>
      <span className="dd-device-label dd-device-label-phone" aria-hidden="true"><i /> MOBILE APP</span>
      <span className="dd-device-label dd-device-label-laptop" aria-hidden="true"><i /> WEBSITE</span>
      <span id="dd-spotlight-hint" className="dd-device-hint">Cuộn hoặc chạm để chuyển ánh sáng <span aria-hidden="true">↔</span></span>
    </button>
  );
}
