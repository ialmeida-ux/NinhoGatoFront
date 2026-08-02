"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

// 1. Criamos a interface para o formato exato que vem do nosso backend
interface Doacao {
  nome: string;
  valor: string;
  mensagem: string;
}

export function AllDonorsModal({ donors, onClose }: { donors: Doacao[]; onClose: () => void }) {
  
  // 2. O reduce agora lê "donor.valor"
  const total = donors.reduce((accumulator, donor) => {
    const amount = Number.parseFloat(donor.valor.replace(/[R$\s]/g, "").replace(",", "."));
    return accumulator + (Number.isNaN(amount) ? 0 : amount);
  }, 0);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="custom-scrollbar relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-4xl border border-outline-variant bg-warm-cream-bg shadow-2xl animate-scale-in"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary">Todos os Doadores</h2>
              <p className="mt-1 font-body-md text-on-surface-variant">
                {donors.length} {donors.length === 1 ? "pessoa já contribuiu" : "pessoas já contribuíram"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-urgency-red shadow transition-transform hover:scale-105"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {/* 3. Mapeando com as propriedades corretas do banco */}
            {donors.map((donor, index) => {
              const mensagemExibicao = donor.mensagem ? `"${donor.mensagem}"` : "Apoiou a causa com muito amor!";

              return (
                <div key={`${donor.nome}-${index}`} className="rounded-2xl border border-surface-container-high bg-white p-5 shadow-sm">
                  <p className="flex flex-wrap items-baseline gap-1 font-bold text-on-surface">
                    <span>{donor.nome}</span>
                    <span className="shrink-0 text-vibrant-orange">doou R$ {donor.valor}</span>
                  </p>
                  <p className="mt-1 whitespace-pre-line break-words text-sm italic text-on-surface-variant">
                    {mensagemExibicao}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 border-t border-outline-variant pt-4 text-center font-label-md text-on-surface-variant">
            Total arrecadado:{" "}
            <span className="font-bold text-primary">
              {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}