import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Check } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Perspective() {
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
              우리의 관점
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              AI 기능을 만드는 회사는 많습니다.<br/>
              우리는 다른 곳을 보고 있습니다.
            </p>
          </motion.div>
        </Section>

        {/* Section 1: Partner positioning */}
        <Section className="bg-white relative z-20 section-after-hero">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">01. 우리가 되고 싶은 것</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary leading-tight">
                외주 개발 업체가 아닌,<br/>
                기술 파트너가 됩니다
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                우리가 만나는 회사들은 대부분 오랫동안 자기 사업을 해온 중소·중견기업입니다.
                개발자를 뽑기도 어렵고, 뽑았다 해도 관리할 사람이 없어서 시작도 못하는 경우가 많습니다.
              </p>
              <p>
                AI 직원 한 명을 도입하는 걸로 끝나지 않습니다.
                그 이후에도 새로운 업무가 생기고, 시스템을 고쳐야 하고, 또 다른 자동화가 필요해집니다.
                <span className="text-primary font-semibold"> 계속해서 옆에 있을 기술 파트너</span>가 필요한 거죠.
              </p>
              <p>
                기존에는 SI 회사들이 그 역할을 해왔습니다. 하지만 비쌌고,
                새로운 걸 추가하려면 매번 별도 프로젝트로 큰 비용이 들었습니다.
                그래서 파트너라기보다는 그냥 외주 업체에 가까웠습니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-secondary/30 rounded-2xl p-8 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <X className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-bold text-muted-foreground">기존 SI 모델</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• 매 프로젝트마다 큰 비용</li>
                  <li>• 추가 개발은 또 별도 견적</li>
                  <li>• 첫 프로젝트가 볼모가 됨</li>
                  <li>• 외주 업체 — 파트너 아님</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/30">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-primary">신티아 모델</h3>
                </div>
                <ul className="space-y-3 text-sm text-foreground">
                  <li>• AI 직원 한 명부터 시작</li>
                  <li>• 필요할 때마다 자연스럽게 확장</li>
                  <li>• 묶이지 않고 언제든 중단 가능</li>
                  <li>• 회사의 기술 파트너로 함께 감</li>
                </ul>
              </div>
            </div>

            <p className="text-lg text-primary font-medium leading-relaxed">
              개발 이슈, AI 도입 — 그 회사의 기술 문제를 해결해 주는 옆자리 파트너.
              그게 신티아가 하고 싶은 일입니다.
            </p>
          </div>
        </Section>

        {/* Section 2: Data unification */}
        <Section className="bg-secondary/20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">02. 우리가 가장 중요하게 보는 것</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary leading-tight">
                AI 기능보다,<br/>
                흩어진 데이터를 모으는 일이 먼저입니다
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                대부분의 타깃 고객은 이미 ERP, 그룹웨어 등 여러 SaaS를 쓰고 있습니다.
                회사 데이터는 여기저기 흩어져 있고, 그 SaaS들조차 우리 회사를 위해 만들어진 게 아닙니다.
                지금까지는 그 시스템에 우리가 맞춰서 불편하게 써왔습니다.
              </p>
              <p>
                새롭게 AI를 도입하려고 보면 그제서야 드러나는 문제가 있습니다.
                <span className="text-primary font-semibold"> 이전에 쓰던 SaaS에서 데이터를 가져올 수 없다</span>는 것입니다.
                여러 SaaS에 흩어진 데이터를 한곳으로 통합하는 것 —
                이게 우리가 가장 중요하게 생각하는 부분입니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-10 border border-border/50 shadow-lg shadow-primary/5 mb-12">
              <h3 className="text-xl font-bold mb-6 text-primary">많은 경쟁업체가 말하지 않는 것</h3>
              <div className="space-y-5 text-muted-foreground">
                <div className="flex gap-3">
                  <div className="text-primary font-bold flex-shrink-0">·</div>
                  <p>AI 기능 자체는 이제 누구나 만들 수 있습니다. 내부 실무자용 도구 개발은 아주 쉬워졌습니다.</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-primary font-bold flex-shrink-0">·</div>
                  <p>하지만 회사의 오랫동안 누적된 데이터와 새로 쌓이는 데이터가 따로 놀게 되면, 그건 그냥 도구에 그칩니다.</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-primary font-bold flex-shrink-0">·</div>
                  <p>경쟁사들은 파편화된 데이터를 한곳으로 모으는 일의 중요성을 이야기하지 않습니다. 어렵고 티가 안 나는 일이기 때문입니다.</p>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white rounded-2xl p-8 md:p-10 shadow-xl shadow-primary/20">
              <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                우리가 잘하는 건 도구 개발이 아닙니다.<br/>
                <span className="text-white/80">회사의 데이터를 한곳에 모으고, 그 위에서 AI가 실제로 움직이게 만드는 일입니다.</span>
              </p>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="text-center bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              우리 회사에도 맞을까요?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              한 번 이야기를 나눠보면 답이 보입니다.<br/>
              부담 없는 적용 상담부터 시작해보세요.
            </p>
            <a href="/poc#poc-form" className="inline-block">
              <Button className="gap-2 rounded-xl h-14 px-8 text-base font-semibold shadow-lg shadow-primary/20">
                적용 상담 받기 <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
