import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Zap, Shield, Laptop, Check } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Technology() {
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
              기술은 우리가 고민하겠습니다<br/>
              대표님은 결과만 보세요
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              우리는 ‘AI를 연결하는 기술’을 만듭니다.<br/>
              그래서 빠르고, 가볍고, 저렴하게 시작할 수 있습니다.
            </p>
          </motion.div>
        </Section>

        {/* Philosophy */}
        <Section className="bg-white relative z-20 section-after-hero">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 text-primary">기술보다 중요한 건 결과라고 믿습니다</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              어떤 회사는 AI 모델 이름부터 이야기합니다.<br/>
              LLM, 파인튜닝, GPU, RAG…<br/><br/>
              하지만 대표님들께 중요한 건 그런 단어가 아니라,<br/>
              <span className="text-primary font-bold">"그래서 우리 회사 일이 줄어드느냐"</span> 그거 하나라고 생각합니다.<br/><br/>
              그래서 우리는 기술을 자랑하지 않고 결과를 만드는 데 집중합니다.
            </p>
          </div>
        </Section>

        {/* Core Capabilities */}
        <Section className="bg-secondary/20">
          <h2 className="text-3xl font-bold mb-12 text-center">우리가 잘하는 4가지</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border/60 card-hover">
              <CardContent className="p-8">
                <div className="mb-6 bg-gradient-to-br from-primary/15 to-primary/5 w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm">
                  <Laptop className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">1. AI 모델을 직접 다룰 수 있는 팀</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 자체 모델 운영 및 Fine-tuning</li>
                  <li>• 음성/텍스트/자동화 엔진 개발 경험</li>
                  <li>• 외부 API만 붙이는 회사와 출발선이 다릅니다.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary border-2 shadow-lg shadow-primary/5 card-hover relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <CardContent className="p-8">
                <div className="mb-6 bg-gradient-to-br from-accent/20 to-accent/5 w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm">
                  <Zap className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">2. 회사 데이터를 '자동으로' 연결하는 기술</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• ERP / 엑셀 / 회계툴 / 메신저 / 이메일 자동 수집</li>
                  <li>• 실시간 동기화 및 기존 방식 그대로 사용</li>
                  <li>• 직원들은 평소처럼 일하고 AI만 뒤에서 조용히 배웁니다.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/60 card-hover">
              <CardContent className="p-8">
                <div className="mb-6 bg-gradient-to-br from-primary/15 to-primary/5 w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm">
                  <Check className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">3. 2주 만에 동작하는 빠른 구축 방식</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 빠른 프로토타입 제작</li>
                  <li>• 작게 시작 → 빠르게 개선</li>
                  <li>• 실패 비용 최소화 (개발비 0원)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/60 card-hover">
              <CardContent className="p-8">
                <div className="mb-6 bg-gradient-to-br from-primary/15 to-primary/5 w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">4. 클라우드 + 온프레미스 모두 가능</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 일반 기업: 클라우드 (저비용, 빠른 시작)</li>
                  <li>• 보안 중요 기업: 온프레미스(내부 서버) 구축 지원</li>
                  <li>• "우린 못 하는 게 아니라, 일부러 가볍게 제안합니다"</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Comparison Table */}
        <Section className="bg-gradient-to-b from-secondary/30 to-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">그래서 이런 차이가 생깁니다</h2>
            <div className="bg-white rounded-2xl border border-border shadow-lg shadow-primary/5 overflow-hidden">
              <div className="grid grid-cols-3 font-medium text-center border-b border-border">
                <div className="p-4 bg-muted/30">구분</div>
                <div className="p-4 bg-muted/30 text-muted-foreground">기존 SI 방식</div>
                <div className="p-4 bg-primary/10 text-primary font-bold border-l border-primary/20">우리 방식</div>
              </div>
              {[
                { label: "구축 기간", old: "6개월 ~ 1년", new: "2주 내 시작" },
                { label: "비용", old: "수천 ~ 수억 원", new: "개발비 0원" },
                { label: "도입 방식", old: "시스템 전체 교체", new: "기존 시스템 유지" },
                { label: "사용성", old: "복잡한 사용법 교육 필요", new: "직원은 하던 방식 그대로" },
                { label: "리스크", old: "한번 실패 = 큰 손실", new: "작게 시작, 부담 없음" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0 text-center">
                  <div className="px-4 py-4 font-medium text-muted-foreground">{row.label}</div>
                  <div className="px-4 py-4 text-muted-foreground">{row.old}</div>
                  <div className="px-4 py-4 font-bold text-primary bg-primary/5 border-l border-primary/20">{row.new}</div>
                </div>
              ))}
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
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Badge variant="outline" className="mb-8 rounded-full border-white/20 bg-white/10 text-white px-4 py-1 text-sm backdrop-blur-sm">Next Step</Badge>
              <h2 className="mb-8 text-4xl font-bold md:text-6xl text-white leading-tight">기술은 준비되어 있습니다.<br/><span className="text-accent">이제, 시작만 남았습니다.</span></h2>
              <p className="mb-12 text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto">복잡한 기술 설명 대신 결과로 보여드립니다.<br/><span className="text-white font-semibold">무료 체험으로 직접 확인해보세요.</span></p>
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
