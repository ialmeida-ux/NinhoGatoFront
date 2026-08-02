"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Heart } from "lucide-react";

// 1. Criamos uma interface global para as doações reais que vêm do seu banco
export interface Doacao {
  nome: string;
  valor: string;
  mensagem: string;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// 2. Mantemos apenas as constantes reais e úteis
export const FOOTER_LINKS = ["Entre em Contato"];
export const INSTAGRAM_PROFILE = "https://www.instagram.com/ilca.ia/";
export const INSTAGRAM_EMBED = "https://www.instagram.com/reel/DbUQQCWOGM-/embed";
export const PDF_URL = "/NINHO.pdf";

// 3. O Componente de Animação (Reveal) continua intacto
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

// 4. Se você usar as bolhas flutuantes, elas agora mostram dados REAIS!
export function DonationBubbles({ doacoes }: { doacoes: Doacao[] }) {
  // Se não houver doações no banco ainda, não mostra nada
  if (!doacoes || doacoes.length === 0) return null;

  const [queue, setQueue] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prev) => {
        const next = (prev[prev.length - 1] + 1) % doacoes.length;
        return [...prev.slice(1), next];
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [doacoes.length]);

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
          {doacoes.map((donor, index) => {
            const queueIndex = queue.indexOf(index);
            const isVisible = queueIndex !== -1;
            
            // Tratamento para exibir mensagem amigável se vier vazia
            const mensagemExibicao = donor.mensagem ? `"${donor.mensagem}"` : "Apoiou a causa com muito amor!";

            return (
              <div
                key={`${donor.nome}-${index}`}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "my-1.5 max-h-50 scale-100 translate-y-0 opacity-100"
                    : "my-0 max-h-0 scale-95 translate-y-2 overflow-hidden opacity-0"
                }`}
              >
                <div className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
                  <div className="min-w-0 flex-1">
                    <p className="flex max-w-full items-baseline gap-1 text-sm">
                      <span className="min-w-0 truncate font-bold text-on-surface">{donor.nome}</span>
                      <span className="shrink-0 whitespace-nowrap font-bold text-on-surface">doou R$ {donor.valor}</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs italic text-on-surface-variant">{mensagemExibicao}</p>
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