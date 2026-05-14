import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Network, User, Zap, Database, Eye, X } from "lucide-react";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import omniPreview from "@assets/Omni_AI_sample_1770359028257.png";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Methodology() {
  const [omniImageOpen, setOmniImageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <Section className="pt-32 pb-20 gradient-hero relative overflow-hidden hero-shadow-bottom z-10" divider={false}>
          <div className="absolute inset-0 bg-dots opacity-40" />
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary leading-tight">
              AI 도입,<br/>거창하게 시작하지 않아도 됩니다
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              대부분의 회사는 아주 작은 변화 하나로 시작합니다.<br/>
              당신 회사에 맞는 방법을 선택하세요.
            </p>
          </motion.div>
        </Section>

        {/* Section 1: Empathy */}
        <Section className="bg-white relative z-20 section-after-hero">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">"우리 같은 회사도 가능할까요?"</h2>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white rounded-lg border border-border/50 shadow-sm text-muted-foreground italic">
                  "우리는 IT팀도 없고..."
                </div>
                <div className="p-4 bg-white rounded-lg border border-border/50 shadow-sm text-muted-foreground italic">
                  "데이터도 여기저기 흩어져 있고..."
                </div>
                <div className="p-4 bg-white rounded-lg border border-border/50 shadow-sm text-muted-foreground italic">
                  "대기업처럼 SAP 같은 것도 없는데..."
                </div>
              </div>
              <p className="text-lg text-primary font-medium">
                괜찮습니다. 오히려 그래서 더 쉽습니다.
              </p>
              <p className="text-muted-foreground mt-2">
                AI는 거대한 회사보다 가볍게 움직이는 회사에서<br className="hidden md:block" /> 훨씬 빠르게 효과가 납니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-border/50 shadow-lg shadow-primary/5 card-hover">
              <h3 className="text-xl font-bold mb-6 text-primary">AI 도입 방법은 크게 두 가지입니다</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit">
                    <Network className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Track 1. 전사 연결형 (Omni AI)</h4>
                    <p className="text-sm text-muted-foreground mt-1">회사 전체 데이터를 하나로 연결해 AI가 통합 분석</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-accent/10 p-2 rounded-lg h-fit">
                    <User className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent flex items-center gap-1.5">
                      Track 2. AI 전담 사원 
                      <Badge className="bg-accent text-white hover:bg-accent border-none text-[10px] px-2 py-0 h-5 animate-pulse">RECOMMENDED</Badge>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">작은 업무 하나를 AI 직원에게 맡기고 바로 결과 확인</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Track 1 Detail */}
        <Section className="bg-secondary/20">
          <div className="mb-12">
            <Badge className="mb-4" variant="outline">Track 1</Badge>
            <h2 className="text-3xl font-bold mb-4">회사 전체를 하나의 AI로 만드는 방식</h2>
            <p className="text-lg font-medium text-primary mb-2">Omni AI</p>
            <div className="space-y-3 text-lg text-muted-foreground max-w-2xl">
              <p>
                ERP, NAS, 엑셀, 내부 문서를 모두 연결해<br/>
                AI가 회사 전체 데이터를 통합 분석합니다.
              </p>
              <p>
                부서별로 나뉘어 있던 정보를<br/>
                하나의 시스템에서 보고, 판단하고, 실행합니다.
              </p>
              <p>전사 단위 자동화를 구축하는 방식입니다.</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold text-primary mb-6">이런 회사에 적합</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-hover border-border/60">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">데이터가 흩어져 있는 회사</h3>
                  <p className="text-sm text-muted-foreground">부서가 많고 데이터가 흩어져 있는 경우</p>
                </CardContent>
              </Card>
              <Card className="card-hover border-border/60">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">시스템이 복잡한 회사</h3>
                  <p className="text-sm text-muted-foreground">ERP/문서/파일이 복잡하게 쌓여 있는 경우</p>
                </CardContent>
              </Card>
              <Card className="card-hover border-border/60">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Network className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">전사 자동화 목표</h3>
                  <p className="text-sm text-muted-foreground">회사 전체를 장기적으로 자동화하고 싶은 경우</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-primary mb-6">핵심 특징</h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
              <div className="flex items-center gap-3 bg-white rounded-lg border border-border/50 p-4">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium">데이터 자동 연동</span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg border border-border/50 p-4">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium">기존 시스템 그대로 사용</span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg border border-border/50 p-4">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium">전사 리포트/대시보드 제공</span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg border border-border/50 p-4">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium">실제 운영 화면 제공</span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="gap-2 rounded-xl"
            onClick={() => setOmniImageOpen(true)}
            data-testid="button-methodology-omni-preview"
          >
            <Eye className="w-4 h-4" /> 실제 화면 미리보기
          </Button>

          {omniImageOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer animate-in fade-in duration-200"
              onClick={() => setOmniImageOpen(false)}
              data-testid="overlay-methodology-omni-preview"
            >
              <div className="relative max-w-5xl w-[90vw] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setOmniImageOpen(false)}
                  className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
                  data-testid="button-methodology-omni-close"
                >
                  닫기 <X className="w-4 h-4" />
                </button>
                <img
                  src={omniPreview}
                  alt="Omni AI 실제 화면 미리보기"
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
            </div>
          )}
        </Section>

        {/* Track 2 Detail */}
        <Section className="bg-white relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none">Track 2</Badge>
                <Badge variant="outline" className="border-accent text-accent text-[10px] px-2 py-0 h-5 animate-pulse">추천</Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">AI 전담 사원 한 명부터 시작</h2>
              <p className="text-lg font-medium text-primary mb-4">AI Staff</p>
              <div className="space-y-3 text-lg text-muted-foreground mb-8 leading-relaxed">
                <p>
                  시스템을 바꾸지 않습니다.<br/>
                  복잡한 구축도 필요 없습니다.
                </p>
                <p>
                  작은 업무 하나를 AI 직원에게 맡기고<br/>
                  며칠 안에 결과를 확인합니다.
                </p>
                <p>도입 결정 전 무료 체험이 가능한 방식입니다.</p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-primary mb-4">이런 회사에 적합</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-accent" /> AI를 처음 도입해보는 경우</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-accent" /> 빠르게 효과를 확인하고 싶은 경우</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-accent" /> 특정 업무부터 자동화하고 싶은 경우</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold text-primary mb-4">예시 업무</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["견적서 자동 생성", "CS 답변 처리", "발주/정산 관리", "보고서 작성"].map((task) => (
                    <div key={task} className="bg-accent/5 border border-accent/20 p-4 rounded-lg">
                      <User className="h-5 w-5 mb-2 text-accent" />
                      <span className="font-medium text-primary">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-secondary/30 p-8 rounded-2xl border border-border/50">
                <h3 className="text-xl font-bold mb-6 text-primary">핵심 특징</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <p className="font-medium text-primary">2주 안에 결과 확인</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <p className="font-medium text-primary">개발비 0원</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <p className="font-medium text-primary">데이터 마이그레이션 무료</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <p className="font-medium text-primary">부담 없이 테스트 가능</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <p className="font-medium text-primary">무료 체험 후 도입 결정</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="text-center relative overflow-hidden py-32 md:py-48">
          <div className="absolute inset-0 bg-primary z-0" />
          <div className="absolute inset-0 bg-dots opacity-10 z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 z-0" />
          
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
          
          <div className="mx-auto max-w-4xl relative z-10 px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Badge variant="outline" className="mb-8 rounded-full border-white/20 bg-white/10 text-white px-4 py-1 text-sm backdrop-blur-sm">
                Next Step
              </Badge>
              <h2 className="mb-8 text-4xl font-bold md:text-6xl text-white leading-tight">
                고민보다,<br/>
                <span className="text-accent">2주 테스트가 빠릅니다</span>
              </h2>
              <p className="mb-12 text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                설명은 충분합니다. 이제 직접 써보세요.<br/>
                <span className="text-white font-semibold">지금 바로 무료 체험을 통해 확인해보세요.</span>
              </p>
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
