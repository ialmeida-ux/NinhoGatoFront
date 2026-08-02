"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function NavbarSection() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "#home" },
    { label: "Mural", href: "#love-wall" },
    { label: "Sobre", href: "#about" },
    { label: "Transparência", href: "#transparency" },
    { label: "Instagram", href: "#instagram" },
    { label: "Doar", href: "#donate-form" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 h-20 w-full transition-all duration-300 ${
          scrolled ? "bg-white/70 shadow-lg backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
          <div className="font-fredoka font-medium text-2xl font-bold text-urgency-red">Campanha solidária</div>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="font-body-md text-body-md font-bold text-on-surface-variant transition-colors duration-200 hover:text-vibrant-orange"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              className="hidden rounded-full bg-urgency-red px-6 py-3 font-label-lg text-label-lg text-on-primary shadow-md transition-all duration-200 hover:scale-105 active:scale-95 md:inline-flex"
              href="#donate-form"
            >
              Ajudar Agora
            </a>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-urgency-red shadow-md backdrop-blur md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <div className="fixed inset-0 z-60 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute right-0 top-0 flex h-full w-72 max-w-[80%] flex-col bg-warm-cream-bg shadow-2xl animate-slide-in-right">
            <div className="flex h-20 items-center justify-between border-b border-outline-variant px-6">
              <span className="font-headline-md text-headline-md font-bold text-urgency-red">Menu</span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-urgency-red shadow"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-xl px-4 py-3 font-bold text-on-surface transition-colors duration-200 hover:bg-white hover:text-vibrant-orange"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto p-6">
              <a
                href="#donate-form"
                onClick={() => setSidebarOpen(false)}
                className="block w-full rounded-full bg-urgency-red px-6 py-4 text-center font-label-lg text-on-primary shadow-lg"
              >
                Ajudar Agora
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}