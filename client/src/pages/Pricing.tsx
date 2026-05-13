import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

import type { Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <Section className="pt-32 pb-20 text-center gradient-hero relative overflow-hidden hero-shadow-bottom z-10" divider={false}>
          <div className="absolute inset-0 bg-dots opacity-40" />
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary leading-tight">
              AI 직원 채용 비용,<br/>생각보다 훨씬 가볍습니다
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              수억 원 프로젝트 아닙니다. 장기 계약 아닙니다.<br/>
              그냥, 직원 한 명 월급 정도만 생각하시면 됩니다.
            </p>
          </motion.div>
        </Section>

        {/* Comparison */}
        <Section className="bg-white relative z-20 section-after-hero">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-muted-foreground">보통 AI 프로젝트는...</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <X className="h-5 w-5 text-red-400" /> 개발비 수천 ~ 수억 원
                </li>
                <li className="flex items-center gap-3">
                  <X className="h-5 w-5 text-red-400" /> 데이터 연동 비용 별도
                </li>
                <li className="flex items-center gap-3">
                  <X className="h-5 w-5 text-red-400" /> 유지보수 별도
                </li>
                <li className="flex items-center gap-3">
                  <X className="h-5 w-5 text-red-400" /> 기간 6개월 ~ 1년
                </li>
              </ul>
              <p className="mt-6 text-lg font-medium text-red-500/80">
                "대표님 입장에서는 솔직히 도박이죠."
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">우리는 정반대입니다</h2>
              <div className="bg-white p-8 rounded-2xl border border-primary/30 shadow-xl shadow-primary/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="text-center mb-8">
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">AI 전담 사원 채용 비용</h3>
                  <div className="text-4xl font-bold text-primary">월 50만원<span className="text-2xl font-medium">부터</span></div>
                  <p className="text-sm text-muted-foreground mt-2">업무 범위에 따라 맞춤 견적을 드립니다</p>
                </div>
                
                <div className="space-y-4 border-t border-border pt-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">개발비</span>
                    <span className="font-bold text-primary">0원</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">데이터 연동</span>
                    <span className="font-bold text-primary">0원</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">초기 세팅</span>
                    <span className="font-bold text-primary">0원</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">무료 체험</span>
                    <span className="font-bold text-primary">0원</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-border pt-6 mt-6">
                  {["매월 운영유지비 포함", "업데이트 비용 포함", "AI API 사용료 포함", "일반적 사용 인원 포함", "일반적 사용량 포함"].map((item) => (
                    <div key={item} className="flex items-center gap-3" data-testid={`text-pricing-included-${item}`}>
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="font-medium text-primary">{item}</span>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground mt-2 pl-8">대부분의 중소기업 환경에서 추가 비용 없이 사용 가능합니다.</p>
                </div>

                <div className="mt-8 bg-secondary/50 p-4 rounded-lg text-center text-sm">
                  처음 비용? 없습니다. 계약 부담? 없습니다.<br/>
                  써보고, 효과 있으면 계속 쓰시면 됩니다.
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Why Cheap */}
        <Section className="bg-secondary/20">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">그런데 왜 이렇게 싸게 가능할까요?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI 덕분에 개발 방식 자체가 완전히 바뀌었습니다.<br/>
              우리는 빠르게 만들고, 작게 시작하고, 필요한 만큼만 확장합니다.<br/>
              그래서 큰 개발비를 받을 이유가 없습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 text-center">
             {["장기 계약 없음", "언제든 중단 가능", "무료 체험 제공", "효과 없으면 0원"].map((item) => (
               <div key={item} className="p-6 bg-white border border-border rounded-xl shadow-sm card-hover">
                 <div className="w-12 h-12 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
                   <Check className="h-6 w-6 text-green-500" />
                 </div>
                 <span className="font-bold text-primary">{item}</span>
               </div>
             ))}
          </div>
        </Section>

        {/* CTA */}
        <Section className="text-center relative overflow-hidden py-32 md:py-48">
          <div className="absolute inset-0 bg-primary z-0" />
          <div className="absolute inset-0 bg-dots opacity-10 z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 z-0" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
          <div className="mx-auto max-w-4xl relative z-10 px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Badge variant="outline" className="mb-8 rounded-full border-white/20 bg-white/10 text-white px-4 py-1 text-sm backdrop-blur-sm">Next Step</Badge>
              <h2 className="mb-8 text-4xl font-bold md:text-6xl text-white leading-tight">말로 설명하는 것보다<br/><span className="text-accent">직접 써보는 게 빠릅니다</span></h2>
              <p className="mb-12 text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto">비용 걱정 없이 2주간 무료로 테스트해보세요.<br/><span className="text-white font-semibold">효과가 없으면 0원입니다.</span></p>
              <div className="flex flex-col gap-4 justify-center items-center">
                <Button size="lg" className="h-16 rounded-full px-12 text-xl font-bold bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1" asChild>
                  <a href="/poc#poc-form">우리 업무에 적용 상담하기</a>
                </Button>
                <div className="text-white/60 text-sm font-medium">
                  * 도입 결정 전까지 비용이 전혀 발생하지 않습니다.
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-0" />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
