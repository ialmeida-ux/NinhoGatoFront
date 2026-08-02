"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Heart } from "lucide-react";

export interface Donor {
  name: string;
  amount: string;
  message: string;
  bg: string;
  fg: string;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const BASE_DONORS: Donor[] = [
  { name: "Maria", amount: "R$ 50", message: "Força Ninho! Você é muito corajoso.", bg: "bg-soft-blue-accent", fg: "text-tertiary" },
  { name: "Ricardo souza maria de joao e pe de feijao", amount: "R$ 100", message: "Mal posso esperar para te ver saudável e correndo!", bg: "bg-surface-container-highest", fg: "text-primary" },
  { name: "Ana Luiza", amount: "R$ 200", message: "Enviando todo o amor de Portugal!", bg: "bg-secondary-fixed", fg: "text-secondary" },
  { name: "João", amount: "R$ 30", message: "Uma pequena ajuda para um grande coração.", bg: "bg-soft-blue-accent", fg: "text-tertiary" },
  { name: "Carla", amount: "R$ 75", message: "Ninho, você é um guerreiro!", bg: "bg-secondary-fixed", fg: "text-secondary" },
  { name: "Fernando", amount: "R$ 150", message: "Força e fé na recuperação!", bg: "bg-surface-container-highest", fg: "text-primary" },
];

export const DONORS: Donor[] = Array.from({ length: 3 }, () => BASE_DONORS.map((donor) => ({ ...donor }))).flat();
export const FOOTER_LINKS = ["Entre em Contato"];
export const PIX_KEY = "00020126580014BR.GOV.BCB.PIX0136ninho.haven.rescue.pix.key.random.12345";
export const INSTAGRAM_PROFILE = "https://www.instagram.com/reel/DbUQQCWOGM-/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==";
export const INSTAGRAM_EMBED = "https://www.instagram.com/reel/DbUQQCWOGM-/embed";
export const PDF_URL = "/transparencia.pdf";

export function donorInitial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function DonationBubbles() {
  const [queue, setQueue] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prev) => {
        const next = (prev[prev.length - 1] + 1) % DONORS.length;
        return [...prev.slice(1), next];
      });
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden" style={{ height: "290px" }}>
      <div
        className="absolute bottom-10"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
        }}
      >
        <div className="flex flex-col px-1">
          {DONORS.map((donor, index) => {
            const queueIndex = queue.indexOf(index);
            const isVisible = queueIndex !== -1;

            return (
              <div
                key={`${donor.name}-${index}`}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "my-1.5 max-h-50 scale-100 translate-y-0 opacity-100"
                    : "my-0 max-h-0 scale-95 translate-y-2 overflow-hidden opacity-0"
                }`}
              >
                <div className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
                  <div className="min-w-0 flex-1">
                    <p className="flex max-w-full items-baseline gap-1 text-sm">
                      <span className="min-w-0 truncate font-bold text-on-surface">{donor.name}</span>
                      <span className="shrink-0 whitespace-nowrap font-bold text-on-surface">doou {donor.amount}</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs italic text-on-surface-variant">"{donor.message}"</p>
                  </div>
                  <Heart className="h-5 w-5 shrink-0 text-urgency-red" fill="currentColor" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}