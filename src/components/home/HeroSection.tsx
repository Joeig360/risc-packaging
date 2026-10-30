"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Skincare, Private Label & Custom Packaging",
    description: "Skincare products and packaging solutions for your brand.",
    href: "/solutions",
    cta: "Explore Our Solutions",
    image: "/images/packaging-systems/premium-skincare-set-concept-v1.png",
    alt: "Skincare bottles, cream jar and coordinated presentation cartons",
  },
  {
    title: "Private Label & Product Customization",
    description: "Create your skincare range with product customization and your brand.",
    href: "/solutions#skincare-private-label",
    cta: "Explore Private Label",
    image: "/images/packaging-systems/peptide-serum-system-concept-v1.png",
    alt: "Serum bottle with a coordinated carton for private-label presentation",
  },
  {
    title: "Custom Packaging & Complete Sets",
    description: "Bring containers, cartons and fitted inserts together in a complete set.",
    href: "/packaging-systems",
    cta: "Explore Packaging Systems",
    image: "/images/packaging-systems/p03-five-vial-concept-v1.png",
    alt: "Five glass vials arranged in a fitted presentation box",
  },
] as const;

const controlClass = "inline-flex min-h-11 min-w-11 items-center justify-center text-sm transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite motion-reduce:transition-none";

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // Start stationary until the browser's motion preference is known.
  const [reducedMotion, setReducedMotion] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const rotating = !paused && !reducedMotion && !hovered && pageVisible;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % slides.length), 5500);
    return () => window.clearInterval(timer);
  }, [rotating]);

  function selectSlide(index: number) {
    setCurrent((index + slides.length) % slides.length);
    // Keep the customer's chosen slide until they explicitly resume playback.
    setPaused(true);
  }

  return (
    <section
      className="bg-ivory"
      aria-label="SOOYAN products and packaging"
      aria-roledescription="carousel"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }}
      onFocusCapture={(event) => { if (!event.target.closest("[data-rotation-control]")) setPaused(true); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          selectSlide(current + (event.key === "ArrowLeft" ? -1 : 1));
        }
      }}
    >
      <div className="mx-auto max-w-[var(--container-wide)]">
        <div className="grid" id="home-hero-slides">
          {slides.map((slide, index) => (
            <div
              key={slide.href}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
              aria-hidden={index !== current}
              inert={index !== current}
              data-hero-slide={index}
              className={`col-start-1 row-start-1 grid grid-rows-[1fr_auto] transition-opacity duration-700 ease-in-out motion-reduce:transition-none lg:grid-cols-2 lg:grid-rows-1 ${index === current ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <div className="flex flex-col justify-start px-[var(--page-gutter)] py-5 sm:py-10 lg:justify-center lg:py-12">
                <p className="text-xs font-semibold tracking-[.15em] text-slate">SOOYAN / FOR BEAUTY BRANDS</p>
                <h1 className="mt-3 max-w-xl font-display text-[2rem] leading-[1.08] sm:mt-4 sm:text-5xl lg:text-[3.25rem]">{slide.title}</h1>
                <p className="mt-3 max-w-md text-[15px] leading-6 text-slate sm:mt-5 sm:text-base sm:leading-7">{slide.description}</p>
                <div className="mt-4 grid gap-3 sm:mt-6 sm:flex sm:flex-wrap">
                  <Button href={slide.href}>{slide.cta}</Button>
                </div>
              </div>
              <div className="relative aspect-[3/2] overflow-hidden bg-ivory lg:aspect-auto lg:min-h-[470px]">
                <Image src={slide.image} alt={slide.alt} fill priority={index === 0} loading={index === 0 ? undefined : "eager"} sizes="(max-width:1023px) 100vw, 50vw" className="object-contain" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line px-[var(--page-gutter)] py-2">
          <div className="flex items-center gap-1" aria-label="Choose a slide">
            <button type="button" className={controlClass} aria-label="Previous slide" aria-controls="home-hero-slides" onClick={() => selectSlide(current - 1)}><span aria-hidden="true">←</span></button>
            {slides.map((slide, index) => (
              <button key={slide.href} type="button" className={`${controlClass} border-b-2 ${index === current ? "border-graphite font-semibold text-graphite" : "border-transparent text-slate"}`} aria-label={`Show ${slide.title}`} aria-current={index === current ? "true" : undefined} aria-controls="home-hero-slides" onClick={() => selectSlide(index)}>{String(index + 1).padStart(2, "0")}</button>
            ))}
            <button type="button" className={controlClass} aria-label="Next slide" aria-controls="home-hero-slides" onClick={() => selectSlide(current + 1)}><span aria-hidden="true">→</span></button>
          </div>
          <button
            type="button"
            data-rotation-control
            className={`${controlClass} gap-2 px-2 text-xs disabled:cursor-default disabled:text-slate`}
            disabled={reducedMotion}
            aria-label={reducedMotion ? "Automatic rotation disabled for reduced motion" : paused ? "Play slideshow" : "Pause slideshow"}
            onClick={() => setPaused((value) => !value)}
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">{paused && !reducedMotion ? <path d="M4 2l10 6-10 6z" /> : <path d="M3 2h3v12H3zm7 0h3v12h-3z" />}</svg>
            {reducedMotion ? "Motion off" : paused ? "Play" : "Pause"}
          </button>
        </div>
        <p className="sr-only" aria-live={rotating ? "off" : "polite"} aria-atomic="true">Slide {current + 1} of {slides.length}: {slides[current].title}</p>
      </div>
    </section>
  );
}
