import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Box,
  Braces,
  BrainCircuit,
  Building2,
  Calculator,
  Check,
  ChevronRight,
  Download,
  Database,
  Eye,
  Factory,
  FileCode2,
  Hand,
  Layers3,
  MessageSquare,
  Maximize2,
  Network,
  Ruler,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Unplug,
  Workflow,
  X,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import cadBefore from "@/assets/product/cad-before-real.png";
import cadAfter from "@/assets/product/cad-after-real.png";
import hitlConcept from "@/assets/product/hitl-concept-preview-v1.png";
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
    title: "계산 대상 구역 식별",
    description:
      "전체 도면에서 부속실이 있는 평면도를 찾고, 각 계산 영역을 점선으로 구분.",
    icon: ScanSearch,
    eyebrow: "도면 판독",
    result: "8개 동 · 16개 제연구역",
    tags: ["평면도", "부속실", "문·창문"],
  },
  {
    index: "02",
    title: "CAD 도구 기반 실측",
    description:
      "연결된 문과 창문을 CAD 줄자로 측정하고, 부속실별 계산에 필요한 값으로 연결.",
    icon: Ruler,
    eyebrow: "실측·계산",
    result: "수작업 실측·입력 자동화",
    tags: ["CAD 실측", "계산 로직", "설계 제약"],
  },
  {
    index: "03",
    title: "팬·댐퍼·덕트 작도",
    description:
      "팬룸과 DA를 판독한 뒤 승인된 블록을 배치하고, 설계 제약 안에서 덕트 경로를 생성.",
    icon: Workflow,
    eyebrow: "규칙 기반 작도",
    result: "팬 · 댐퍼 · 덕트 레이어",
    tags: ["팬·댐퍼 블록", "덕트 경로", "편집 레이어"],
  },
  ],
  en: [
    {
      index: "01",
      title: "Identify calculation zones",
      description:
        "Visual reasoning locates smoke-control vestibules and delineates every calculation zone across the drawing set.",
      icon: ScanSearch,
      eyebrow: "READ DRAWINGS",
      result: "8 buildings · 16 smoke-control zones",
      tags: ["Floor plans", "Vestibules", "Doors & windows"],
    },
    {
      index: "02",
      title: "Measure in CAD",
      description:
        "Native CAD tools measure connected doors and windows, feeding real geometry into the calculation workflow.",
      icon: Ruler,
      eyebrow: "APPLY RULES",
      result: "Automated measurement and data entry",
      tags: ["CAD measurement", "Calculations", "Constraints"],
    },
    {
      index: "03",
      title: "Draft the system",
      description:
        "Approved fan and damper blocks are placed before intake and discharge ducts are routed within design constraints.",
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
  const previewCloseButtonRef = useRef<HTMLButtonElement>(null);
  const previewTriggerRef = useRef<HTMLElement | null>(null);
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

    previewTriggerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => previewCloseButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
      if (event.key === "Tab") {
        event.preventDefault();
        previewCloseButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previewTriggerRef.current?.focus();
      previewTriggerRef.current = null;
    };
  }, [preview]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f9fb] text-[#0b1220]">
      <a href="#main-content" className="skip-link">
        {isEnglish ? "Skip to main content" : "본문으로 바로가기"}
      </a>
      <Navbar language={language} onLanguageChange={handleLanguageChange} />

      <main id="main-content" className="flex flex-col">
        <section className="hero-grid relative order-1 overflow-hidden border-b border-slate-200/80">
          <div className="hero-glow" />
          <div className="site-shell relative z-10 pt-20 pb-16 md:pt-24 md:pb-24">
            <div className="hero-stage">
            <div className="hero-copy max-w-5xl">
              <div className="hero-technical-label mb-7">
                <span aria-hidden="true" />
                VIBE CAD / AI DESIGN AGENT
              </div>
              <h1 className="display-title max-w-5xl">
                <span className="hero-title-line">{isEnglish ? "From engineering drawings" : "엔지니어링 도면에서"}</span>
                <span className="hero-title-line text-blue-600">{isEnglish ? "to editable CAD." : "편집 가능한 CAD까지."}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-balance text-lg leading-8 text-slate-600 md:text-xl">
                {isEnglish
                  ? "VibeCAD reads drawings, applies company engineering standards, and produces editable CAD geometry in the browser."
                  : "회사의 설계 기준에 따라 도면 판독부터 실측, 계산, 작도까지 하나의 흐름으로 연결하는 VibeCAD"}
              </p>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
                <a href="#demo-request" data-demo-request className="button-primary">
                  {isEnglish ? "Request a demo" : "데모 요청"} <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#technology-in-action" className="button-secondary">
                  {isEnglish ? "View the product in action" : "실제 작동 화면"} <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="hero-motion relative max-w-[1360px]">
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
          </div>
        </section>

        <section id="product" className="product-section order-2 bg-white py-24 md:py-32">
          <div className="site-shell">
            <div className="section-heading">
              <h2>
                {isEnglish ? "Drawing analysis. Measurement. Drafting." : "판독부터 실측, 작도까지."}
                <br className="desktop-break" />
                {" "}
                {isEnglish ? "One continuous engineering workflow." : "하나로 이어지는 설계 흐름."}
              </h2>
              <p>
                {isEnglish
                  ? "Three purpose-built stages follow the way smoke-control engineers already work, while removing the repetitive manual steps."
                  : "제연 엔지니어의 실제 작업 순서를 세 단계로 구현해 반복적인 수작업을 줄인 설계 흐름"}
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
                  <h3>{isEnglish ? "Every smoke-control zone, located across the drawing set." : "전체 도면에서 찾아낸 제연구역."}</h3>
                </div>
                <p>
                  {isEnglish
                    ? "The agent reviews every floor plan and marks each vestibule calculation zone with a dashed boundary."
                    : "관련 평면도를 판독하고 부속실별 계산 영역을 점선으로 표시"}
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

        <section id="intelligence" className="knowledge-section order-7 border-t border-slate-100 py-24 md:py-32">
          <div className="site-shell">
            <div className="knowledge-declaration mx-auto max-w-5xl text-center">
              <h2 className="font-semibold leading-[1.08] tracking-[-0.055em]">
                {isEnglish ? "One core platform." : "하나의 기술 기반."}
                <br className="desktop-break" />
                {" "}
                <span className="text-blue-600">
                  {isEnglish ? "A private design agent for every company." : "고객마다 독립된 설계 에이전트."}
                </span>
              </h2>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">
                {isEnglish
                  ? "Synthya Core provides the shared CAD intelligence and execution layer. Drawings, calculations, rules, and expert feedback remain specific to each company’s agent."
                  : "도면 처리와 CAD 실행을 담당하는 Synthya Core. 도면과 계산식, 설계 규칙, 전문가 피드백은 고객 전용 에이전트 안에서만 활용"}
              </p>
            </div>

            <h3 className="implementation-flow-title">{isEnglish ? "Proven in fire-safety design. Expanding across engineering domains from 2027." : "소방설계에서 검증하고, 2027년부터 인접 엔지니어링 도메인으로 확장"}</h3>

            <figure className="implementation-system-map mt-5">
              <div className="system-map-heading">
                <div><span>TARGET MARKETS · PRIVATE CUSTOMER AGENTS</span><strong>{isEnglish ? "Multiple customers in every market. One isolated agent for each customer." : "각 타깃 시장 안의 여러 고객사, 고객마다 독립적으로 구축되는 전용 에이전트"}</strong></div>
                <p><Unplug aria-hidden="true" />{isEnglish ? "Each agent’s capabilities remain exclusive to its company" : "각 회사의 에이전트 역량은 다른 회사와 공유되지 않음"}</p>
              </div>

              <div className="private-agent-lineup">
                {[
                  { icon: Workflow, market: "TARGET MARKET 01", ko: "제연·연기제어 설계", en: "Smoke-control design", stage: "current" },
                  { icon: Layers3, market: "TARGET MARKET 02", ko: "수계 소화설비 설계", en: "Water-based systems", stage: "planned" },
                  { icon: Eye, market: "TARGET MARKET 03", ko: "경보·소방전기 설계", en: "Alarm & electrical", stage: "planned" },
                  { icon: Factory, market: "TARGET MARKET 04", ko: "가스계·특수소화 설계", en: "Special suppression", stage: "planned" },
                  { icon: Network, market: "TARGET MARKET 05", ko: "피난·소화활동설비", en: "Evacuation & response", stage: "planned" },
                ].map((domain, domainIndex) => {
                  const Icon = domain.icon;
                  return (
                    <div className={`domain-market-card ${domain.stage}`} key={domain.market}>
                      <div className="domain-market-heading"><span className="agent-symbol"><Icon aria-hidden="true" /></span><small>{domain.market}</small></div>
                      <strong>{isEnglish ? domain.en : domain.ko}</strong>
                      <div className="customer-agent-stack">
                        {["A", "B", "C"].map((customer, customerIndex) => (
                          <span className={domainIndex === 0 && customerIndex === 0 ? "validated" : ""} key={customer}>
                            <Box aria-hidden="true" />
                            {domainIndex === 0 && customerIndex === 0
                              ? (isEnglish ? "PARTNER AGENT · VALIDATION" : "파트너 전용 에이전트 · 검증 중")
                              : (isEnglish ? `CUSTOMER ${customer} AGENT` : `고객 ${customer} 전용 에이전트`)}
                          </span>
                        ))}
                      </div>
                      <em>{isEnglish ? "Same market, independently built" : "같은 시장에서도 각각 독립 구축"}</em>
                      <i aria-hidden="true" />
                    </div>
                  );
                })}
                <div className="domain-market-card next-domain">
                  <div className="domain-market-heading"><span className="agent-symbol">∞</span><small>2027 · NEXT MARKETS</small></div>
                  <strong>{isEnglish ? "Manufacturing · plant · building systems" : "제조·플랜트·건축설비로 확장"}</strong>
                  <div className="customer-agent-stack future">
                    {["01", "02", "∞"].map((customer) => <span key={customer}><Box aria-hidden="true" />{isEnglish ? `PRIVATE AGENT ${customer}` : `고객 전용 에이전트 ${customer}`}</span>)}
                  </div>
                  <em>{isEnglish ? "The same customer-isolated model" : "동일한 고객별 독립 구축 방식"}</em>
                  <i aria-hidden="true" />
                </div>
              </div>

              <div className="system-connection-rail" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>

              <div className="synthya-core-platform">
                <div className="core-platform-title">
                  <span>SYNTHYA CORE</span>
                  <strong>{isEnglish ? "Shared core technology and agent execution skills" : "모든 전용 에이전트가 사용하는 공통 기반 기술과 실행 스킬"}</strong>
                </div>
                <div className="core-platform-capabilities">
                  {[
                    { icon: Maximize2, ko: "브라우저 기반 CAD", en: "Browser-native CAD" },
                    { icon: FileCode2, ko: "DWG·DXF 파싱", en: "DWG · DXF parsing" },
                    { icon: Eye, ko: "도면 정보 판독", en: "Drawing intelligence" },
                    { icon: Ruler, ko: "CAD 도구 실측", en: "CAD measurement" },
                    { icon: Workflow, ko: "규칙 기반 작도", en: "Rule-based drafting" },
                    { icon: Download, ko: "DXF 다운로드", en: "DXF export" },
                    { icon: Layers3, ko: "700MB+ 대형 도면", en: "700MB+ drawings" },
                  ].map((capability) => {
                    const Icon = capability.icon;
                    return <div key={capability.en}><Icon aria-hidden="true" /><span>{isEnglish ? capability.en : capability.ko}</span></div>;
                  })}
                </div>
              </div>

              <figcaption>
                <Box aria-hidden="true" />
                <span>{isEnglish ? "Customer × market × workflow = one private agent. Only Synthya Core is shared." : "고객사 × 타깃 시장 × 설계 업무 = 하나의 전용 에이전트. 공유되는 것은 Synthya Core뿐"}</span>
              </figcaption>
            </figure>

            <h3 className="implementation-flow-title">{isEnglish ? "Company knowledge becomes design capability." : "회사의 지식이 설계 역량으로 전환되는 과정"}</h3>

            <figure className="omni-design-relationship">
              <div className="omni-relationship-heading">
                <p><span>SYNTHYA DIFFERENCE</span><strong>{isEnglish ? "Omni Intelligence determines capability and accelerates development." : "설계 수준과 개발 속도를 결정하는 Omni Intelligence"}</strong></p>
                <small>{isEnglish ? "Domain knowledge moves between agents instead of being relearned by developers" : "개발자가 도메인을 다시 배우는 대신, 에이전트가 필요한 지식을 직접 습득"}</small>
              </div>

              <div className="omni-relationship-flow">
                <div className="company-knowledge-inputs">
                  <div className="relationship-column-label"><span>01</span><strong>{isEnglish ? "COMPANY KNOWLEDGE" : "회사의 지식"}</strong></div>
                  {[
                    { icon: Database, ko: "프로젝트·도면·계산서", en: "Projects, drawings & calculations" },
                    { icon: FileCode2, ko: "설계 기준·법령·규칙", en: "Standards, regulations & rules" },
                    { icon: MessageSquare, ko: "전문가의 암묵지·예외 판단", en: "Tacit knowledge & exceptions" },
                    { icon: RefreshCw, ko: "검증 결과·수정 피드백", en: "Validation and correction feedback" },
                  ].map((source) => {
                    const Icon = source.icon;
                    return <div className="knowledge-input-chip" key={source.en}><Icon aria-hidden="true" /><span>{isEnglish ? source.en : source.ko}</span></div>;
                  })}
                  <p className="company-input-note"><Check aria-hidden="true" />{isEnglish ? "Connected without replacing existing ERP, NAS, or project workflows" : "기존 ERP·NAS·프로젝트 업무 방식을 바꾸지 않고 연결"}</p>
                </div>

                <div className="relationship-transfer into-omni" aria-hidden="true"><span /><ArrowRight /></div>

                <div className="omni-intelligence-node">
                  <span className="omni-node-orbit one" aria-hidden="true" />
                  <span className="omni-node-orbit two" aria-hidden="true" />
                  <div className="omni-node-icon"><BrainCircuit aria-hidden="true" /></div>
                  <small>02 · OMNI INTELLIGENCE</small>
                  <strong>{isEnglish ? "The company knowledge layer" : "회사의 지식 기반"}</strong>
                  <p>{isEnglish ? "Captures project knowledge with its source, structures expert judgment, and keeps validated rules current." : "프로젝트 지식의 출처를 보존하고 전문가 판단을 구조화해 검증된 규칙을 최신 상태로 유지"}</p>
                  <div className="omni-node-functions">
                    {(isEnglish ? ["Ingest & parse", "Structure", "Source trace", "Validate & update"] : ["수집·파싱", "구조화", "출처 추적", "검증·업데이트"]).map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>

                <div className="relationship-transfer into-design">
                  <p>{isEnglish ? "Rules · context · precedents · exceptions" : "규칙 · 맥락 · 선례 · 예외"}</p>
                  <span aria-hidden="true" /><ArrowRight aria-hidden="true" />
                  <small><Braces aria-hidden="true" />{isEnglish ? "Developer orchestrates tools and interaction" : "개발자는 도구와 상호작용을 연결"}</small>
                </div>

                <div className="design-agent-output">
                  <div className="relationship-column-label"><span>03</span><strong>{isEnglish ? "DESIGN AGENT" : "설계 에이전트"}</strong></div>
                  <div className="design-agent-core"><Workflow aria-hidden="true" /><p><strong>{isEnglish ? "Domain design agent" : "도메인 전용 설계 에이전트"}</strong><span>{isEnglish ? "Executes repeatable engineering work" : "반복되는 전문 설계 업무를 실행"}</span></p></div>
                  <div className="design-capability-grid">
                    {[
                      { icon: Eye, ko: "도면 판독", en: "Interpret" },
                      { icon: Ruler, ko: "실측", en: "Measure" },
                      { icon: Calculator, ko: "계산", en: "Calculate" },
                      { icon: Layers3, ko: "작도", en: "Draft" },
                    ].map((ability) => {
                      const Icon = ability.icon;
                      return <span key={ability.en}><Icon aria-hidden="true" />{isEnglish ? ability.en : ability.ko}</span>;
                    })}
                  </div>
                </div>
              </div>

              <figcaption>
                <div><ShieldCheck aria-hidden="true" /><p><strong>{isEnglish ? "Higher design capability" : "설계 수준 향상"}</strong><span>{isEnglish ? "Knowledge breadth, quality, and validation determine real-world reliability." : "지식의 범위와 품질, 검증 수준이 좌우하는 실제 업무 역량과 신뢰도"}</span></p></div>
                <div><Braces aria-hidden="true" /><p><strong>{isEnglish ? "Faster agent development" : "개발 속도 향상"}</strong><span>{isEnglish ? "Developers focus on tools and orchestration instead of relearning an entire engineering domain." : "도메인 재학습 대신 도구와 에이전트 상호작용 구현에 집중하는 개발 방식"}</span></p></div>
              </figcaption>
            </figure>

            <h3 className="implementation-flow-title">{isEnglish ? "From company knowledge to commercial automation." : "회사 지식에서 상용 설계 자동화까지"}</h3>

            <div className="agent-build-section">
              <div className="agent-build-heading">
                <h2>{isEnglish ? "Commercial automation starts with the work your company already knows." : "회사가 이미 축적한 업무에서 시작하는 상용 설계 자동화"}</h2>
                <p>{isEnglish ? "A production-grade agent needs more than a set of instructions. It needs the project data, exceptions, decisions, and tacit knowledge behind repeatable engineering work." : "몇 개의 지시문만으로는 부족한 실제 설계 자동화. 프로젝트 데이터와 예외, 의사결정, 문서화되지 않은 암묵지까지 확보해야 상용 수준의 업무 수행 가능"}</p>
              </div>

              <div className="build-option-grid">
                <article className="build-option-card direct">
                  <div className="build-option-topline"><span>DIRECT KNOWLEDGE BUILD</span><small>LIMITED SCOPE</small></div>
                  <h3>{isEnglish ? "For a narrow, already documented task" : "범위가 작고 이미 문서화된 업무"}</h3>
                  <p>{isEnglish ? "Your team supplies the complete rules, exceptions, source files, and validation needed for one tightly defined workflow." : "한정된 업무에 필요한 규칙과 예외, 자료, 검증 기준을 고객이 직접 정리해 제공"}</p>
                  <div className="build-requirements">
                    <strong>{isEnglish ? "WHAT DETERMINES THE RESULT" : "결과물을 결정하는 요소"}</strong>
                    <div className="agent-equation">
                      {(isEnglish ? ["Coverage", "Quality", "Consistency", "Validation"] : ["지식 범위", "자료 품질", "규칙 일관성", "전문가 검증"]).map((item, index) => (
                        <span key={item}>{index > 0 && <b>×</b>}{item}</span>
                      ))}
                    </div>
                    <p>{isEnglish ? "Performance cannot exceed the situations, rules, and exceptions supplied by the customer." : "고객이 제공한 상황과 규칙, 예외의 범위가 에이전트 성능의 한계"}</p>
                  </div>
                  <div className="best-fit"><Check aria-hidden="true" /><span>{isEnglish ? "Suitable for a limited pilot or a small, fixed workflow" : "소규모 검증이나 변화가 적은 한정 업무에 적합"}</span></div>
                </article>

                <article className="build-option-card omni">
                  <div className="build-option-topline"><span>OMNI-FIRST BUILD</span><small>SYNTHYA METHOD</small></div>
                  <h3>{isEnglish ? "The path to a production-grade design agent" : "상용 설계 에이전트를 만드는 신티아의 방법"}</h3>
                  <p>{isEnglish ? "We connect approved project sources and uncover the rules, precedents, exceptions, and tacit judgment embedded in real work. Experts validate what the Omni Agent has already structured." : "기존 프로젝트 자료에서 규칙과 선례, 예외, 암묵적 판단을 찾아 구조화하는 Omni Agent. 전문가는 정리된 내용을 검증하고 보완"}</p>
                  <div className="method-proof">
                    <ShieldCheck aria-hidden="true" />
                    <p><strong>{isEnglish ? "PROVEN IMPLEMENTATION PATH" : "검증된 상용화 경로"}</strong><span>{isEnglish ? "Used to build and validate Global ENP’s private smoke-control design agent." : "Global ENP 전용 제연설계 에이전트 구축과 실무 검증에 적용"}</span></p>
                  </div>
                  <div className="omni-build-flow">
                    {(isEnglish
                      ? [["01", "Connect", "Drawings · documents · email · ERP"], ["02", "Structure", "Projects · versions · decisions"], ["03", "Discover", "Rules · precedents · exceptions"], ["04", "Validate", "Expert review and correction"], ["05", "Deploy", "Private design agent"]]
                      : [["01", "연결", "도면 · 문서 · 이메일 · ERP"], ["02", "구조화", "프로젝트 · 버전 · 의사결정"], ["03", "발견", "규칙 · 선례 · 예외"], ["04", "검증", "전문가 확인과 보완"], ["05", "구축", "고객 전용 설계 에이전트"]]
                    ).map(([number, title, detail]) => (
                      <div key={number}><span>{number}</span><p><strong>{title}</strong><small>{detail}</small></p></div>
                    ))}
                  </div>
                  <div className="best-fit"><Check aria-hidden="true" /><span>{isEnglish ? "Designed for repeatable work where automation creates measurable operating value" : "규칙 기반 반복 설계를 대체해 실질적인 운영 효율을 만들어야 하는 조직에 권장"}</span></div>
                </article>
              </div>

              <div className="build-decision">
                <div><span>LIMITED PILOT</span><strong>{isEnglish ? "One narrow, fully documented task" : "작고 명확하게 문서화된 단일 업무"}</strong></div>
                <ArrowRight aria-hidden="true" />
                <div className="recommended"><span>COMMERCIAL AUTOMATION</span><strong>{isEnglish ? "Omni-first captures the knowledge behind repeatable work" : "반복 업무의 데이터와 암묵지를 확보하는 Omni-first"}</strong></div>
              </div>
            </div>

            <div className="omni-outcomes">
              <div className="omni-outcomes-copy">
                <h2>{isEnglish ? "One intelligence layer. More than one agent." : "하나의 지식 기반에서 시작되는 회사의 AX."}</h2>
                <p>{isEnglish ? "Because project knowledge stays connected and current, the same private intelligence layer can support additional tools for employees, project teams, and leadership." : "지속적으로 연결·업데이트되는 프로젝트 지식. 같은 고객 전용 지식 기반에서 직원, 프로젝트팀, 경영진을 위한 도구로 확장"}</p>
              </div>
              <div className="omni-outcome-grid">
                {[
                  { icon: Workflow, ko: "전용 설계 에이전트", en: "Private design agent", metaKo: "회사 규칙에 따른 판독·실측·계산·작도", metaEn: "Analysis, measurement, calculation, and drafting" },
                  { icon: BrainCircuit, ko: "Project Copilot", en: "Project Copilot", metaKo: "프로젝트 전체를 이해하는 사내 질의 에이전트", metaEn: "Answers grounded in live project knowledge" },
                  { icon: Network, ko: "실시간 프로젝트 대시보드", en: "Live project dashboard", metaKo: "부서가 함께 보는 진행·변경·승인 현황", metaEn: "Shared progress, changes, approvals, and risks" },
                  { icon: Building2, ko: "부서별 내부 도구", en: "Enterprise intelligence tools", metaKo: "권한별 경영·원가·구매·현장 도구로 확장", metaEn: "Role-based tools for finance, operations, and leadership" },
                ].map((item) => {
                  const Icon = item.icon;
                  return <article key={item.en}><Icon aria-hidden="true" /><div><strong>{isEnglish ? item.en : item.ko}</strong><p>{isEnglish ? item.metaEn : item.metaKo}</p></div></article>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="product-architecture" className="precision-grid order-3 border-y border-slate-200 py-24 md:py-32">
          <div className="site-shell grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <h2 className="mt-4 max-w-lg text-4xl font-semibold leading-[1.12] tracking-[-0.045em] md:text-5xl">
                {isEnglish ? "Reason with AI." : "판단은 AI로."}
                <br className="desktop-break" />
                {" "}
                <span className="text-blue-600">{isEnglish ? "Execute with CAD." : "실행은 CAD로."}</span>
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-8 text-slate-600">
                {isEnglish
                  ? "Language and vision models interpret the task. Synthya’s proprietary CAD engine handles measurement, calculation, and drafting."
                  : "언어·비전 모델의 작업 해석과 신티아 자체 CAD 엔진의 실측·계산·작도"}
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

        <section id="technology-in-action" className="order-4 bg-[#07101f] py-24 text-white md:py-32">
          <div className="site-shell">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="section-kicker text-blue-400">REAL WORK, NOT A MOCKUP</p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                  {isEnglish ? "Engineering rules, drawn into CAD." : "설계 규칙이 도면 위에 구현되는 과정."}
                </h2>
              </div>
              <p className="navy-intro-copy max-w-2xl text-lg leading-8 text-slate-300 lg:justify-self-end">
                {isEnglish
                  ? "Across eight buildings and 16 smoke-control zones, the agent places approved components and routes ductwork on a new editable layer."
                  : "8개 동, 16개 제연구역에 팬·댐퍼 블록을 배치하고, 설계 규칙에 따라 덕트를 새 편집 레이어에 작도"}
              </p>
            </div>

            <figure className="live-video-frame mt-14">
              <div className="live-video-bar">
                <div className="flex items-center gap-2">
                  <span className="live-indicator" aria-hidden="true" />
                  <span>LIVE PRODUCT FOOTAGE</span>
                </div>
                <span className="hidden text-slate-500 sm:inline">
                  {isEnglish ? "CAD DESIGN AGENT · STEP 3" : "CAD 설계·작도 에이전트 · STEP 3"}
                </span>
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
                    ? "Fan rooms and dry areas identified. Intake and discharge ducts routed along optimized paths."
                    : "팬룸·DA 판독 · 흡입·토출 덕트 최적 경로 작도"}
                </p>
                <strong>8 BUILDINGS · 16 ZONES</strong>
              </figcaption>
            </figure>

            <div className="result-zoom-grid mt-6">
              <p className="result-comparison-note">
                {isEnglish ? "BUILDING 107 · BASEMENT LEVEL 1 · SAME VIEW AND SCALE" : "107동 지하 1층 · 동일 구역 · 동일 배율"}
              </p>
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

        <section className="partner-section order-6 bg-white py-20 md:py-24">
          <div className="site-shell">
            <div className="partner-intro">
              <p>
                {isEnglish
                  ? "Built with the field expertise of a smoke-control engineering specialist."
                  : "제연설비 전문기업의 현업 지식과 함께 만든 설계 흐름"}
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
                <h2>{isEnglish ? "Validation grounded in real engineering work." : "실제 제연설계 방식으로 검증 중."}</h2>
                <p>
                  {isEnglish
                    ? "Global ENP’s field practices and engineering rules shape the smoke-control agent, now in final pre-deployment validation on real project drawings."
                    : "글로벌이앤피의 작업 방식과 현장 규칙을 반영한 에이전트. 실제 프로젝트 도면을 활용해 실무 적용 전 최종 검증 진행 중"}
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

        <section id="human-in-the-loop" className="hitl-section-bg order-5 py-20 md:py-24">
          <div className="site-shell">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-4xl">
                {isEnglish ? "Engineering intent stays in control." : "엔지니어의 수정까지 이어지는"}
                <br className="desktop-break" />
                {" "}
                {isEnglish ? "The system adapts around it." : "하나의 설계 흐름."}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
                {isEnglish
                  ? "In development: move a fan or reshape a duct, and the agent recalculates the connected route while preserving the governing constraints."
                  : "팬이나 덕트를 직접 조정하면 연결 경로와 설계 제약을 다시 계산하는 Human-in-the-loop 기능 개발 중"}
              </p>
            </div>
            <div className="relative mx-auto mt-10 max-w-5xl">
              <div className="concept-badge">
                <Sparkles className="h-3.5 w-3.5" />
                IN DEVELOPMENT · CONCEPT PREVIEW
              </div>
              <div className="hitl-interaction-preview">
                <button
                  type="button"
                  className="hitl-canvas"
                  aria-label={isEnglish ? "Open the human-in-the-loop drawing concept" : "Human-in-the-loop 도면 콘셉트 크게 보기"}
                  onClick={() =>
                    setPreview({
                      src: hitlConcept,
                      alt: isEnglish ? "Human-in-the-loop concept in development" : "Human-in-the-loop 개발 콘셉트",
                      label: isEnglish ? "In development · Concept preview" : "개발 중 · 콘셉트 프리뷰",
                    })
                  }
                >
                  <img src={hitlConcept} alt={isEnglish ? "Orange agent-generated duct route and pink engineer-adjusted route" : "주황색 에이전트 작도 경로와 핑크색 엔지니어 수정 경로"} />
                  <div className="hitl-legend">
                    <span className="agent"><i />{isEnglish ? "AI-GENERATED ROUTE" : "AI 에이전트 작도"}</span>
                    <span className="engineer"><i />{isEnglish ? "ENGINEER ADJUSTMENT" : "엔지니어 수정"}</span>
                  </div>
                  <div className="hitl-drag-gesture" aria-hidden="true">
                    <span className="hitl-grab-point"><Hand /></span>
                    <span className="hitl-drag-line" />
                    <span className="hitl-target-point" />
                    <strong>GRAB &amp; MOVE</strong>
                  </div>
                </button>

                <div className="hitl-control-panel">
                  <div className="hitl-panel-heading">
                    <span>DIRECT MANIPULATION</span>
                    <strong>{isEnglish ? "Edit intent, not every CAD line." : "선을 다시 그리지 않고, 의도를 직접 조정."}</strong>
                  </div>
                  {[
                    {
                      number: "01",
                      title: isEnglish ? "Agent generates the route" : "에이전트가 경로 작도",
                      body: isEnglish ? "The orange geometry is generated from the approved design rules." : "승인된 설계 규칙에 따라 생성된 주황색 형상",
                      tone: "agent",
                    },
                    {
                      number: "02",
                      title: isEnglish ? "Engineer grabs and moves" : "엔지니어가 잡아서 이동",
                      body: isEnglish ? "Drag a segment or bend to express the required field adjustment." : "덕트 구간이나 꺾임을 끌어 현장에 필요한 수정 의도를 전달",
                      tone: "engineer",
                    },
                    {
                      number: "03",
                      title: isEnglish ? "Agent resolves the connections" : "에이전트가 연결부 재계산",
                      body: isEnglish ? "Connected geometry is redrawn while the governing constraints remain active." : "연결된 형상을 다시 작도하면서 기존 설계 제약은 그대로 유지",
                      tone: "resolved",
                    },
                  ].map((step) => (
                    <div className={`hitl-control-step ${step.tone}`} key={step.number}>
                      <span>{step.number}</span>
                      <div><strong>{step.title}</strong><p>{step.body}</p></div>
                    </div>
                  ))}
                  <p className="hitl-panel-note"><Sparkles aria-hidden="true" />IN DEVELOPMENT · INTERACTION CONCEPT</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="order-8 bg-blue-600 py-20 text-white md:py-24">
          <div className="site-shell flex flex-col items-start justify-between gap-9 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-blue-100">START WITH ONE DRAWING</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                {isEnglish ? "Start with one recurring drawing." : "반복되는 도면 한 장에서 시작."}
              </h2>
              <p className="mt-4 text-blue-100">
                {isEnglish
                  ? "Together, we’ll identify where automation can create measurable value in your current engineering workflow."
                  : "현재 설계 흐름에서 자동화 효과가 가장 큰 지점을 함께 검토"}
              </p>
            </div>
            <a href="#demo-request" data-demo-request className="button-white shrink-0">
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
            ref={previewCloseButtonRef}
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
