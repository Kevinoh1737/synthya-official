import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, X, Sparkles, Building2, User, FileText, Settings, BarChart, Eye } from "lucide-react";
import { motion, Variants } from "framer-motion";
import omniPreview from "@assets/Omni_AI_sample_1770359028257.png";

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [omniImageOpen, setOmniImageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />

      <main>
        {/* Hero Section */}
        <Section className="pt-32 pb-20 md:pt-48 md:pb-32 gradient-hero relative overflow-hidden hero-shadow-bottom z-10" divider={false}>
          <div className="absolute inset-0 bg-dots opacity-50" />
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center text-center relative z-10"
          >
            <Badge variant="outline" className="mb-6 rounded-full border-primary/20 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm text-primary hover:bg-white shadow-sm">
              New: AI Workforce Solution
            </Badge>
            <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-primary md:text-7xl">
              AI를 도입하지 마세요<br />
              <span className="text-muted-foreground/80">AI 직원을 채용하세요</span>
            </h1>
            <p className="mb-10 max-w-2xl text-xl leading-relaxed text-muted-foreground">
              우리 회사에 딱 맞는 시스템을 크게 만들 필요는 없습니다.<br className="hidden md:block" />
              작게, 빠르게, 한 명부터 시작하면 충분합니다.
            </p>
            <div className="flex flex-col gap-4 items-center">
                <Button size="lg" className="h-14 px-10 text-base glow-primary rounded-full transition-all duration-300 hover:-translate-y-0.5" asChild>
                  <a href="/poc#poc-form">우리 업무에 적용 상담하기 <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <p className="text-muted-foreground/60 text-sm font-medium">
                  * 도입 결정 전까지 비용이 전혀 발생하지 않습니다.
                </p>
              </div>
          </motion.div>
        </Section>

        {/* Empathy Section */}
        <Section className="bg-white relative z-20 section-after-hero">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2 variants={fadeIn} className="mb-6 text-3xl font-bold text-primary md:text-4xl">
                혹시 이런 경험 있으신가요?
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground leading-relaxed">
                많은 대표님들이 똑같은 이야기를 합니다.<br/>
                그리고 대부분 아직도 시작을 못 하고 있습니다.
              </motion.p>
            </div>
            
            <div className="space-y-6">
              {[
                "ERP를 도입했는데… 직원들이 결국 엑셀 씁니다",
                "SI 견적이 수억 원이라 포기했습니다",
                "시스템은 복잡해졌는데 일은 더 늘었습니다",
                "AI 좋다던데… 우리 회사는 어디서 시작하죠?"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border/50 shadow-sm card-hover"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-lg font-medium text-primary">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* Problem Definition */}
        <Section className="bg-secondary/20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">예전 방식은 늘 같았습니다</h2>
            <p className="mb-12 text-xl text-muted-foreground">
              회사 시스템을 바꾼다고 하면 항상 이렇게 시작했죠.
            </p>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "크게 만들고", icon: Building2 },
                { title: "오래 만들고", icon: Settings },
                { title: "비싸게 만들고", icon: BarChart },
              ].map((item, i) => (
                <Card key={i} className="border-border/50 bg-white shadow-sm card-hover">
                  <CardContent className="flex flex-col items-center py-10">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 shadow-sm">
                      <item.icon className="h-8 w-8 text-primary/70" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="mt-12 text-lg text-muted-foreground">
              그리고… 막상 완성되면 아무도 안 씁니다.<br/>
              AI까지 여기에 얹으면 견적은 더 올라갑니다.<br/>
              <span className="font-semibold text-primary">솔직히 말하면, 대표님들 입장에선 또 다른 부담일 뿐이죠.</span>
            </p>
          </div>
        </Section>

        {/* Core Proposal (Transition) */}
        <Section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="mb-4 inline-block text-accent font-semibold tracking-wide uppercase bg-white/10 px-4 py-1 rounded-full text-sm">Our Perspective</span>
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl text-white">
                AI는 거대한 시스템을<br/>만드는 기술이 아닙니다.
              </h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                오히려 반대입니다.<br/>
                더 작게, 더 가볍게, 더 싸게 시작할 수 있게 해주는 기술입니다.<br/>
                그래서 우리는 방식을 완전히 바꿨습니다.
              </p>
            </div>
            
            <div className="rounded-2xl bg-white/5 p-8 md:p-12 backdrop-blur-sm border border-white/10 max-w-2xl mx-auto">
              <h3 className="mb-6 text-3xl font-bold text-white text-center">
                AI 전담 사원을<br/>한 명 먼저 채용하세요
              </h3>
              <ul className="space-y-4 text-lg text-white/90">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent" /> 새 시스템을 구축하지 않습니다.
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent" /> 회사를 뒤엎지 않습니다.
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent" /> 지금 방식 그대로 둡니다.
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent" /> 그 위에 '일 잘하는 AI 직원'을 붙입니다.
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Tracks Section */}
        <Section id="solution">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">AI를 도입하는 방법은 크게 두 가지입니다</h2>
            <p className="text-xl text-muted-foreground">회사 전체를 연결하거나, 작은 업무 하나부터 시작하거나.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Track 1 */}
            <Card className="flex flex-col border-border/60 shadow-lg shadow-primary/5 card-hover">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-secondary text-muted-foreground hover:bg-secondary/80">Track 1</Badge>
                <CardTitle className="text-2xl">회사 전체를 하나의 AI로 만드는 방식</CardTitle>
                <CardDescription className="text-base">Omni AI</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <p className="text-muted-foreground">
                  ERP, NAS, 엑셀, 내부 문서를 모두 연결해<br/>
                  AI가 회사 전체 데이터를 통합 분석합니다.
                </p>
                <p className="text-muted-foreground">
                  부서별로 나뉘어 있던 정보를<br/>
                  하나의 시스템에서 보고, 판단하고, 실행합니다.
                </p>
                <p className="text-muted-foreground">
                  전사 단위 자동화를 구축하는 방식입니다.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">이런 회사에 적합</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> 부서가 많고 데이터가 흩어져 있는 경우</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> ERP/문서/파일이 복잡하게 쌓여 있는 경우</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> 회사 전체를 장기적으로 자동화하고 싶은 경우</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">핵심 특징</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 데이터 자동 연동</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 기존 시스템 그대로 사용</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 전사 리포트/대시보드 제공</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 실제 운영 화면 제공 (아래 예시 참고)</li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-xl"
                  onClick={() => setOmniImageOpen(true)}
                  data-testid="button-omni-preview"
                >
                  <Eye className="w-4 h-4" /> 실제 화면 미리보기
                </Button>
              </CardContent>
            </Card>

            {omniImageOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer animate-in fade-in duration-200"
                onClick={() => setOmniImageOpen(false)}
              >
                <div className="relative max-w-5xl w-[90vw] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setOmniImageOpen(false)}
                    className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
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

            {/* Track 2 */}
            <Card className="relative flex flex-col border-primary border-2 shadow-xl shadow-primary/10 card-hover">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 text-white px-5 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                추천
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2 bg-accent/10 text-primary hover:bg-accent/20 border-none">Track 2</Badge>
                <CardTitle className="text-2xl">AI 전담 사원 한 명부터 시작</CardTitle>
                <CardDescription className="text-base">AI Staff</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <p className="text-muted-foreground">
                  시스템을 바꾸지 않습니다.<br/>
                  복잡한 구축도 필요 없습니다.
                </p>
                <p className="text-muted-foreground">
                  작은 업무 하나를 AI 직원에게 맡기고<br/>
                  며칠 안에 결과를 확인합니다.
                </p>
                <p className="text-muted-foreground">
                  지금 바로 무료 체험이 가능한 방식입니다.
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">이런 회사에 적합</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> AI를 처음 도입해보는 경우</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> 빠르게 효과를 확인하고 싶은 경우</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> 특정 업무부터 자동화하고 싶은 경우</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">예시 업무</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["견적서 자동 생성", "CS 답변 처리", "발주/정산 관리", "보고서 작성"].map((task) => (
                      <div key={task} className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3 text-sm font-medium">
                        <User className="h-4 w-4 text-primary" /> {task}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">핵심 특징</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 2주 안에 결과 확인</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 개발비 0원</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 데이터 마이그레이션 무료</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 부담 없이 테스트 가능</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 즉시 무료 체험 가능</li>
                  </ul>
                </div>

                <a href="/experience" className="block pt-2">
                  <Button className="w-full gap-2 rounded-xl h-14 text-base font-semibold shadow-lg shadow-primary/20" data-testid="button-track2-experience">
                    지금 바로 체험하기 <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Pricing Comparison */}
        <Section id="pricing" className="bg-gradient-to-b from-secondary/30 to-background">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">직원 한 명 채용한다고 생각해보세요</h2>
            <p className="text-xl text-muted-foreground">솔직히 말하면, 가장 가성비 좋은 직원입니다.</p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-white shadow-lg shadow-primary/5">
            <div className="grid grid-cols-3 border-b border-border bg-muted/30 text-center font-medium">
              <div className="p-6 text-muted-foreground">구분</div>
              <div className="p-6 text-muted-foreground">사람 직원</div>
              <div className="p-6 bg-primary/5 font-bold text-primary">AI 전담 사원</div>
            </div>
            
            {[
              { label: "비용", human: "연봉 3,000만원+", ai: "월 구독료만 (저렴)" },
              { label: "근무 시간", human: "주 40시간", ai: "24시간 / 365일" },
              { label: "복지/부대비용", human: "4대보험, 퇴직금, 식대", ai: "0원" },
              { label: "교육 기간", human: "1~3개월", ai: "즉시 투입" },
              { label: "퇴직 리스크", human: "언제든 가능", ai: "절대 없음" },
              { label: "초기 개발비", human: "-", ai: "0원 (무료 셋팅)" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-border last:border-0 text-center text-sm md:text-base hover:bg-muted/10 transition-colors">
                <div className="p-5 font-medium text-muted-foreground">{row.label}</div>
                <div className="p-5 text-muted-foreground">{row.human}</div>
                <div className="p-5 bg-primary/5 font-bold text-primary">{row.ai}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
             <div className="inline-flex flex-col items-center justify-center rounded-2xl border border-primary/10 bg-white p-8 shadow-xl shadow-primary/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <h3 className="mb-2 text-2xl font-bold text-primary">부담 없이 시작하세요</h3>
                <div className="flex flex-wrap justify-center gap-6 py-6 text-muted-foreground">
                  <span className="flex items-center gap-2"><Check className="text-green-500 h-5 w-5" /> 장기 계약 없음</span>
                  <span className="flex items-center gap-2"><Check className="text-green-500 h-5 w-5" /> 무료 체험 제공</span>
                  <span className="flex items-center gap-2"><Check className="text-green-500 h-5 w-5" /> 효과 없으면 0원</span>
                </div>
             </div>
          </div>
        </Section>

        {/* CTA Section */}
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
                말로 설명하는 것보다<br/>
                <span className="text-accent">직접 써보는 게 빠릅니다</span>
              </h2>
              <p className="mb-12 text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                상담 → 2주 테스트 → 효과 확인 → 그때 결정<br/>
                <span className="text-white font-semibold">초기 비용 0원으로 지금 바로 시작해보세요.</span>
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
