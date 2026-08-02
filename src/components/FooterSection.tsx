"use client";

import { FOOTER_LINKS } from "./ninhoPageShared";

export function FooterSection() {
  return (
    <footer className="w-full bg-surface-container-high">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-base px-margin-mobile py-12 md:flex-row md:items-center md:px-margin-desktop">
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-2 font-fredoka font-medium text-2xl font-bold text-urgency-red">Campanha solidária</div>
          <p className="text-center font-label-md text-label-md text-on-surface-variant md:text-left">
            Site criado exclusivamente para a campanha de arrecadação de fundos para o tratamento do Ninho.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              className="font-label-md text-label-md text-on-surface-variant underline transition-colors duration-200 hover:text-vibrant-orange"
              href="#instagram"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}