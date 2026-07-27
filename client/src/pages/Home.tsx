import { useEffect, useState } from "react";
import {
  ArrowRight,
  Archive,
  Box,
  Braces,
  BrainCircuit,
  Building2,
  Check,
  ChevronRight,
  CircleCheckBig,
  Database,
  Eye,
  FileCode2,
  Layers3,
  Maximize2,
  MoveUpRight,
  Network,
  NotebookTabs,
  Ruler,
  ScanSearch,
  Scale,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import cadBefore from "@/assets/product/cad-before-real.png";
import cadAfter from "@/assets/product/cad-after-real.png";
import hitlConcept from "@/assets/product/hitl-concept-preview-v1.png";
import fullLogo from "@/assets/images/synthya-brand-2026-horizontal.png";
import globalEnpLogo from "@/assets/images/global-enp-logo.png";
import { LANGUAGE_STORAGE_KEY, type Language } from "@/lib/language";

type PreviewImage = {
  src: string;
  alt: string;
  label: string;
} | null;

const capabilitiesByLanguage = {
  ko: [
  {
    index: "01",
    title: "도면 이해",
    description:
      "전체 도면을 VLM으로 판독해 부속실이 있는 평면도를 찾고, 계산할 영역을 점선으로 구분합니다.",
    icon: ScanSearch,
    eyebrow: "도면을 이해합니다",
    result: "8개 동 · 16개 제연구역",
    tags: ["평면도", "부속실", "문·창문"],
  },
  {
    index: "02",
    title: "규칙 적용",
    description:
      "연결된 문과 창문을 CAD 줄자 도구로 직접 실측하고, 측정값을 부속실별 계산서에 입력합니다.",
    icon: Ruler,
    eyebrow: "설계 규칙을 적용합니다",
    result: "수작업 실측·입력 자동화",
    tags: ["CAD 실측", "계산 로직", "설계 제약"],
  },
  {
    index: "03",
    title: "CAD 생성",
    description:
      "팬룸과 DA를 찾아 팬·댐퍼 블록을 배치하고, 흡입측과 토출측 덕트를 최적 경로로 작도합니다.",
    icon: Workflow,
    eyebrow: "CAD를 직접 생성합니다",
    result: "팬 · 댐퍼 · 덕트 레이어",
    tags: ["팬·댐퍼 블록", "덕트 경로", "편집 레이어"],
  },
  ],
  en: [
    {
      index: "01",
      title: "Understand",
      description:
        "The agent uses visual reasoning to locate smoke-control vestibules across the full drawing set and delineates each calculation zone.",
      icon: ScanSearch,
      eyebrow: "READ DRAWINGS",
      result: "8 buildings · 16 smoke-control zones",
      tags: ["Floor plans", "Vestibules", "Doors & windows"],
    },
    {
      index: "02",
      title: "Engineer",
      description:
        "It measures connected doors and windows with native CAD tools, then transfers the geometry into the calculation workflow.",
      icon: Ruler,
      eyebrow: "APPLY RULES",
      result: "Automated measurement and data entry",
      tags: ["CAD measurement", "Calculations", "Constraints"],
    },
    {
      index: "03",
      title: "Draw",
      description:
        "It identifies fan rooms and dry areas, places approved fan and damper blocks, and routes intake and discharge ducts.",
      icon: Workflow,
      eyebrow: "GENERATE CAD",
      result: "Editable fan · damper · duct layer",
      tags: ["Fan & damper blocks", "Duct routes", "Editable layers"],
    },
  ],
} as const;

const rulesByLanguage = {
  ko: ["구조벽 통과 금지", "가능한 최단 경로", "90° 굴곡 5개 미만", "계산값 기반 덕트 크기"],
  en: ["No structural-wall penetration", "Shortest feasible route", "Fewer than five 90° bends", "Calculation-driven duct sizing"],
} as const;

function ProductWindow({
  src,
  alt,
  label,
  onOpen,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  label: string;
  onOpen: () => void;
  className?: string;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`product-window group text-left ${className}`}
      aria-label={label}
    >
      <div className="product-window-bar">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="window-dot bg-[#ff6b5f]" />
          <span className="window-dot bg-[#f4bd4f]" />
          <span className="window-dot bg-[#60c95d]" />
        </div>
        <span className="product-window-label">{label}</span>
        <Maximize2 className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-blue-600" />
      </div>
      <div className="overflow-hidden bg-[#f6f4ed]">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.012]"
        />
      </div>
    </button>
  );
}

export default function Home() {
  const [preview, setPreview] = useState<PreviewImage>(null);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "ko";
    if (window.location.pathname === "/en" || window.location.pathname.startsWith("/en/")) return "en";
    if (window.location.pathname === "/ko" || window.location.pathname.startsWith("/ko/")) return "ko";

    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === "ko" || savedLanguage === "en") return savedLanguage;

    const primaryLocale = window.navigator.languages?.[0] || window.navigator.language;
    return primaryLocale.toLowerCase().startsWith("ko") ? "ko" : "en";
  });
  const isEnglish = language === "en";
  const capabilities = capabilitiesByLanguage[language];
  const rules = rulesByLanguage[language];

  const handleLanguageChange = (nextLanguage: Language) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    const nextPath = nextLanguage === "en" ? "/en/" : "/ko/";
    window.location.assign(`${nextPath}${window.location.hash}`);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "en"
      ? "Synthya — Vibe CAD | AI-Powered CAD Design Automation"
      : "Synthya — Vibe CAD | AI CAD 설계 자동화";
  }, [language]);

  useEffect(() => {
    if (!preview) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [preview]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f9fb] text-[#0b1220]">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />

      <main>
        <section className="hero-grid relative overflow-hidden border-b border-slate-200/80">
          <div className="hero-glow" />
          <div className="site-shell relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="mx-auto max-w-5xl text-center">
              <div className="eyebrow-pill mx-auto mb-7">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(49,92,255,.12)]" />
                VIBE CAD · AI DESIGN AGENT
              </div>
              <h1 className="display-title mx-auto max-w-5xl">
                <span className="hero-title-line">{isEnglish ? "Read drawings." : "도면을 읽고,"}</span>
                <span className="hero-title-line">{isEnglish ? "Apply engineering rules." : "규칙을 이해하고,"}</span>
                <span className="hero-title-line text-blue-600">{isEnglish ? "Generate CAD." : "CAD를 직접 그립니다."}</span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-8 text-slate-600 md:text-xl">
                {isEnglish
                  ? "VibeCAD is an AI design agent that turns engineering rules into editable CAD geometry—directly in the browser."
                  : "VibeCAD는 엔지니어링 규칙을 편집 가능한 CAD 도면으로 바꾸는 AI 설계 에이전트입니다."}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#contact" className="button-primary">
                  {isEnglish ? "Request a demo" : "데모 요청"} <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#product" className="button-secondary">
                  {isEnglish ? "View the product in action" : "실제 작동 화면"} <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="hero-motion relative mx-auto mt-12 max-w-[1360px] md:mt-14">
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-blue-600/[0.06] blur-3xl" />
              <div className="hero-motion-bar">
                <div><span /><span /><span /></div>
                <strong>LIVE PRODUCT · BROWSER-NATIVE CAD</strong>
                <span className="hero-live"><i /> AGENT RUNNING</span>
              </div>
              <div className="hero-motion-media">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/product/smoke-control-agent-poster.jpg"
                  aria-label={isEnglish ? "Synthya agent generating a smoke-control system in CAD" : "Synthya 에이전트가 CAD에서 제연설비를 자동 작도하는 실제 화면"}
                >
                  <source src="/product/smoke-control-agent-live.mp4" type="video/mp4" />
                </video>
                <div className="hero-agent-card">
                  <span>DESIGN AGENT</span>
                  <strong>{isEnglish ? "Generating smoke-control system" : "제연설비 자동 작도 중"}</strong>
                  <div><i /><small>{isEnglish ? "Engineering rules active" : "설계 규칙 적용 중"}</small></div>
                </div>
              </div>
              <div className="hero-process">
                {[
                  { n: "01", ko: "도면 업로드", en: "Upload drawing" },
                  { n: "02", ko: "설계 규칙 분석", en: "Interpret rules" },
                  { n: "03", ko: "객체·경로 설계", en: "Engineer layout" },
                  { n: "04", ko: "CAD 도면 생성", en: "Generate CAD" },
                ].map((item, index) => (
                  <div key={item.n} className={`hero-process-step step-${index + 1}`}>
                    <span>{item.n}</span>
                    <strong>{isEnglish ? item.en : item.ko}</strong>
                    <Check />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="product" className="bg-white py-24 md:py-32">
          <div className="site-shell">
            <div className="section-heading">
              <p className="section-kicker">FROM DRAWING TO DESIGN</p>
              <h2>
                {isEnglish ? "Understand. Engineer. Draw." : "도면을 이해하고, 규칙을 적용하고, CAD로 그립니다."}
                <br className="desktop-break" />
                {" "}
                {isEnglish ? "One continuous engineering workflow." : "하나로 이어지는 엔지니어링 워크플로."}
              </h2>
              <p>
                {isEnglish
                  ? "A three-stage workflow mirrors how engineers work—from drawing analysis and measurement to calculation and CAD production."
                  : "사람이 수행하던 제연설계 방식을 3단계 모듈로 구현했습니다. 각 단계를 순서대로 실행하면 분석부터 계산, 작도까지 이어집니다."}
              </p>
            </div>

            <div className="capability-grid mt-14">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.index} className="group bg-white p-7 md:p-9">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <span className="font-mono text-xs text-slate-400">{item.index}</span>
                    </div>
                    <p className="mt-10 font-mono text-[10px] font-bold tracking-[0.18em] text-blue-600">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-4 text-[15px] leading-7 text-slate-600">{item.description}</p>
                    <div className="capability-tags">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="capability-result">
                      <Check className="h-3.5 w-3.5" />
                      {item.result}
                    </div>
                  </article>
                );
              })}
            </div>

            <figure className="step-one-video mt-10">
              <div className="step-one-copy">
                <div>
                  <p className="section-kicker">STEP 01 · LIVE PRODUCT FOOTAGE</p>
                  <h3>{isEnglish ? "Identify smoke-control vestibules across the drawing set." : "도면 전체에서 제연 부속실을 식별합니다."}</h3>
                </div>
                <p>
                  {isEnglish
                    ? "The agent reviews the full drawing set, identifies every relevant floor plan, and marks each vestibule calculation zone with a dashed boundary."
                    : "실행 버튼을 누르면 에이전트가 전체 도면을 판독하고, 부속실별 계산이 필요한 평면도 영역을 점선으로 표시합니다."}
                </p>
              </div>
              <div className="step-one-media">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/product/step-1-vestibule-detection-poster.jpg"
                  aria-label={isEnglish ? "Live footage of the Step 1 agent detecting vestibules and marking smoke-control zones" : "Step 1 에이전트가 전체 도면에서 부속실을 찾고 제연구역을 점선으로 표시하는 실제 제품 화면"}
                >
                  <source src="/product/step-1-vestibule-detection-live.mp4" type="video/mp4" />
                </video>
                <div className="step-one-result">
                  <span>VLM DRAWING ANALYSIS</span>
                  <strong>{isEnglish ? "8 BUILDINGS · 16 ZONES DETECTED" : "8개 동 · 16개 제연구역 탐지"}</strong>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="knowledge-section border-t border-slate-100 py-24 md:py-32">
          <div className="site-shell">
            <div className="knowledge-declaration mx-auto max-w-5xl text-center">
              <p className="section-kicker">SYNTHYA COMPANY INTELLIGENCE</p>
              <h2 className="mt-5 font-semibold leading-[1.08] tracking-[-0.055em]">
                {isEnglish ? "VibeCAD is the tool." : "VibeCAD는 도구입니다."}
                <br className="desktop-break" />
                {" "}
                <span className="text-blue-600">
                  {isEnglish ? "Accumulated design rules are the real asset." : "진짜 자산은 회사가 축적한 설계 규칙입니다."}
                </span>
              </h2>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">
                  {isEnglish
                    ? "Synthya builds an intelligence layer from a company’s projects and engineering knowledge. Each design agent retrieves the relevant rules, precedents, and context before it acts."
                  : "회사가 축적해 온 프로젝트와 설계 지식을 먼저 하나의 지능 계층으로 구축합니다. 설계 에이전트는 작업에 앞서 필요한 규칙과 선례, 프로젝트 맥락을 이곳에서 찾아 실행합니다."}
              </p>
            </div>

            <div className="knowledge-map mt-14">
              <div className="knowledge-source-panel">
                <div className="knowledge-panel-heading">
                  <span>01</span>
                  <div>
                    <p>{isEnglish ? "COMPANY KNOWLEDGE" : "회사의 설계 지식"}</p>
                    <strong>{isEnglish ? "Everything the company knows" : "흩어진 지식을 한곳으로"}</strong>
                  </div>
                </div>
                <div className="knowledge-source-grid">
                  {[
                    { icon: Archive, ko: "기존 프로젝트", en: "Past projects" },
                    { icon: FileCode2, ko: "도면·계산서", en: "Drawings & calculations" },
                    { icon: NotebookTabs, ko: "설계 기준·매뉴얼", en: "Standards & manuals" },
                    { icon: Scale, ko: "법령·규정", en: "Codes & regulations" },
                    { icon: Building2, ko: "현장 노하우", en: "Field expertise" },
                    { icon: Database, ko: "암묵지·선례", en: "Tacit knowledge & precedents" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div className="knowledge-source" key={item.en}>
                        <Icon aria-hidden="true" />
                        <span>{isEnglish ? item.en : item.ko}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="knowledge-flow knowledge-flow-in" aria-hidden="true">
                <span />
                <ChevronRight />
              </div>

              <div className="omni-core">
                <div className="omni-orbit omni-orbit-one" aria-hidden="true" />
                <div className="omni-orbit omni-orbit-two" aria-hidden="true" />
                <div className="omni-core-icon">
                  <BrainCircuit aria-hidden="true" />
                </div>
                <p>OMNI INTELLIGENCE AGENT</p>
                <h3>{isEnglish ? "Company Intelligence Layer" : "기업 설계 지능 계층"}</h3>
                <div className="omni-functions">
                  <span>{isEnglish ? "Understand" : "이해"}</span>
                  <span>{isEnglish ? "Structure" : "구조화"}</span>
                  <span>{isEnglish ? "Retrieve" : "검색"}</span>
                  <span>{isEnglish ? "Ground" : "근거화"}</span>
                </div>
                <small>
                  {isEnglish
                    ? "Project-specific knowledge, delivered at the point of decision"
                    : "판단이 필요한 순간, 프로젝트에 맞는 지식을 전달"}
                </small>
              </div>

              <div className="knowledge-flow knowledge-flow-out" aria-hidden="true">
                <span />
                <ChevronRight />
              </div>

              <div className="knowledge-agent-panel">
                <div className="knowledge-panel-heading">
                  <span>02</span>
                  <div>
                    <p>{isEnglish ? "DOMAIN DESIGN AGENTS" : "도메인 설계 에이전트"}</p>
                    <strong>{isEnglish ? "Knowledge becomes execution" : "지식이 설계 실행으로"}</strong>
                  </div>
                </div>
                <div className="design-agent-stack">
                  {[
                    { index: "A", ko: "도면 판독", en: "Drawing analysis", metaKo: "VLM 기반 객체·영역 인식", metaEn: "VLM-based object recognition" },
                    { index: "B", ko: "실측·계산", en: "Measure & calculate", metaKo: "CAD 도구와 계산 로직 실행", metaEn: "CAD tools and calculation logic" },
                    { index: "C", ko: "규칙 기반 작도", en: "Rule-based drafting", metaKo: "검증 가능한 편집 레이어 생성", metaEn: "Verifiable, editable layer output" },
                  ].map((item) => (
                    <div className="design-agent" key={item.index}>
                      <span>{item.index}</span>
                      <div>
                        <strong>{isEnglish ? item.en : item.ko}</strong>
                        <p>{isEnglish ? item.metaEn : item.metaKo}</p>
                      </div>
                      <CircleCheckBig aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="knowledge-loop" aria-hidden="true">
                <span className="knowledge-loop-line" />
                <span className="knowledge-loop-label">
                  <Network />
                  {isEnglish ? "VALIDATED OUTCOMES STRENGTHEN COMPANY KNOWLEDGE" : "검증된 결과가 다시 회사의 지식으로 축적"}
                </span>
              </div>
            </div>

            <div className="knowledge-contrast">
              <div>
                <span>{isEnglish ? "CONVENTIONAL VIBE CAD" : "일반적인 Vibe CAD"}</span>
                <p>{isEnglish ? "Prompt" : "프롬프트"} <ArrowRight /> {isEnglish ? "CAD command" : "CAD 명령"}</p>
              </div>
              <div className="knowledge-contrast-divider" />
              <div className="active">
                <span>SYNTHYA</span>
                <p>
                  {isEnglish ? "Company knowledge" : "회사 지식"} <ArrowRight />
                  {isEnglish ? "Engineering judgment" : "설계 판단"} <ArrowRight />
                  {isEnglish ? "CAD execution" : "CAD 실행"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="technology" className="precision-grid border-y border-slate-200 py-24 md:py-32">
          <div className="site-shell grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="section-kicker">DETERMINISTIC BY DESIGN</p>
              <h2 className="mt-4 max-w-lg text-4xl font-semibold leading-[1.12] tracking-[-0.045em] md:text-5xl">
                {isEnglish ? "Built for precision." : "추측하지 않습니다."}
                <br className="desktop-break" />
                {" "}
                <span className="text-blue-600">{isEnglish ? "Engineered to execute." : "실행합니다."}</span>
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-8 text-slate-600">
                {isEnglish
                  ? "Language models determine intent and plan the work. Synthya’s proprietary CAD engine performs the measurement, calculation, and geometric execution."
                  : "언어 모델은 무엇을 해야 하는지 판단합니다. 측정·계산·작도는 신티아가 직접 만든 CAD 엔진이 수행합니다."}
              </p>
              <div className="mt-10 space-y-5">
                {(isEnglish
                  ? [
                      ["Proprietary CAD engine", "Processes large, editable drawings directly in the browser"],
                      ["Native DWG and DXF parsing", "A core stack independent of third-party CAD licensing"],
                      ["Deterministic execution", "Identical inputs and rules produce consistent geometry"],
                    ]
                  : [
                      ["자체 CAD 엔진", "브라우저 안에서 대용량 도면을 직접 처리"],
                      ["자체 DWG·DXF 파서", "외부 CAD 라이선스에 종속되지 않는 기반 기술"],
                      ["결정론적 실행", "같은 입력과 규칙에는 같은 기하 결과"],
                    ]
                ).map(([title, body]) => (
                  <div key={title} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="architecture-card">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-blue-600">SYSTEM ARCHITECTURE</p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {isEnglish ? "Intelligence separated from precision" : "판단과 정밀 실행의 분리"}
                  </h3>
                </div>
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-3">
                {(isEnglish
                  ? [
                      { icon: Eye, title: "LLM + VLM", body: "Intent · visual interpretation · rule reasoning", tone: "soft" },
                      { icon: Braces, title: "Agent harness", body: "Tool selection · planning · review controls", tone: "mid" },
                      { icon: Box, title: "CAD engine", body: "Parsing · measurement · calculation · geometry", tone: "strong" },
                    ]
                  : [
                      { icon: Eye, title: "LLM + VLM", body: "의도 이해 · 시각 판독 · 규칙 판단", tone: "soft" },
                      { icon: Braces, title: "Agent harness", body: "도구 선택 · 작업 계획 · 검토 요청", tone: "mid" },
                      { icon: Box, title: "CAD engine", body: "파싱 · 실측 · 계산 · 레이어 작도", tone: "strong" },
                    ]
                ).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title}>
                      <div className={`architecture-layer ${item.tone}`}>
                        <Icon className="h-5 w-5" />
                        <div className="flex-1">
                          <p className="font-semibold">{item.title}</p>
                          <p className="mt-0.5 text-xs opacity-70">{item.body}</p>
                        </div>
                        <span className="font-mono text-[10px] opacity-50">0{index + 1}</span>
                      </div>
                      {index < 2 && <div className="mx-auto h-3 w-px bg-blue-200" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-[#07101f] py-24 text-white md:py-32">
          <div className="site-shell">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="section-kicker text-blue-400">REAL WORK, NOT A MOCKUP</p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                  {isEnglish ? "Where engineering rules become geometry." : "규칙이 선이 되는 순간."}
                </h2>
              </div>
              <p className="navy-intro-copy max-w-2xl text-lg leading-8 text-slate-300 lg:justify-self-end">
                {isEnglish
                  ? "Live footage of the agent moving across 16 smoke-control zones in eight buildings, placing fan and damper blocks, and generating compliant ductwork on a new editable layer."
                  : "8개 동, 16개 제연구역을 이동하며 팬·댐퍼 블록을 배치하고, 계산 결과와 설계 제약에 맞는 덕트를 새 레이어에 생성하는 실제 화면입니다."}
              </p>
            </div>

            <figure className="live-video-frame mt-14">
              <div className="live-video-bar">
                <div className="flex items-center gap-2">
                  <span className="live-indicator" aria-hidden="true" />
                  <span>LIVE PRODUCT FOOTAGE</span>
                </div>
                <span className="hidden text-slate-500 sm:inline">SMOKE CONTROL AGENT · STEP 3</span>
              </div>
              <video
                className="live-product-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/product/smoke-control-agent-poster.jpg"
                aria-label={isEnglish ? "Live footage of the smoke-control agent generating fans, dampers, and ducts across 16 zones" : "제연설계 에이전트가 16개 제연구역에 팬, 댐퍼, 덕트를 자동으로 작도하는 실제 제품 녹화"}
              >
                <source src="/product/smoke-control-agent-live.mp4" type="video/mp4" />
              </video>
              <figcaption className="live-video-caption">
                <span>{isEnglish ? "LIVE PRODUCT" : "실제 제품 화면"}</span>
                <p>
                  {isEnglish
                    ? "The agent identifies fan rooms and dry areas, then routes intake and discharge ducts along optimized paths."
                    : "팬룸과 DA를 판독하고, 흡입·토출 덕트를 최적 경로로 순차 작도합니다."}
                </p>
                <strong>8 BUILDINGS · 16 ZONES</strong>
              </figcaption>
            </figure>

            <div className="result-zoom-grid mt-6">
              <button
                type="button"
                className="result-zoom-card before"
                onClick={() => setPreview({ src: cadBefore, alt: isEnglish ? "Source CAD drawing" : "자동 작도 전 CAD 도면", label: "Before" })}
              >
                <div className="result-zoom-image"><img src={cadBefore} alt="" /></div>
                <span className="result-state-badge">BEFORE</span>
                <div className="result-zoom-copy">
                  <span>BEFORE · SOURCE DRAWING</span>
                  <strong>{isEnglish ? "An unworked floor plan" : "설비가 없는 원본 평면도"}</strong>
                  <p>{isEnglish ? "No equipment, routes, or generated layers" : "팬·댐퍼·덕트 및 생성 레이어 없음"}</p>
                </div>
              </button>
              <button
                type="button"
                className="result-zoom-card after"
                onClick={() => setPreview({ src: cadAfter, alt: isEnglish ? "AI-generated CAD layout" : "AI 자동 작도 결과", label: "After" })}
              >
                <div className="result-zoom-image"><img src={cadAfter} alt="" /></div>
                <span className="result-state-badge after">AFTER</span>
                <div className="result-zoom-copy">
                  <span>AFTER · AI-GENERATED LAYER</span>
                  <strong>{isEnglish ? "A complete, editable system layout" : "편집 가능한 제연설비 자동 작도"}</strong>
                  <div className="result-metrics">
                    <p><b>16</b>{isEnglish ? "zones" : "제연구역"}</p>
                    <p><b>3</b>{isEnglish ? "component types" : "설비 유형"}</p>
                    <p><b>1</b>{isEnglish ? "editable layer" : "편집 레이어"}</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="rules-grid mt-10">
              {rules.map((rule, index) => (
                <div key={rule} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
                  <span className="font-mono text-[10px] text-blue-400">0{index + 1}</span>
                  <span className="text-sm text-slate-300">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-section bg-white py-20 md:py-24">
          <div className="site-shell">
            <div className="partner-intro">
              <p className="section-kicker">BUILT WITH INDUSTRY EXPERTS</p>
              <p>
                {isEnglish
                  ? "Developed in collaboration with a smoke-control engineering specialist."
                  : "제연설비 전문기업의 실무 지식과 함께 개발하고 있습니다."}
              </p>
            </div>
            <div className="partner-card partner-card-compact">
              <div className="partner-logo-panel">
                <p>INDUSTRY DESIGN PARTNER</p>
                <a
                  href="https://www.globalenp.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={isEnglish ? "Open Global ENP website in a new tab" : "글로벌이앤피 공식 홈페이지 새 창에서 열기"}
                >
                  <img src={globalEnpLogo} alt="Global ENP" loading="lazy" />
                </a>
                <span>SMOKE CONTROL SPECIALIST</span>
              </div>
              <div className="partner-story">
                <div className="partner-status"><span aria-hidden="true" /> PILOT VALIDATION</div>
                <h2>{isEnglish ? "Validated with real engineering practice." : "실제 설계 방식으로 검증합니다."}</h2>
                <p>
                  {isEnglish
                    ? "Global ENP’s field practices and engineering rules inform the smoke-control agent. The system is currently undergoing final validation on production drawings ahead of operational deployment."
                    : "글로벌이앤피의 실제 작업 방식과 현장 규칙을 제연설계 에이전트에 반영하고 있으며, 현재 실무 적용 전 실제 도면을 기반으로 최종 검증하고 있습니다."}
                </p>
                <div className="partner-evidence">
                  {(isEnglish
                    ? ["Developed with Global ENP", "Real project drawings", "Field workflow encoded"]
                    : ["글로벌이앤피와 공동 검증", "실제 프로젝트 도면 기반", "현업 설계 방식 반영"]
                  ).map((item) => (
                    <span key={item}><Check className="h-3.5 w-3.5" />{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 md:py-32">
          <div className="site-shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">EXPERT IN CONTROL</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                {isEnglish ? "When an engineer moves a component," : "설계자가 위치를 바꾸면,"}
                <br className="desktop-break" />
                {" "}
                {isEnglish ? "the agent redraws within the rules." : "에이전트가 규칙에 맞춰 다시 그립니다."}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {isEnglish
                  ? "A human-in-the-loop workflow is in development: move a fan or reshape a duct, and the agent recalculates the connected route while preserving the governing design constraints."
                  : "팬이나 덕트 위치를 직접 조정하면 기존 규칙을 유지한 채 연결 경로를 다시 계산하는 Human-in-the-loop 기능을 개발하고 있습니다."}
              </p>
            </div>
            <div className="relative mx-auto mt-14 max-w-6xl">
              <div className="concept-badge">
                <Sparkles className="h-3.5 w-3.5" />
                IN DEVELOPMENT · CONCEPT PREVIEW
              </div>
              <ProductWindow
                src={hitlConcept}
                alt={isEnglish ? "Concept preview of the human-in-the-loop CAD workflow in development" : "개발 중인 Human-in-the-loop CAD 기능 콘셉트 화면"}
                label="HUMAN-IN-THE-LOOP · CONCEPT"
                className="hitl-desktop-view"
                onOpen={() =>
                  setPreview({
                    src: hitlConcept,
                    alt: isEnglish ? "Human-in-the-loop concept in development" : "Human-in-the-loop 개발 콘셉트",
                    label: isEnglish ? "In development · Concept preview" : "개발 중 · 콘셉트 프리뷰",
                  })
                }
              />
              <div className="hitl-mobile-story" aria-label={isEnglish ? "Human-in-the-loop concept workflow" : "Human-in-the-loop 콘셉트 워크플로"}>
                <div className="hitl-mobile-frame drawing">
                  <img src={hitlConcept} alt="" />
                  <span>BEFORE</span>
                  <strong>{isEnglish ? "The engineer moves the fan" : "설계자가 팬 위치를 변경"}</strong>
                </div>
                <div className="hitl-mobile-frame constraints">
                  <img src={hitlConcept} alt="" />
                  <span>AFTER</span>
                  <strong>{isEnglish ? "The agent reroutes within constraints" : "에이전트가 규칙 안에서 재작도"}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vision" className="vision-section border-y border-slate-200 py-24 md:py-32">
          <div className="site-shell">
            <div className="section-heading">
              <p className="section-kicker">THE PATH TO VIBE CAD</p>
              <h2>
                {isEnglish ? "Starting with the most demanding rules." : "가장 어려운 설계부터,"}
                <br className="desktop-break" />
                {" "}
                {isEnglish ? "Expanding to every design domain." : "모든 엔지니어링 분야로 확장합니다."}
              </h2>
              <p>
                {isEnglish
                  ? "Korean fire-protection engineering is not the destination. It is the rigorous proving ground for a general-purpose design execution engine."
                  : "한국 소방은 목적지가 아니라 범용 설계 엔진을 단련하는 가장 정교한 출발점입니다."}
              </p>
            </div>
            <div className="relative mt-16 grid gap-4 lg:grid-cols-3">
              {(isEnglish
                ? [
                    {
                      state: "AVAILABLE NOW",
                      title: "Smoke Control Agent",
                      body: "Core technology validated across drawing analysis, CAD measurement, calculation, and rule-based drafting",
                      icon: Layers3,
                      active: true,
                    },
                    {
                      state: "IN DEVELOPMENT",
                      title: "Fire Protection Agent",
                      body: "An execution engine designed to handle regulations, multiple systems, and field exceptions",
                      icon: FileCode2,
                      active: false,
                    },
                    {
                      state: "OUR DIRECTION",
                      title: "VibeCAD Platform",
                      body: "A general design environment where users can encode their own rules and automate domain-specific workflows",
                      icon: Sparkles,
                      active: false,
                    },
                  ]
                : [
                    {
                      state: "AVAILABLE NOW",
                      title: "제연설계 에이전트",
                      body: "도면 분석·실측·규칙 작도의 코어 기술 검증",
                      icon: Layers3,
                      active: true,
                    },
                    {
                      state: "IN DEVELOPMENT",
                      title: "소방설계 에이전트",
                      body: "외부 법규, 이종 설비, 현장 예외를 다루는 실행 엔진",
                      icon: FileCode2,
                      active: false,
                    },
                    {
                      state: "OUR DIRECTION",
                      title: "VibeCAD 플랫폼",
                      body: "사용자가 자기 규칙을 넣어 어느 도메인에서나 설계",
                      icon: Sparkles,
                      active: false,
                    },
                  ]
              ).map((item, index) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className={`vision-card ${item.active ? "active" : ""}`}>
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6" />
                      <span className="font-mono text-xs opacity-40">0{index + 1}</span>
                    </div>
                    <p className="mt-12 font-mono text-[10px] font-bold tracking-[0.16em] opacity-60">{item.state}</p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 opacity-70">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="company" className="bg-white py-24 md:py-32">
          <div className="site-shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <img
                src={fullLogo}
                alt="Synthya"
                loading="lazy"
                className="mb-8 w-full max-w-[28rem] mix-blend-multiply"
              />
              <p className="section-kicker">BUILT FOR PROFESSIONAL WORK</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.12] tracking-[-0.045em] md:text-5xl">
                {isEnglish ? "Turning complex workflows" : "복잡한 전문 업무를"}
                <br className="desktop-break" />
                {" "}
                {isEnglish ? "into executable AI systems." : "실행 가능한 AI로."}
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                {isEnglish
                  ? "Drawing on experience in model training and on-premise GPU operations, Synthya places engineering accuracy in a purpose-built execution engine—not in probabilistic model output alone."
                  : "신티아는 모델을 직접 훈련하고 온프레미스 GPU를 운영해온 경험을 바탕으로, 설계의 정확성을 모델의 추측이 아닌 실행 엔진에 설계했습니다."}
              </p>
            </div>
            <div className="grid gap-3">
              {(isEnglish ? [
                ["2020", "Founded in South Korea"],
                ["4 months", "From domain study to working agent"],
                ["700MB+", "Large drawing file validated"],
              ] : [
                ["2020", "대한민국에서 설립"],
                ["4개월", "도메인 연구에서 작동 에이전트까지"],
                ["700MB+", "대형 도면 파일 처리 검증"],
              ]).map(([value, label]) => (
                <div key={label} className="metric-row">
                  <strong>{value}</strong>
                  <span>{label}</span>
                  <MoveUpRight className="h-4 w-4 text-blue-600" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-blue-600 py-20 text-white md:py-24">
          <div className="site-shell flex flex-col items-start justify-between gap-9 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-blue-100">START WITH ONE DRAWING</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                {isEnglish ? "Show us the drawing your team repeats the most." : "가장 반복적인 도면부터 보여주세요."}
              </h2>
              <p className="mt-4 text-blue-100">
                {isEnglish
                  ? "We will assess where automation can create measurable value within your current engineering workflow."
                  : "현재 작업 방식에 맞는 자동화 가능성을 함께 검토합니다."}
              </p>
            </div>
            <a
              href={`mailto:business@synthya.ai?subject=${isEnglish ? "Vibe%20CAD%20Demo%20Request" : "Vibe%20CAD%20데모%20요청"}`}
              className="button-white shrink-0"
            >
              {isEnglish ? "Request a demo" : "데모 요청하기"} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer language={language} />

      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712]/90 p-3 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={isEnglish ? `Enlarged view: ${preview.label}` : `${preview.label} 이미지 크게 보기`}
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-8 md:top-8"
            aria-label={isEnglish ? "Close" : "닫기"}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="max-h-[90vh] max-w-[96vw]" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between text-white">
              <span className="font-mono text-xs tracking-wide">{preview.label}</span>
              <span className="text-xs text-white/50">
                {isEnglish ? "Press ESC or click outside to close" : "ESC 또는 바깥 영역을 눌러 닫기"}
              </span>
            </div>
            <img src={preview.src} alt={preview.alt} className="max-h-[84vh] max-w-full rounded-xl object-contain shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
