"use client";

import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { DONORS, Reveal, donorInitial } from "./ninhoPageShared";

export function LoveWallSection({ onOpenDonors }: { onOpenDonors: () => void }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const visibleDonors = DONORS.slice(-8);

  return (
    <section className="scroll-mt-20 mx-auto max-w-container-max overflow-hidden px-margin-mobile py-section-gap md:px-margin-desktop" id="love-wall">
      <div className=" flex flex-col gap-4 md:mb-12 md:flex-row md:items-center md:justify-between">
        <Reveal className="flex items-center gap-4 ">
          <Heart className="h-9 w-9 text-vibrant-orange" fill="currentColor" />
          <h2 className="font-headline-lg text-headline-lg text-primary ">Mural do Amor</h2>
        </Reveal>
        <button
          type="button"
          onClick={onOpenDonors}
          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-3 font-label-lg text-urgency-red shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 md:w-auto"
        >
          Ver todos os doadores
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        {visibleDonors.map((donor, index) => {
          const shouldHideOnMobile = index < 2;

          return (
          <Reveal key={`${donor.name}-${index}`} delay={index * 100}>
  <div
    className={`flex h-full flex-col justify-between rounded-3xl border border-surface-container-high bg-white p-6 transition-transform duration-300 hover:-translate-y-2 custom-shadow ${
      shouldHideOnMobile ? "hidden md:flex" : "flex"
    }`}
  >
    <div className="relative">
      <p
        className={`font-body-md italic text-on-surface-variant ${
          expandedIndex === index ? "whitespace-pre-line break-words" : "pr-1"
        }`}
        style={
          expandedIndex === index
            ? undefined
            : {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }
        }
      >
        "{donor.message}"
      </p>

      {expandedIndex !== index && (
        <button
          type="button"
          onClick={() => setExpandedIndex(index)}
          className="absolute bottom-0 right-0 bg-white pl-6 font-body-md text-sm font-semibold text-vibrant-orange transition-colors hover:text-urgency-red"
          style={{
            background:
              "linear-gradient(to right, transparent, white 40%)",
          }}
        >
          ver mais
        </button>
      )}

      {expandedIndex === index && (
        <button
          type="button"
          onClick={() => setExpandedIndex(null)}
          className="mt-1 text-sm font-semibold text-vibrant-orange transition-colors hover:text-urgency-red"
        >
          recolher
        </button>
      )}
    </div>

    <div className="mt-4 flex flex-col">
      <span className="font-label-lg text-base font-bold text-on-surface truncate">
        {donor.name}
      </span>
      <span className="text-sm text-on-surface-variant">
        Doou{" "}
        <span className="font-bold text-vibrant-orange">
          {donor.amount}
        </span>
      </span>
    </div>
  </div>
</Reveal>
          );
        })}
      </div>
      <Reveal delay={400}>
        <div className="mt-8 text-center">
          <button
            onClick={onOpenDonors}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-urgency-red px-8 py-4 font-label-lg text-on-primary shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95 sm:w-auto"
          >
            Ver todos os doadores
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}