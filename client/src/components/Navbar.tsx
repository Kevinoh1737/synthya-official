import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/images/synthya-logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/perspective", label: "우리의 관점" },
    { href: "/methodology", label: "도입 방법" },
    { href: "/technology", label: "기술/보유역량" },
    { href: "/pricing", label: "가격" },
    { href: "/poc", label: "적용 상담" },
    { href: "/company", label: "회사 소개" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex-shrink-0">
          <img src={logoImage} alt="Synthya" className="h-10 w-auto cursor-pointer" />
        </Link>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:gap-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={cn(
                "text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap px-4 py-2 rounded-full",
                location === link.href 
                  ? "text-primary font-bold bg-primary/10" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Action Button - Right Aligned */}
        <div className="hidden md:flex md:flex-shrink-0">
          <Link href="/poc#poc-form">
            <Button variant="default" size="sm" className="rounded-full px-6 font-semibold shadow-none">
              우리 업무에 적용 상담하기
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border/40 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span 
                  className={cn(
                    "text-sm font-medium cursor-pointer block px-4 py-2 rounded-lg transition-all duration-200",
                    location === link.href 
                      ? "text-primary font-bold bg-primary/10" 
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/poc#poc-form">
              <Button className="w-full rounded-full" onClick={() => setIsOpen(false)}>
                우리 업무에 적용 상담하기
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
