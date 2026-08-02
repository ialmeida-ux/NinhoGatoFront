"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./ninhoPageShared";
import bg from "../assets/bg.png";
import logo from "../assets/logo.png";

export function HeroSection() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => setProgress(70), 400);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-x-hidden pb-8 pt-20" id="home">
      <div className="absolute inset-0 z-0">
        <img 
  alt="" 
  className="h-full w-full object-cover object-[80%_center] md:object-[center_20%]" 
  src={bg} 
  />
        <div className="hero-overlay absolute inset-0 z-10" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col items-start text-left">
            <span className="mb-6 inline-block rounded-full bg-vibrant-orange px-6 py-2 text-label-md font-label-md text-white shadow-lg animate-bounce">
              Meta Atual: Quitar o veterinário
            </span>
            <Reveal className="mb-6 font-headline-lg text-headline-lg text-primary md:mb-8 lg:mb-10">
              <img src={logo} alt="" />
            </Reveal>
            <Reveal delay={100}>
              <p className="font-body-lg mb-10 max-w-xl text-body-lg font-medium text-on-surface-variant">
                Eu encontrei Ninho debaixo de uma árvore com dor e mancando, socorremos ele as pressas. Agora precisamos quitar sua conta no veterinário.
              </p>
            </Reveal>
            <Reveal delay={200} className="mb-12 w-full max-w-md lg:max-w-xl">
              <div className="flex w-full flex-col gap-4 sm:flex-row lg:gap-5">
                <a
                  className="flex-1 rounded-2xl bg-urgency-red px-12 py-5 text-center font-headline-md text-headline-md text-on-primary shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95 lg:whitespace-nowrap lg:px-8 lg:py-4"
                  href="#donate-form"
                >
                  Doar Agora
                </a>
                <a
                  className="flex-1 rounded-2xl border-2 border-urgency-red bg-white/80 px-12 py-5 text-center font-headline-md text-headline-md text-urgency-red backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95 lg:whitespace-nowrap lg:px-8 lg:py-4"
                  href="#about"
                >
                  Conhecer História
                </a>
              </div>
            </Reveal>

            <Reveal delay={300} className="w-full max-w-md lg:max-w-xl">
              <div className="w-full rounded-3xl border border-white/50 bg-white/90 p-5 shadow-2xl backdrop-blur-md md:p-6">
                <div className="mb-3 flex items-end justify-between">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary">Progresso da Campanha</h3>
                    <p className="text-xs font-body-md text-on-surface-variant">Valor total arrecadado até o momento</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-headline-md text-vibrant-orange">{progress}%</span>
                  </div>
                </div>
                <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-surface-variant/50">
                  <div
                    className="h-full rounded-full bg-vibrant-orange transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-label-md text-on-surface">
                  <span className="font-bold">R$ 3.500 arrecadados</span>
                  <span className="text-on-surface-variant">Meta de R$ 5.000</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}