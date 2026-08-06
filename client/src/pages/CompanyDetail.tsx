import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BrainCircuit, Box, Check, Cpu, Gauge, GitBranch, Layers3, RefreshCw, Search, ShieldCheck, Sparkles, UserCheck, Workflow } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import fullLogo from "@/assets/images/synthya-brand-2026-horizontal.png";
import { LANGUAGE_STORAGE_KEY, type Language } from "@/lib/language";

export default function CompanyDetail() {
  const [language, setLanguage] = useState<Language>(() => window.location.pathname.startsWith("/en") ? "en" : "ko");
  const isEnglish = language === "en";

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isEnglish ? "Company | Synthya" : "회사 소개 | Synthya";
  }, [isEnglish, language]);

  const handleLanguageChange = (nextLanguage: Language) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    window.location.assign(nextLanguage === "en" ? "/en/company" : "/ko/company");
  };

  const history = isEnglish ? [
    ["2020–2024", "Built and operated speech AI models", "In-house work across text-to-speech, voice cloning, speech recognition, denoising, and GPU training infrastructure."],
    ["2024", "Launched a global AI audio production service", "Production experience serving professional content workflows across multiple languages and markets."],
    ["2025", "Expanded into publishing and on-premise AI", "Commercial audiobook production and a security-sensitive, on-premise AI deployment for professional work."],
    ["2026–", "From generative models to design execution", "A proprietary browser CAD engine, Omni Intelligence, and private design agents for rule-driven engineering work."],
  ] : [
    ["2020–2024", "음성 AI 모델 직접 개발·운영", "음성 합성, 보이스 클로닝, 음성 인식, 노이즈 제거와 GPU 학습 인프라까지 축적한 모델 엔지니어링 경험"],
    ["2024", "글로벌 AI 오디오 제작 서비스", "여러 언어와 시장의 전문 콘텐츠 제작 업무를 실제로 운영하며 확보한 상용화 경험"],
    ["2025", "출판·온프레미스 AI로 확장", "상업 오디오북 제작과 보안이 중요한 전문 업무를 위한 온프레미스 AI 구축"],
    ["2026–", "생성 모델에서 설계 실행으로", "자체 브라우저 CAD 엔진, Omni Intelligence, 고객 전용 설계 에이전트로 이어지는 기술 전환"],
  ];

  const vision = isEnglish ? [
    { state: "PROVEN FIRST", title: "Smoke-control design", body: "The first proving ground for drawing interpretation, CAD measurement, calculation, and rule-based drafting.", icon: Layers3, active: true },
    { state: "EXPANDING", title: "Fire-protection engineering", body: "Extending the execution engine across regulations, multiple systems, and field exceptions.", icon: ShieldCheck, active: false },
    { state: "OUR DIRECTION", title: "VibeCAD platform", body: "A professional environment where each company can turn its own rules and knowledge into executable design workflows.", icon: Sparkles, active: false },
  ] : [
    { state: "PROVEN FIRST", title: "제연설계", body: "도면 판독, CAD 실측, 계산, 규칙 기반 작도를 검증하는 첫 번째 전문 설계 영역", icon: Layers3, active: true },
    { state: "EXPANDING", title: "소방설계", body: "법령, 이종 설비, 현장 예외까지 처리하도록 확장되는 설계 실행 엔진", icon: ShieldCheck, active: false },
    { state: "OUR DIRECTION", title: "VibeCAD 플랫폼", body: "각 회사의 규칙과 지식을 실행 가능한 설계 흐름으로 전환하는 전문 설계 환경", icon: Sparkles, active: false },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f9fb] text-[#0b1220]">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      <main>
        <section className="company-hero-grid border-b border-slate-200 pt-[70px]">
          <div className="site-shell py-20 md:py-28">
            <a href={isEnglish ? "/en/" : "/ko/"} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600">
              <ArrowLeft className="h-4 w-4" /> {isEnglish ? "Back to VibeCAD" : "VibeCAD로 돌아가기"}
            </a>
            <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="section-kicker">AI-NATIVE ENGINEERING COMPANY</p>
                <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.06em] md:text-7xl">
                  {isEnglish ? "An AI-native team." : "완전한 AI 네이티브"}<br />
                  <span className="text-blue-600">{isEnglish ? "Built to execute." : "개발팀."}</span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                  {isEnglish
                    ? "Models are not an add-on to our workflow. They help assemble, coordinate, evaluate, and improve the specialist agent teams behind every project."
                    : "AI를 기존 개발 방식에 덧붙이는 팀이 아니라, 프로젝트마다 전문 에이전트 팀을 구성하고 조율하며 평가·개선하는 방식으로 개발"}
                </p>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,.08)] md:p-10">
                <img src={fullLogo} alt="Synthya" className="w-full max-w-md mix-blend-multiply" />
                <div className="mt-10 grid grid-cols-2 gap-3">
                  {(isEnglish ? [["6 YEARS", "Model R&D and production"], ["AI-NATIVE", "Development organization"], ["HARNESS", "Agent orchestration"], ["HUMAN-LED", "Final judgment and approval"]] : [["6 YEARS", "모델 개발·상용 운영"], ["AI-NATIVE", "에이전트 중심 개발 조직"], ["HARNESS", "역할 구성·조율·평가"], ["HUMAN-LED", "최종 판단과 승인"]]).map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-slate-50 p-4"><strong className="block text-xl text-slate-950">{value}</strong><span className="mt-1 block text-xs leading-5 text-slate-500">{label}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 md:py-32">
          <div className="site-shell">
            <div className="section-heading text-left">
              <p className="section-kicker">NATIVE FROM THE MODEL LAYER UP</p>
              <h2>{isEnglish ? "AI is not a tool we adopted. It is how our development organization works." : "AI를 도입한 개발팀이 아닌, AI로 움직이는 개발 조직"}</h2>
              <p>{isEnglish ? "Six years of model engineering evolved into an operating system for assembling specialist agents, coordinating their work, and validating every result under human authority." : "6년간의 모델 엔지니어링이 전문 에이전트를 구성하고 협업시키며, 사람의 최종 권한 아래 결과를 검증하는 개발 운영 기술로 확장"}</p>
            </div>
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {[
                { icon: BrainCircuit, en: "Model engineering", ko: "모델 엔지니어링", enBody: "Direct experience in model training, inference, and production operations.", koBody: "모델 훈련, 추론, 실제 서비스 운영까지 이어진 직접 경험" },
                { icon: Cpu, en: "On-premise GPU", ko: "온프레미스 GPU", enBody: "Infrastructure experience for secure and compute-intensive professional workloads.", koBody: "보안과 연산 성능이 중요한 전문 업무를 위한 인프라 경험" },
                { icon: Box, en: "Execution engine", ko: "자체 실행 엔진", enBody: "A deterministic CAD layer for measurement, calculation, and geometry.", koBody: "실측, 계산, 기하 작도를 결정론적으로 수행하는 CAD 계층" },
              ].map((item) => {
                const Icon = item.icon;
                return <article key={item.en} className="rounded-[1.75rem] border border-slate-200 bg-[#f8f9fb] p-8 md:p-10"><Icon className="h-7 w-7 text-blue-600" /><h3 className="mt-10 text-2xl font-semibold tracking-[-0.035em]">{isEnglish ? item.en : item.ko}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{isEnglish ? item.enBody : item.koBody}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="agent-harness" className="agent-harness-section py-24 md:py-32">
          <div className="site-shell">
            <div className="mx-auto max-w-4xl text-center">
              <p className="section-kicker">SYNTHYA AGENT HARNESS</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] md:text-6xl">
                {isEnglish ? "An AI-native development team," : "프로젝트마다 구성되는"}<br className="desktop-break" />{" "}
                <span className="text-blue-600">{isEnglish ? "assembled for every project." : "AI 네이티브 개발팀"}</span>
              </h2>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600">
                {isEnglish ? "Synthya’s harness assigns roles, selects the right intelligence, coordinates specialist agents, and evaluates their work while final authority remains with people." : "업무에 맞는 역할을 구성하고 전문 에이전트의 협업과 평가를 관리하는 Synthya의 하네싱 기술. 목표 설정과 중요 판단, 최종 승인은 사람에게 유지"}
              </p>
            </div>

            <div className="harness-system mt-16">
              <div className="harness-human-node">
                <span><UserCheck aria-hidden="true" /></span>
                <p><small>HUMAN AUTHORITY</small><strong>{isEnglish ? "Intent · judgment · final approval" : "목표 설정 · 중요 판단 · 최종 승인"}</strong></p>
                <i>{isEnglish ? "FINAL SAY" : "최종 권한"}</i>
              </div>

              <div className="harness-vertical-line" aria-hidden="true" />

              <div className="harness-orchestrator">
                <div className="harness-orchestrator-title">
                  <span><GitBranch aria-hidden="true" /></span>
                  <p><small>AGENT ORCHESTRATION LAYER</small><strong>{isEnglish ? "Synthya Agent Harness" : "Synthya Agent Harness"}</strong></p>
                  <i><span /> SYSTEM ACTIVE</i>
                </div>
                <div className="harness-functions">
                  {(isEnglish ? ["Decompose work", "Assemble roles", "Route context", "Evaluate results"] : ["업무 분해", "역할 구성", "맥락 전달", "결과 평가"]).map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
                </div>
              </div>

              <div className="harness-branch" aria-hidden="true"><span /><span /><span /></div>

              <div className="harness-agent-grid">
                {[
                  { icon: Search, number: "01", en: "Discovery agent", ko: "요구사항 판독", enBody: "Clarifies requirements, evidence, and decision points.", koBody: "요구사항과 근거, 확인이 필요한 판단 지점을 정리" },
                  { icon: Workflow, number: "02", en: "Execution agents", ko: "전문 실행 에이전트", enBody: "Specialist roles work in parallel on the assigned scope.", koBody: "업무별 전문 역할이 배정된 범위를 병렬로 수행" },
                  { icon: ShieldCheck, number: "03", en: "Validation agent", ko: "검증 에이전트", enBody: "Checks outputs and returns only rejected work for correction.", koBody: "결과를 검증하고 보완이 필요한 작업만 담당 역할로 반환" },
                ].map((agent) => {
                  const Icon = agent.icon;
                  return <article key={agent.number}><div><span><Icon aria-hidden="true" /></span><small>{agent.number}</small></div><h3>{isEnglish ? agent.en : agent.ko}</h3><p>{isEnglish ? agent.enBody : agent.koBody}</p></article>;
                })}
              </div>

              <div className="harness-loop">
                <RefreshCw aria-hidden="true" />
                <p><small>CLOSED-LOOP CONTROL</small><strong>{isEnglish ? "Approved work stays. Rejected work returns to its owner." : "승인된 결과는 유지하고, 보완할 작업만 담당 에이전트로 반환"}</strong></p>
              </div>
            </div>

            <div className="harness-value-grid">
              {[
                { icon: Gauge, en: "Efficient by design", ko: "구조적으로 높은 효율", enBody: "The right role and model for each task, coordinated in parallel.", koBody: "업무에 맞는 역할과 모델을 구성하고 병렬로 조율" },
                { icon: Layers3, en: "Scales by composition", ko: "조합으로 확장", enBody: "New projects and domains add specialist teams without rebuilding the operating layer.", koBody: "운영 계층을 다시 만들지 않고 프로젝트와 도메인별 전문 팀을 추가" },
                { icon: Check, en: "Controlled and traceable", ko: "통제 가능한 개발 과정", enBody: "Project state, accepted work, and human decisions remain intact through every iteration.", koBody: "반복 과정에서도 프로젝트 상태와 승인된 결과, 사람의 판단을 보존" },
              ].map((item) => {
                const Icon = item.icon;
                return <article key={item.en}><Icon aria-hidden="true" /><div><strong>{isEnglish ? item.en : item.ko}</strong><p>{isEnglish ? item.enBody : item.koBody}</p></div></article>;
              })}
            </div>
          </div>
        </section>

        <section id="commercial-work" className="commercial-proof-section border-y border-slate-200 bg-white py-24 md:py-28">
          <div className="site-shell">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="section-kicker">2025 · SELECTED COMMERCIAL WORK</p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">{isEnglish ? "Built for real professional environments." : "전문 산업의 실제 업무에서 확보한 상용화 경험"}</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">{isEnglish ? "Before design AI, Synthya had already delivered model-driven production and secure enterprise AI in demanding commercial settings." : "설계 AI 이전부터 콘텐츠 제작과 보안형 엔터프라이즈 환경에서 축적한 모델 기반 제품 운영과 납품 경험"}</p>
            </div>
            <div className="commercial-proof-grid mt-14">
              {[
                { mark: "≈100", eyebrow: "AI CONTENT PRODUCTION", en: "Audiobook titles produced", ko: "오디오북 약 100종 제작", enBody: "Commercial production with a leading Korean publishing group.", koBody: "국내 선도 출판그룹과 진행한 상업 오디오북 제작" },
                { mark: "ON-PREM", eyebrow: "SECURE ENTERPRISE AI", en: "Document preprocessing AI model", ko: "문서 전처리 AI 모델", enBody: "An on-premise document preprocessing model for a major independent loss-adjusting firm.", koBody: "대형 독립 손해사정법인을 위한 온프레미스 문서 전처리 AI 모델" },
                { mark: "GLOBAL", eyebrow: "TECHNOLOGY STAGE", en: "International AI presentations", ko: "글로벌 AI 기술 발표", enBody: "Presented at Budapest AI Summit and Google Cloud AI Summit.", koBody: "Budapest AI Summit·Google Cloud AI Summit 발표" },
              ].map((work) => <article key={work.eyebrow}><span>{work.mark}</span><p>{work.eyebrow}</p><h3>{isEnglish ? work.en : work.ko}</h3><small>{isEnglish ? work.enBody : work.koBody}</small></article>)}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 py-24 md:py-32">
          <div className="site-shell grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="section-kicker">SIX YEARS OF BUILDING</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">{isEnglish ? "From speech AI to design AI." : "음성 AI에서 설계 AI까지"}</h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">{isEnglish ? "A continuous path of building models, operating products, and solving professional workflows." : "모델 개발, 제품 운영, 전문 업무 자동화로 이어진 하나의 기술 축적 과정"}</p>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {history.map(([year, title, body]) => <article key={year} className="grid gap-4 py-7 md:grid-cols-[7rem_1fr]"><strong className="text-blue-600">{year}</strong><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{body}</p></div></article>)}
            </div>
          </div>
        </section>

        <section id="vision" className="bg-[#07101f] py-24 text-white md:py-32">
          <div className="site-shell">
            <div className="max-w-3xl">
              <p className="section-kicker text-blue-400">OUR DIRECTION</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-6xl">{isEnglish ? "From one demanding discipline to a general design platform." : "가장 까다로운 설계에서 범용 설계 플랫폼으로"}</h2>
              <p className="mt-7 text-lg leading-8 text-slate-300">{isEnglish ? "Smoke-control engineering is the first proving ground—not the final destination." : "제연설계는 범용 설계 실행 엔진을 검증하는 첫 번째 현장"}</p>
            </div>
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {vision.map((item, index) => {
                const Icon = item.icon;
                return <article key={item.title} className={`vision-card ${item.active ? "active" : ""}`}><div className="flex items-center justify-between"><Icon className="h-6 w-6" /><span className="font-mono text-xs opacity-40">0{index + 1}</span></div><p className="mt-12 font-mono text-[10px] font-bold tracking-[0.16em] opacity-60">{item.state}</p><h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{item.title}</h3><p className="mt-4 text-sm leading-7 opacity-70">{item.body}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="bg-blue-600 py-20 text-white md:py-24">
          <div className="site-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div><p className="font-mono text-[10px] font-bold tracking-[0.18em] text-blue-100">BUILD WITH SYNTHYA</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{isEnglish ? "Turn your engineering knowledge into an executable system." : "회사의 설계 지식을 실행 가능한 시스템으로"}</h2></div>
            <a href={`mailto:business@synthya.ai?subject=${isEnglish ? "Synthya%20Company%20Inquiry" : "Synthya%20회사%20문의"}`} className="button-white shrink-0">{isEnglish ? "Talk to our team" : "도입 상담"}<ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </main>
      <Footer language={language} />
    </div>
  );
}
