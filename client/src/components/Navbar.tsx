import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import brandLockup from "@/assets/images/synthya-brand-2026-horizontal.png";
import type { Language } from "@/lib/language";

const navLinksByLanguage = {
  ko: [
    { href: "#product", label: "Product" },
    { href: "#intelligence", label: "Implementation" },
    { href: "/ko/company", label: "Company" },
  ],
  en: [
    { href: "#product", label: "Product" },
    { href: "#intelligence", label: "Implementation" },
    { href: "/en/company", label: "Company" },
  ],
} satisfies Record<Language, Array<{ href: string; label: string }>>;

function Brand({ language }: { language: Language }) {
  return (
    <a
      href={language === "en" ? "/en/" : "/ko/"}
      className="block"
      aria-label={language === "en" ? "Synthya home" : "Synthya 홈"}
    >
      <img
        src={brandLockup}
        alt="Synthya"
        className="h-auto w-[11.5rem] object-contain sm:w-[13rem]"
      />
    </a>
  );
}

type NavbarProps = {
  language?: Language;
  onLanguageChange?: (language: Language) => void;
};

export function Navbar({ language = "ko", onLanguageChange = () => undefined }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const demoLabel = language === "en" ? "Request a demo" : "데모 요청";
  const navLinks = navLinksByLanguage[language];
  const isCompanyPage = window.location.pathname.includes("/company");
  const homePath = language === "en" ? "/en/" : "/ko/";

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const readingLine = 150;
      let current = "";

      for (const link of navLinks) {
        if (!link.href.startsWith("#")) continue;
        const section = document.querySelector<HTMLElement>(link.href);
        if (section && section.getBoundingClientRect().top <= readingLine) {
          current = link.href;
        }
      }

      setActiveSection((previous) => previous === current ? previous : current);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [navLinks]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-[#f8f9fb]/90 backdrop-blur-xl">
      <nav className="site-shell flex h-[70px] items-center justify-between">
        <Brand language={language} />

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href.startsWith("#") && isCompanyPage ? `${homePath}${link.href}` : link.href}
              className={`desktop-nav-link ${(isCompanyPage && link.label === "Company") || activeSection === link.href ? "active" : ""}`}
              aria-current={(isCompanyPage && link.label === "Company") || activeSection === link.href ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="language-switch" aria-label={language === "en" ? "Select language" : "언어 선택"}>
            {(["ko", "en"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={language === option ? "active" : ""}
                onClick={() => onLanguageChange(option)}
                aria-pressed={language === option}
              >
                {option === "ko" ? "KR" : "EN"}
              </button>
            ))}
          </div>
          <a href="#contact" className="flex items-center gap-2 rounded-full bg-[#0b1220] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-600">
            {demoLabel} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={
            language === "en"
              ? open
                ? "Close menu"
                : "Open menu"
              : open
                ? "메뉴 닫기"
                : "메뉴 열기"
          }
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 lg:hidden">
          <div className="flex flex-col">
            <div className="language-switch mb-3 self-start" aria-label={language === "en" ? "Select language" : "언어 선택"}>
              {(["ko", "en"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={language === option ? "active" : ""}
                  onClick={() => {
                    onLanguageChange(option);
                    setOpen(false);
                  }}
                  aria-pressed={language === option}
                >
                  {option === "ko" ? "KR" : "EN"}
                </button>
              ))}
            </div>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href.startsWith("#") && isCompanyPage ? `${homePath}${link.href}` : link.href} className="border-b border-slate-100 py-4 text-sm font-medium" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="button-primary mt-5 justify-center" onClick={() => setOpen(false)}>
              {demoLabel} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
