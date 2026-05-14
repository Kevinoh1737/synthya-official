import { Link } from "wouter";
import { Mail } from "lucide-react";

export function Footer() {
  const serviceLinks = [
    { href: "/perspective", label: "우리의 관점" },
    { href: "/methodology", label: "도입 방법" },
    { href: "/technology", label: "기술/보유역량" },
    { href: "/pricing", label: "가격" },
  ];

  const companyLinks = [
    { href: "/company", label: "회사 소개" },
    { href: "/poc", label: "적용 상담" },
  ];

  return (
    <footer className="border-t border-border/40 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <div className="py-12 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-8 md:gap-16">
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
                </span>
                <span className="font-bold text-primary tracking-tight">SYNTHYA</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              혁신적인 AI 기술로 기업에 최적화된 인재를 연결하는<br/>
              AI 직원 채용 솔루션, 신시아입니다.
            </p>
            <a 
              href="mailto:business@synthya.ai" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
            >
              <Mail className="h-4 w-4" />
              business@synthya.ai
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:contents gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">Service</h4>
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">Company</h4>
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/40 py-6">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © 2026 Synthya Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
