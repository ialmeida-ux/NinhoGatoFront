"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { Reveal } from "./ninhoPageShared";

interface DonationForm {
  name: string;
  amount: string;
  anonymous: boolean;
  message: string;
}

export function DonationFormSection() {
  const [form, setForm] = useState<DonationForm>({ name: "", amount: "", anonymous: false, message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Novos estados para guardar o QR Code gerado pelo backend
  const [qrCodeImg, setQrCodeImg] = useState<string>('');
  const [qrCodeText, setQrCodeText] = useState<string>('');

  // Puxa a URL do backend configurada no seu .env
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange =
    (field: keyof DonationForm) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleTextAreaChange =
    (field: keyof Pick<DonationForm, "message">) =>
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ 
      ...current, 
      anonymous: event.target.checked,
      name: event.target.checked ? "" : current.name // Limpa o nome se marcar anônimo
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. Trava de segurança no Frontend
    if (!form.name.trim() && !form.anonymous) {
      alert("Por favor, preencha o seu nome ou marque a caixa 'Prefiro permanecer anônimo'.");
      return;
    }

    // Validação extra para garantir que o valor seja numérico e positivo
    const valorFloat = parseFloat(form.amount.replace(',', '.'));
    if (!valorFloat || valorFloat <= 0) {
      alert("Por favor, insira um valor válido para doação.");
      return;
    }

    setSubmitting(true);

    try {
      // 2. Dispara a requisição para o Render
      const resposta = await fetch(`${API_URL}/gerar-pix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valor: form.amount.replace(',', '.'), 
          nome: form.name,
          mensagem: form.message,
          anonimo: form.anonymous
        })
      });

      if (!resposta.ok) {
        throw new Error("Falha ao gerar o Pix.");
      }

      const dadosPix = await resposta.json();

      // 3. Atualiza os estados com os dados reais do banco
      setQrCodeImg(dadosPix.qrcode_image);
      setQrCodeText(dadosPix.qrcode_text);
      setSubmitted(true);

    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao conectar com o banco. O servidor pode estar acordando, tente novamente em 30 segundos.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async () => {
    try {
      // Copia o Pix Copia e Cola real do banco em vez da chave estática
      await navigator.clipboard.writeText(qrCodeText);
    } catch {
      // clipboard indisponível, ignora
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: "", amount: "", anonymous: false, message: "" });
    setQrCodeImg('');
    setQrCodeText('');
  };

  return (
    <section className="scroll-mt-20 mx-auto max-w-container-max px-margin-mobile py-section-gap md:px-margin-desktop" id="donate-form">
      <div className="mx-auto max-w-2xl">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-2 font-headline-lg text-headline-lg text-primary">Envie seu Amor</h2>
          <p className="font-body-md text-on-surface-variant">Preencha o formulário abaixo para me ajudar na recuperação do Ninho.</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative overflow-hidden rounded-4xl bg-white p-8 custom-shadow md:p-12">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className={`space-y-6 transition-opacity duration-300 ${submitting ? "pointer-events-none opacity-0" : "opacity-100"}`}
              >
                <div className="space-y-2">
                  <label className="px-1 text-label-lg font-label-lg text-on-surface-variant">Nome do Doador</label>
                  <input
                    className="w-full rounded-2xl border-transparent bg-surface-container-low p-4 transition-all duration-200 placeholder:text-outline focus:border-urgency-red focus:ring-2 focus:ring-urgency-red/20 disabled:opacity-50"
                    placeholder="Seu nome"
                    required={!form.anonymous}
                    disabled={form.anonymous}
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                  />
                </div>
                <label className="flex items-center gap-3 rounded-2xl px-2 text-sm text-on-surface-variant cursor-pointer">
                  <input
                    checked={form.anonymous}
                    className="h-4 w-4 rounded border-outline-variant text-urgency-red focus:ring-urgency-red/20 cursor-pointer"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <span>Prefiro permanecer anônimo</span>
                </label>
                <div className="space-y-2">
                  <label className="px-1 text-label-lg font-label-lg text-on-surface-variant">Valor da Doação (R$)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">R$</span>
                    <input
                      className="w-full rounded-2xl border-transparent bg-surface-container-low p-4 pl-12 transition-all duration-200 placeholder:text-outline focus:border-urgency-red focus:ring-2 focus:ring-urgency-red/20"
                      placeholder="0.00"
                      required
                      type="number"
                      step="0.01"
                      value={form.amount}
                      onChange={handleChange("amount")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="px-1 text-label-lg font-label-lg text-on-surface-variant">Mensagem (Opcional)</label>
                  <textarea
                    className="min-h-40 w-full rounded-2xl border-transparent bg-surface-container-low p-4 transition-all duration-200 placeholder:text-outline focus:border-urgency-red focus:ring-2 focus:ring-urgency-red/20"
                    placeholder="Deixe uma mensagem de carinho para o Ninho ... "
                    maxLength={500}
                    value={form.message}
                    onChange={handleTextAreaChange("message")}
                  />
                  <div className="text-right text-xs text-on-surface-variant">{form.message.length}/500</div>
                </div>
                <div className="pt-4">
                  <button
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-urgency-red py-5 px-2 font-bold text-base md:text-xl text-on-primary shadow-lg shadow-urgency-red/20 transition-colors duration-200 hover:bg-primary active:scale-[0.98]"
                    type="submit"
                  >
                    Gerar Chave de Doação
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </div>

              </form>
            ) : (
              <div className="py-4 text-center">
                <div className="mb-8 flex flex-col items-center rounded-3xl bg-surface-container-low p-6">
                  <p className="mb-4 text-label-lg font-label-lg uppercase tracking-widest text-primary">Código QR do PIX</p>
                  
                  {/* Container do QR Code Dinâmico */}
                  <div className="mb-6 flex items-center justify-center rounded-xl border border-outline-variant bg-white p-2 shadow-inner">
                    {qrCodeImg ? (
                      <img src={qrCodeImg} alt="QR Code Pix" className="h-48 w-48 object-contain" />
                    ) : (
                      <div className="h-48 w-48 flex items-center justify-center text-outline-variant animate-pulse">Carregando...</div>
                    )}
                  </div>
                  
                  <div className="w-full max-w-xs space-y-4">
                    <div className="break-all rounded-xl border border-outline-variant bg-white p-4 font-mono text-xs text-on-surface-variant max-h-32 overflow-y-auto">
                      {qrCodeText}
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-label-lg text-white transition-all duration-200 hover:scale-[1.02] ${
                        copied ? "bg-tertiary" : "bg-vibrant-orange"
                      }`}
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      {copied ? "Copiado!" : "Copiar Chave"}
                    </button>
                  </div>
                </div>
                <p className="font-body-md text-on-surface-variant">
                  Muito obrigada pela sua generosidade! Seu apoio muda tudo para o Ninho e para mim.
                </p>
                <button onClick={resetForm} className="mt-6 font-bold text-urgency-red underline">
                  Voltar ao Início
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}