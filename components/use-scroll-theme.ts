"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

/** One shared canvas changes color as the next section enters the viewport. */
export function useScrollTheme() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const sections = Array.from(
      element.querySelectorAll<HTMLElement>(".theme-light, .theme-dark"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stops: { top: number; darkness: number }[] = [];
    let frame = 0;
    let needsMeasure = true;
    let lastColor = "";

    const paint = () => {
      frame = 0;
      if (needsMeasure) {
        stops = sections.map((section) => ({
          top: section.getBoundingClientRect().top + window.scrollY,
          darkness: section.classList.contains("theme-dark") ? 1 : 0,
        }));
        needsMeasure = false;
      }

      let darkness = stops[0]?.darkness ?? 0;
      for (let index = 1; index < stops.length; index++) {
        const stop = stops[index];
        // Blend over 65% of a screen, starting when the next block enters.
        const progress = reducedMotion.matches
          ? Number(window.scrollY + window.innerHeight * 0.55 >= stop.top)
          : clamp(
              (window.scrollY + window.innerHeight * 0.9 - stop.top) /
                (window.innerHeight * 0.65),
            );
        darkness =
          stops[index - 1].darkness +
          (stop.darkness - stops[index - 1].darkness) * smoothstep(progress);
        if (progress < 1) break;
      }

      const background = Math.round(250 - darkness * 234);
      // Keep text legible through the middle grays instead of interpolating
      // foreground/background through the same color. Header follows this too.
      const dark = background < 118;
      const edge = dark
        ? clamp((118 - background) / 102)
        : clamp((background - 118) / 132);
      const foreground = Math.round(dark ? 255 - 5 * edge : 16 * edge);
      const muted = Math.round(dark ? 255 - 95 * edge : 98 * edge);
      const color = `${background}/${foreground}/${muted}`;
      if (color !== lastColor) {
        element.style.setProperty(
          "--dd-page-bg",
          `rgb(${background} ${background} ${background})`,
        );
        element.style.setProperty(
          "--dd-page-fg",
          `rgb(${foreground} ${foreground} ${foreground})`,
        );
        element.style.setProperty(
          "--dd-page-muted",
          `rgb(${muted} ${muted} ${muted})`,
        );
        element.style.setProperty(
          "--dd-page-line",
          `rgb(${foreground} ${foreground} ${foreground} / 0.2)`,
        );
        lastColor = color;
      }
      element.dataset.scrollThemeActive = "";
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const measure = () => {
      needsMeasure = true;
      schedule();
    };
    const observer = new ResizeObserver(measure);
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", schedule);
    paint();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", schedule);
      delete element.dataset.scrollThemeActive;
    };
  }, []);

  return root;
}
