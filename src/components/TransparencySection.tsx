"use client";

import { FileText, ShieldCheck } from "lucide-react";
import { PDF_URL, Reveal } from "./ninhoPageShared";

export function TransparencySection() {
  return (
    <section className="scroll-mt-20 bg-warm-cream-bg px-margin-mobile py-section-gap md:px-margin-desktop" id="transparency">
      <Reveal className="max-w-container-max mx-auto">
        <div className="custom-shadow flex flex-col items-stretch gap-12 rounded-[40px] border border-surface-container-high bg-white p-8 md:flex-row md:p-12">
          <div className="flex-1 flex flex-col justify-center text-left">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-urgency-red" />
              <h2 className=" font-headline-lg text-headline-lg text-primary">Prestação de Contas</h2>
            </div>
            <p className="mb-6 text-body-lg text-on-surface-variant">
              Transparência é o meu compromisso com você. Acompanhe todos os gastos médicos e laudos veterinários do
              Ninho. Cada centavo que eu recebo é direcionado exclusivamente para a saúde dele.
            </p>
            <div className="mb-6 w-full rounded-3xl border border-dashed border-outline bg-surface-container-low p-8 md:w-2/3">
              <div className="space-y-4">
                
                <div className="flex justify-between border-b border-outline-variant pb-2">
                  <span className="text-on-surface-variant">Gasto Vet.:</span>
                  <span className="font-bold text-urgency-red">R$ 1.635</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant pb-2">
                  <span className="text-on-surface-variant">Medicação:</span>
                  <span className="font-bold text-primary">R$ 370</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Saldo Atual:</span>
                  <span className="font-bold text-vibrant-orange">R$ 0</span>
                </div>
              </div>
            </div>
            <a
              className="inline-flex w-fit items-center gap-2 rounded-2xl border border-outline-variant bg-surface-container px-8 py-4 font-bold text-primary transition-colors duration-200 hover:bg-surface-container-highest"
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
            >
              <FileText className="h-5 w-5" />
              Abrir PDF em outra aba
            </a>
          </div>

          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="mb-3 flex items-center gap-2 text-on-surface-variant">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Laudo Veterinário e receita</span>
            </div>
            <object
              data={PDF_URL}
              type="application/pdf"
              className="h-100 w-full rounded-3xl border border-outline-variant bg-surface-container-low shadow-lg md:h-140"
            >
              <div className="flex h-full flex-col items-center justify-center p-6 text-center text-on-surface-variant">
                <FileText className="mb-4 h-12 w-12 text-outline" />
                <p className="mb-4 font-body-md">Não consegui exibir o PDF no seu navegador.</p>
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-urgency-red px-6 py-3 font-bold text-on-primary"
                >
                  <FileText className="h-4 w-4" />
                  Abrir PDF
                </a>
              </div>
            </object>
          </div>
        </div>
      </Reveal>
    </section>
  );
}