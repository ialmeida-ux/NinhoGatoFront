"use client";

import { Camera, Phone } from "lucide-react";
import { INSTAGRAM_EMBED, INSTAGRAM_PROFILE, Reveal } from "./ninhoPageShared";

export function InstagramSection() {
  return (
    <section className="scroll-mt-20 bg-surface-container-lowest px-margin-mobile py-section-gap md:px-margin-desktop" id="instagram">
      <Reveal className="mx-auto flex max-w-container-max flex-col items-center text-center">
        <div className="mb-10 flex max-w-2xl flex-col items-center text-center">
          <h2 className="mb-4 font-headline-lg text-headline-lg text-primary">Quem está por trás?</h2>
          <p className="mx-auto max-w-2xl text-body-lg text-on-surface-variant">
            Eu compartilho as atualizações sobre o quadro de ninho frequentemente, os bastidores e os avanços da recuperação nas minhas redes. Veja o
            este reel e visite meu perfil para mais. Caso precise falar comigo deixei meu telefone aqui também
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-on-surface-variant sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <a
                className="inline-flex items-center gap-2 transition-colors hover:text-vibrant-orange"
                href="tel:+5587988313831"
              >
                <Phone className="h-4 w-4" />
                <span>(87) 98831-3831</span>
              </a>
              <a
                className="inline-flex items-center gap-2 transition-colors hover:text-vibrant-orange"
                href="https://www.instagram.com/ilca.ia/"
                target="_blank"
                rel="noreferrer"
              >
                <Camera className="h-4 w-4" />
                <span>@ilca.ia</span>
              </a>
            </div>
        </div>

        <div className="flex w-full justify-center">
          <div className="w-full max-w-100 overflow-hidden rounded-4xl border border-outline-variant bg-white custom-shadow">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={INSTAGRAM_PROFILE}
              data-instgrm-version="14"
              style={{ background: "#FFF", border: 0, margin: 0, maxWidth: "100%", padding: 0 }}
            >
              {/* <div style={{ padding: 0 }}>
                <iframe
                  title="Instagram reel"
                  src={INSTAGRAM_EMBED}
                  className="w-full"
                  style={{ height: "560px", border: 0, margin: 0, padding: 0, display: "block", overflow: "hidden" }}
                  scrolling="no"
                  allowFullScreen
                  loading="lazy"
                />
              </div> */}
            </blockquote>
          </div>
        </div>
      </Reveal>
    </section>
  );
}