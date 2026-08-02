"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./ninhoPageShared";
import about1 from "../assets/about/1.png";
import about2 from "../assets/about/2.mp4";
import about3 from "../assets/about/3.png";
import about4 from "../assets/about/4.png";
import about5 from "../assets/about/5.png";
import about6 from "../assets/about/6.png";
import about7 from "../assets/about/7.png";

type CarouselSlide =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "video";
      src: string;
      alt: string;
      poster?: string;
    };

export function JourneySection() {
  const slides = useMemo<CarouselSlide[]>(
    () => [
      {
        type: "image",
        src: about1,
        alt: "Imagem 1 da história do Ninho.",
      },
      {
        type: "video",
        src: about2,
        alt: "Vídeo 2 da história do Ninho.",
      },
      {
        type: "image",
        src: about3,
        alt: "Imagem 3 da história do Ninho.",
      },
      {
        type: "image",
        src: about4,
        alt: "Imagem 4 da história do Ninho.",
      },
      {
        type: "image",
        src: about5,
        alt: "Imagem 5 da história do Ninho.",
      },
      {
        type: "image",
        src: about6,
        alt: "Imagem 6 da história do Ninho.",
      },
      {
        type: "image",
        src: about7,
        alt: "Imagem 7 da história do Ninho.",
      },
    ],
    []
  );
  const [activeSlide, setActiveSlide] = useState(0);

  const previousSlide = () => setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  const nextSlide = () => setActiveSlide((current) => (current + 1) % slides.length);

  useEffect(() => {
    const currentSlide = slides[activeSlide];

    if (currentSlide.type === "video") {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [activeSlide, slides]);

  return (
    <section className="scroll-mt-10 bg-surface-container-lowest px-margin-mobile py-section-gap md:px-margin-desktop" id="about">
      <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-20 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <h2 className="mb-6 font-headline-lg text-headline-lg text-primary">A história de ninho</h2>
          <div className="space-y-4 font-body-lg text-body-lg text-on-surface-variant">
            <p>
              Ninho sempre perambulou pelas ruas de petrolina, quem passa aqui pela petrolina antiga com certeza 
              já o viu, ele é muito docil e companheiro. Mas recentemente estava com duas feridas, uma na lombar e outra na coxa e sem querer andar. 
            </p>
            <p>
              Conseguimos arrumar um lugar para ele ficar a noite e no dia seguinte levamos ao veterinário o qual afirmou ter sido 
              mordida de cachorro, ele ficou internado, teve que fazer uma tartarectomia e quando estava em observação viu-se que estava
              urinando com sangue, então ficou mais tempo em observação e graças a Deus seu quadro não foi cirurgico apenas medicação resolvia.
            </p>
            <p>
              Eu acredito que amar a Deus é cuidar das coisas que ele criou. Através do seu apoio, nós vamos conseguir bater a meta de arrecadação e 
              posteriormente ajudar muitos outros animais que estão em uma situação de vulnerabilidade. 
            </p>
          </div>
          
        </Reveal>

        <Reveal delay={150} className="relative order-1 md:order-2">
          <div className="custom-shadow relative overflow-hidden rounded-[40px] bg-white transition-transform duration-500">
            <div className="relative aspect-square w-full overflow-hidden">
              {slides.map((slide, index) => {
                const isActive = index === activeSlide;

                return (
                  <div
                    key={`${slide.type}-${slide.src}`}
                    className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "pointer-events-none opacity-0"}`}
                    aria-hidden={!isActive}
                  >
                    {slide.type === "image" ? (
                      <img className="h-full w-full object-cover" alt={slide.alt} src={slide.src} />
                    ) : (
                      <video
                        key={isActive ? `active-video-${index}` : `inactive-video-${index}`}
                        className="h-full w-full object-cover" 
                        playsInline
                        autoPlay
                        muted
                        preload="metadata"
                        poster={slide.poster}
                        aria-label={slide.alt}
                        onEnded={nextSlide}
                      >
                        <source src={slide.src} type="video/mp4" />
                        Seu navegador não suporta vídeo HTML5.
                      </video>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
              <button
                type="button"
                onClick={previousSlide}
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-urgency-red shadow-lg backdrop-blur transition-transform hover:scale-105"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-urgency-red shadow-lg backdrop-blur transition-transform hover:scale-105"
                aria-label="Próximo slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
          <div className="absolute -bottom-6 -left-6 hidden -rotate-3 transform rounded-3xl bg-vibrant-orange p-6 custom-shadow animate-float-slow md:block">
            <p className="font-bold italic text-white">"Adotar é um ato de amor."</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}