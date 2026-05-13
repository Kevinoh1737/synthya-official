import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Rocket, Target } from "lucide-react";
import ceoImage from "@/assets/images/ceo-kevin.jpg";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Company() {
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
              우리는 시스템을 만드는 회사가 아니라<br/>
              일을 줄여주는 팀입니다
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              기술은 수단일 뿐.<br/>
              대표님의 하루를 더 가볍게 만드는 것, 그게 우리가 하는 일입니다.
            </p>
          </motion.div>
        </Section>

        {/* Story */}
        <Section className="bg-white relative z-20 section-after-hero">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-primary">우리도 같은 고민에서 시작했습니다</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>왜 회사 시스템은 항상 비싸고, 느리고, 복잡할까요?</p>
              <p>왜 수억 원을 들였는데 직원들은 결국 엑셀로 돌아갈까요?</p>
              <p>왜 IT 프로젝트는 대표님만 더 힘들어질까요?</p>
              <div className="my-8 h-px bg-border w-20 mx-auto" />
              <p className="font-medium text-primary">
                "이 방식은 뭔가 잘못됐다."
              </p>
              <p>
                AI가 나왔는데, 예전 방식 그대로 더 비싸게 만드는 건 아니라고 생각했습니다.<br/>
                그래서 처음부터 다시 설계했습니다.
              </p>
            </div>
          </div>
        </Section>

        {/* Principles */}
        <Section className="bg-secondary/20">
          <h2 className="text-3xl font-bold mb-12 text-center">우리는 이렇게 일합니다</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center h-full border-none shadow-sm card-hover bg-white">
              <CardContent className="pt-10 pb-8 px-6">
                <div className="mx-auto bg-gradient-to-br from-primary/10 to-primary/5 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 shadow-sm">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">1. 작게 시작합니다</h3>
                <p className="text-muted-foreground">거대한 시스템 대신 업무 하나부터 해결합니다. 실제로 쓰이지 않으면 아무 의미 없다고 믿습니다.</p>
              </CardContent>
            </Card>
            <Card className="text-center h-full border-none shadow-sm card-hover bg-white">
              <CardContent className="pt-10 pb-8 px-6">
                <div className="mx-auto bg-gradient-to-br from-primary/10 to-primary/5 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 shadow-sm">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">2. 빠르게 만듭니다</h3>
                <p className="text-muted-foreground">몇 달짜리 프로젝트 대신 2주 단위로 결과를 보여드립니다. 말보다 실행이 빠릅니다.</p>
              </CardContent>
            </Card>
            <Card className="text-center h-full border-none shadow-sm card-hover bg-white">
              <CardContent className="pt-10 pb-8 px-6">
                <div className="mx-auto bg-gradient-to-br from-primary/10 to-primary/5 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 shadow-sm">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">3. 우리가 먼저 투자합니다</h3>
                <p className="text-muted-foreground">개발비를 받지 않습니다. 대표님이 리스크를 지는 구조는 공정하지 않다고 생각합니다.</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Trust/History */}
        <Section className="bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">기술은 이미 충분히 검증해왔습니다</h2>
            <h3 className="text-xl text-center text-muted-foreground mb-12">Synthya 팀 소개</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "창업진흥원 주관 2024 글로벌 기업 협업 프로그램(엔업) 선정",
                "NVIDIA Inception & Google Cloud Startup Program 등록",
                "서울경제진흥원 서울창업센터 동작 입주기업 선정",
                "한-아프리카 재단 스타트업 Incubation & Contest 아카데미 선정",
                "한국콘텐츠진흥원 2024 글로벌 진출 오디션(배틀필드) 우수상 수상",
                "넥스트엘레베이션X씨엔티테크 LeapStart 액셀러레이팅 프로그램 선정",
                "체코, 헝가리 등과 오디오북 제작 솔루션 도입",
                "국내 1위 손해사정기업 OCR 전처리 솔루션 PoC 완료 및 고도화 진행 중"
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-secondary/30 p-4 rounded-lg border border-border/50">
                   <div className="mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
                   <span className="text-primary/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* CEO Message */}
        <Section className="bg-secondary/20">
          <div className="max-w-3xl mx-auto bg-white border border-border/50 p-8 md:p-12 rounded-2xl shadow-xl shadow-primary/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
             <h2 className="text-2xl font-bold mb-8 text-primary">대표 메시지</h2>
             <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
               <p>안녕하세요, 오진환입니다.</p>
               <p>저는 오랫동안 AI 기술을 개발해왔지만, 정작 많은 기업들이 그 기술을 제대로 쓰지 못하는 모습을 봤습니다. 이유는 단순했습니다. 너무 비싸고, 너무 복잡했기 때문입니다.</p>
               <p>그래서 우리는 'AI를 더 싸고 쉽게 만들자'가 아니라 <span className="text-primary font-bold">'대표님이 부담 없이 시작할 수 있게 만들자'</span>에 집중했습니다.</p>
               <p>작은 성공을 하나씩 쌓다 보면 회사는 자연스럽게 바뀐다고 믿습니다.</p>
               <p>부담 없이 연락 주세요. 편하게 이야기 나누는 것부터 시작해도 좋습니다.</p>
             </div>
             <div className="mt-8 pt-8 border-t border-border flex items-center gap-4">
               <img 
                 src={ceoImage} 
                 alt="오진환 - Synthya CEO" 
                 className="h-16 w-16 rounded-full object-cover shadow-md"
               />
               <div>
                 <p className="font-bold text-primary">오진환</p>
                 <p className="text-sm text-muted-foreground">Synthya CEO</p>
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
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Badge variant="outline" className="mb-8 rounded-full border-white/20 bg-white/10 text-white px-4 py-1 text-sm backdrop-blur-sm">Next Step</Badge>
              <h2 className="mb-8 text-4xl font-bold md:text-6xl text-white leading-tight">이제,<br/><span className="text-accent">우리 차례입니다</span></h2>
              <p className="mb-12 text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto">AI 도입을 고민 중이시라면<br/><span className="text-white font-semibold">가볍게 이야기부터 나눠보세요.</span></p>
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
