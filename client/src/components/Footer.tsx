import { ArrowUpRight, Mail } from "lucide-react";
import footerLogo from "@/assets/images/synthya-brand-2026-horizontal-reversed.png";
import type { Language } from "@/lib/language";

export function Footer({ language = "ko" }: { language?: Language }) {
  const isEnglish = language === "en";

  return (
    <footer className="site-footer bg-[#07101f] text-white">
      <div className="site-shell py-12 md:py-16">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-12 md:flex-row">
          <div>
            <img
              src={footerLogo}
              alt="Synthya"
              className="footer-brand-lockup"
            />
            <p className="footer-description mt-5 max-w-md text-slate-300">
              {isEnglish
                ? "An AI design agent that understands engineering rules and operates CAD directly—starting with smoke-control and fire-protection design."
                : "규칙을 이해하고 CAD를 직접 조작하는 AI 설계 에이전트. 제연·소방 설계부터 Vibe CAD로."}
            </p>
          </div>
          <div className="footer-links grid grid-cols-2 gap-14">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-slate-500">EXPLORE</p>
              <a href="#product" className="text-slate-300 hover:text-white">Product</a>
              <a href="#technology" className="text-slate-300 hover:text-white">Technology</a>
              <a href="#vision" className="text-slate-300 hover:text-white">Vision</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-slate-500">CONTACT</p>
              <a href="mailto:business@synthya.ai" className="flex items-center gap-2 text-slate-300 hover:text-white">
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
              <a href="#contact" className="flex items-center gap-2 text-slate-300 hover:text-white">
                {isEnglish ? "Request a demo" : "데모 요청"} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-legal flex flex-col gap-3 pt-6 text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Synthya Inc. All rights reserved.</p>
          <p>{isEnglish ? "Synthya Inc. · South Korea" : "주식회사 신티아 · 대한민국"}</p>
        </div>
      </div>
    </footer>
  );
}
