import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MessageSquare, Calculator, FileText, Shield, ExternalLink, Sparkles, Info, CheckSquare, Lock, ArrowRight, Sprout } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

interface DetailSection {
  title: string;
  subtitle?: string;
  items?: string[];
  description?: string;
  note?: string;
  steps?: { title: string; description: string }[];
  subsections?: { label: string; items: string[] }[];
}

interface DetailContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  sections: DetailSection[];
  summary: string;
}

const detailContents: Record<number, DetailContent> = {
  1: {
    heroTitle: "대화·영상 분석 AI 직원 (무료 체험)",
    heroSubtitle: "고객 대화와 현장 영상을 자동으로 읽고\n중요한 신호를 먼저 알려주는 AI 전담 사원",
    heroDescription: "통화 녹취, 상담 기록, 회의 음성, CCTV 영상까지 AI가 대신 분석하여 사람이 일일이 듣고 확인하지 않아도 문제가 생기기 전에 먼저 알려줍니다.",
    sections: [
      {
        title: "이런 업무에 활용됩니다",
        items: [
          "고객 불만 및 이탈 징후 탐지",
          "상담 품질 자동 평가",
          "반복 이슈 패턴 분석",
          "위험 상황 및 이상 행동 감지",
          "상담/현장 리포트 자동 생성"
        ],
        note: "콜센터가 아니어도 괜찮습니다. 매장 CCTV, 공장 현장, 물류센터, AS 방문 기록, 영업 통화, 내부 회의 녹음 등 듣거나 보는 업무가 있다면 어디든 적용 가능합니다."
      },
      {
        title: "POC 안내",
        subtitle: "POC(Proof of Concept)란, 실제 도입 전 우리 회사 환경에서 효과를 미리 확인해보는 무료 테스트입니다.",
        description: "본 체험은 최소 기능만 테스트 가능한 POC 버전입니다. 실제 고객에게 제공되는 Product는 다음과 같이 확장됩니다.",
        items: [
          "고객사 요청에 따른 기능 추가",
          "UI/UX 일부 커스터마이징",
          "회사 로고 및 브랜딩 적용",
          "내부 시스템 연동"
        ],
        note: "POC는 \"가능성 확인\"을 위한 버전이며, 납품 제품은 \"실무 사용\"을 기준으로 구축됩니다."
      },
      {
        title: "POC 사용 방법",
        steps: [
          {
            title: "1. 평가 가이드 업로드",
            description: "회사에서 사용 중인 직원 교육용 가이드 또는 상담 평가 기준표를 '평가 가이드 설정' 메뉴에 업로드합니다. AI는 해당 기준을 학습하여 상담을 자동 평가합니다."
          },
          {
            title: "2. 녹취 파일 업로드",
            description: "'녹취 파일 업로드' 메뉴에서 실제 상담 녹취 파일을 업로드합니다. 업로드 즉시 분석이 시작되며 리포트가 생성됩니다."
          }
        ]
      },
      {
        title: "생성되는 리포트",
        subsections: [
          {
            label: "직원 리포트",
            items: [
              "상담 점수",
              "개선 포인트",
              "주요 문제 구간",
              "코칭 가이드 제안"
            ]
          },
          {
            label: "대표/관리자 리포트",
            items: [
              "직원별 성과 비교",
              "반복 이슈 통계",
              "위험 고객/상담 알림",
              "전체 상담 품질 트렌드"
            ]
          }
        ],
        note: "직원 이메일로 자동 발송되도록 설정 가능합니다.\n모든 항목은 회사 운영 방식에 맞게 커스터마이징 가능합니다."
      },
      {
        title: "Product 납품 시 추가 제공 기능",
        description: "POC에서는 파일을 1개씩 업로드하지만 실제 Product 구축 시 아래 기능이 자동 적용됩니다.",
        items: [
          "기존 녹취 서버와 자동 연동",
          "신규 파일 실시간 자동 수집",
          "수동 업로드 제거",
          "대량 파일 일괄 처리",
          "사내 시스템/ERP/CRM 연계 가능"
        ],
        note: "즉, 별도 작업 없이 자동으로 분석이 이루어집니다."
      },
      {
        title: "POC 데이터 보안 안내",
        subtitle: "테스트에 사용된 파일은 저장되지 않습니다",
        description: "POC 체험 과정에서 업로드한 모든 파일은 오직 테스트 분석 용도로만 일시 처리됩니다.",
        items: [
          "다른 고객사와 절대 공유되지 않습니다",
          "외부로 전송되지 않습니다",
          "분석 완료 후 자동 삭제됩니다",
          "서버에 장기 보관되지 않습니다"
        ],
        note: "즉, 체험이 끝나면 데이터는 남지 않습니다.\n안심하고 실제 샘플 파일로 테스트하셔도 됩니다.\n\n※ 실제 Product 구축 시에는 고객사 전용 환경 또는 내부 서버(On-premise 포함)에만 저장됩니다."
      }
    ],
    summary: "이 AI 직원은 사람이 직접 듣고 확인하던 업무를 대신 수행하여 관리자와 직원 모두의 시간을 줄여줍니다.\n\n작게 테스트하고 효과를 확인한 뒤 회사 환경에 맞게 확장하는 방식으로 도입됩니다."
  },
  2: {
    heroTitle: "회계/정산 검증 AI 직원 (무료 체험)",
    heroSubtitle: "장부를 대신 확인하고, 실수와 이상 거래를\n먼저 잡아주는 AI 전담 사원",
    heroDescription: "거래 내역, 전표, 정산 데이터를 AI가 실시간으로 점검하여 사람이 놓치기 쉬운 숫자를 24시간 대신 감시합니다.",
    sections: [
      {
        title: "POC 안내",
        subtitle: "POC(Proof of Concept)란, 실제 도입 전 우리 회사 환경에서 효과를 미리 확인해보는 무료 테스트입니다.",
        description: "현재 POC에서는 분개장(Journal Entry) 테스트 기능만 제공됩니다.\n다른 계정과목, 원장, 매입/매출, 정산 등 추가 검증 항목은 실제 Product 구축 시 확장 가능합니다.\n\n실제 고객에게 제공되는 Product는 다음과 같이 확장됩니다.",
        items: [
          "고객사 요청 계정별 검증 추가",
          "UI/UX 커스터마이징",
          "회사 로고 및 브랜딩 적용",
          "ERP/회계 시스템 자동 연동"
        ],
        note: "POC는 \"동작 방식 확인\"을 위한 최소 버전이며\n납품 제품은 \"실무 자동화\" 기준으로 구축됩니다."
      },
      {
        title: "POC 사용 방법",
        steps: [
          {
            title: "1. ERP에서 엑셀 파일 다운로드",
            description: "현재 사용 중인 회계 시스템에서 분개장 데이터를 엑셀(.xlsx / .csv) 형식으로 다운로드합니다.\n\n예) 더존, 이카운트(ECOUNT), 기타 ERP/회계 프로그램"
          },
          {
            title: "2. 파일 업로드",
            description: "'데이터 업로드' 메뉴에서 다운로드한 엑셀 파일을 그대로 업로드합니다.\n업로드 즉시 AI가 자동 분석을 시작하며 이상 거래 및 오류 항목이 리포트로 생성됩니다.\n\n별도의 가공 작업은 필요하지 않습니다."
          }
        ]
      },
      {
        title: "생성되는 리포트",
        subsections: [
          {
            label: "실무자 리포트",
            items: [
              "오류/누락/중복 전표 표시",
              "검토 필요 항목 자동 강조",
              "수정 권장 사항 안내",
              "정산 요약 결과"
            ]
          },
          {
            label: "대표/관리자 리포트",
            items: [
              "이상 거래 통계",
              "리스크 항목 요약",
              "월별 변동 추이",
              "감사 대응용 요약 리포트"
            ]
          }
        ],
        note: "실무 담당자 이메일로 자동 발송 설정 가능합니다.\n모든 항목은 회사 운영 방식에 맞게 커스터마이징 가능합니다."
      },
      {
        title: "Product 납품 시 추가 제공 기능",
        description: "POC에서는 엑셀 수동 업로드 방식이지만 실제 Product 구축 시 아래 기능이 자동 적용됩니다.",
        items: [
          "더존/이카운트 등 ERP 자동 연동",
          "신규 거래 실시간 자동 수집",
          "수동 업로드 제거",
          "대량 데이터 일괄 처리",
          "내부 서버(On-premise) 구축 가능"
        ],
        note: "즉, 장부가 자동으로 수집되고 AI가 실시간으로 점검합니다."
      },
      {
        title: "POC 데이터 보안 안내",
        subtitle: "테스트에 사용된 파일은 저장되지 않습니다",
        description: "POC 체험 과정에서 업로드한 모든 파일은 오직 테스트 분석 용도로만 일시 처리됩니다.",
        items: [
          "다른 고객사와 절대 공유되지 않습니다",
          "외부로 전송되지 않습니다",
          "분석 완료 후 자동 삭제됩니다",
          "서버에 장기 보관되지 않습니다"
        ],
        note: "즉, 체험이 끝나면 데이터는 남지 않습니다.\n\n※ 실제 Product 구축 시에는 고객사 전용 환경 또는 내부 서버에만 저장됩니다."
      }
    ],
    summary: "이 AI 직원은 사람이 반복적으로 확인하던 분개장 검토 업무를 대신 수행합니다.\n실수는 줄이고, 검토 시간은 단축하고, 감사 준비 부담까지 낮출 수 있습니다.\n\n작게 테스트하고 효과를 확인한 뒤 회사 환경에 맞게 확장하는 방식으로 도입됩니다."
  },
  3: {
    heroTitle: "원고 심사 AI 직원 (무료 체험)",
    heroSubtitle: "접수되는 원고를 자동으로 평가하고\n우선 검토 대상만 선별해주는 AI 전담 사원",
    heroDescription: "출판사나 콘텐츠 기업에서는 매일 많은 원고와 문서가 접수됩니다.\n사람이 하나씩 읽고 판단하던 1차 심사를 AI가 대신 수행합니다.\n\nPOC는 원고 Prescreening(1차 자동 선별) 용도로 제작되었습니다.",
    sections: [
      {
        title: "이런 업무에 활용됩니다",
        items: [
          "접수 원고 1차 자동 평가",
          "기준 점수 이하 자동 제외",
          "상위 원고 자동 추천",
          "장르/품질/전략 적합도 분석",
          "심사 리포트 자동 생성",
          "편집자 검토 우선순위 정렬"
        ],
        note: "즉, \"읽을 원고만 남기고 나머지는 자동 정리\"합니다.\n편집자는 검토와 판단에만 집중할 수 있습니다."
      },
      {
        title: "POC 안내",
        subtitle: "POC(Proof of Concept)란, 실제 도입 전 우리 회사 환경에서 효과를 미리 확인해보는 무료 테스트입니다.",
        description: "현재 POC는 심사 기준 설정 + 원고 업로드 + 자동 평가 기능 중심의 최소 버전입니다.\n실제 Product 구축 시에는 다음과 같이 확장됩니다.",
        items: [
          "심사 항목 추가/세분화",
          "UI/UX 커스터마이징",
          "회사 로고 및 브랜딩 적용",
          "내부 CMS/접수 시스템 연동",
          "자동 통계/리포트 확장"
        ],
        note: "POC는 \"동작 방식 확인\"을 위한 버전이며\n납품 제품은 \"실제 심사 운영 자동화\" 기준으로 구축됩니다."
      },
      {
        title: "POC 사용 방법",
        steps: [
          {
            title: "1. 심사 기준 설정",
            description: "먼저 심사 기준을 직접 정의합니다.\n\n평가 항목 생성, 항목별 가중치 설정, 점수 비율 조정, 평가 로직 커스터마이징이 가능합니다.\n\n예) 시장성/트렌드 적합도, 구조 및 완성도, 문장 품질 및 가독성, 전략 적합성\n\n분석하려는 문서 유형이나 장르에 따라 기준을 자유롭게 변경할 수 있습니다."
          },
          {
            title: "2. 원고 파일 업로드",
            description: "원고 파일을 업로드합니다.\nTXT / DOCX / PDF 등 지원, 다수 파일 업로드 가능합니다.\n\n업로드 즉시 AI가 설정된 심사 기준에 맞춰 자동 분석을 수행합니다."
          },
          {
            title: "3. 대시보드 확인",
            description: "분석 결과는 대시보드에서 바로 확인할 수 있습니다.\n\nAI 점수 자동 산출, 순위 정렬, 추천/보류/제외 분류, 장르별 통계, 점수 분포 그래프, 기간별 투고 추이 등을 제공합니다.\n\n편집자는 상위 점수 원고만 우선 검토하면 됩니다."
          }
        ]
      },
      {
        title: "생성되는 리포트",
        subsections: [
          {
            label: "원고별 리포트",
            items: [
              "종합 점수",
              "항목별 세부 점수",
              "강점/약점 분석",
              "개선 포인트"
            ]
          },
          {
            label: "관리자/편집장 리포트",
            items: [
              "전체 접수 통계",
              "합격률/추천률",
              "장르별 성과",
              "점수 분포 분석"
            ]
          }
        ],
        note: "리포트 형식은 회사 운영 방식에 맞게 커스터마이징 가능합니다."
      },
      {
        title: "Product 납품 시 추가 제공 기능",
        description: "POC에서는 수동 업로드 방식이지만 실제 Product 구축 시 아래 기능이 자동 적용됩니다.",
        items: [
          "원고 접수 시스템 자동 연동",
          "신규 원고 자동 수집",
          "대량 일괄 분석",
          "실시간 점수 업데이트",
          "내부 서버(On-premise) 구축 가능"
        ],
        note: "즉, 원고가 접수되는 즉시 자동으로 평가가 이루어집니다."
      },
      {
        title: "POC 데이터 보안 안내",
        subtitle: "테스트에 사용된 파일은 저장되지 않습니다",
        description: "POC 체험 과정에서 업로드한 모든 파일은 오직 테스트 분석 용도로만 일시 처리됩니다.",
        items: [
          "다른 고객사와 절대 공유되지 않습니다",
          "외부로 전송되지 않습니다",
          "분석 완료 후 자동 삭제됩니다",
          "서버에 장기 보관되지 않습니다"
        ],
        note: "※ 실제 Product 구축 시에는 고객사 전용 환경 또는 내부 서버에만 저장됩니다."
      }
    ],
    summary: "이 AI 직원은 사람이 며칠씩 걸리던 1차 원고 검토를 몇 분 만에 자동으로 처리합니다.\n읽을 원고만 남기고 검토 시간을 크게 줄일 수 있습니다.\n\n작게 테스트하고 효과를 확인한 뒤 회사 환경에 맞게 확장하는 방식으로 도입됩니다."
  },
  4: {
    heroTitle: "규정·컴플라이언스 검토 AI 직원 (무료 체험)",
    heroSubtitle: "법규·안전·ESG 기준을 자동으로 비교하고\n위험 요소와 위반 사항을 먼저 찾아주는 AI 전담 사원",
    heroDescription: "그동안은 변호사, 회계사, 안전 컨설턴트에게 처음부터 전부 맡겨야 했던 검토 업무.\n이제는 AI가 먼저 1차 점검합니다.\n\nPOC에서는 사진/문서 업로드 → 규정 자동 비교·위반 탐지 기능을 테스트할 수 있습니다.",
    sections: [
      {
        title: "현재 POC에 포함된 기준 데이터",
        subtitle: "POC(Proof of Concept)란, 실제 도입 전 우리 회사 환경에서 효과를 미리 확인해보는 무료 테스트입니다.",
        description: "현재 MVP에는 아래 법령이 기본 탑재되어 있습니다.",
        items: [
          "산업안전보건법 시행규칙 (고용노동부령 제00443호, 2026.01.01)"
        ],
        note: "법령 전문이 시스템에 업로드되어 있으며, 사진/문서 분석 결과를 해당 조항과 자동 매칭합니다."
      },
      {
        title: "추가 확장 가능",
        items: [
          "다른 시행령/법률/가이드라인 업로드 가능",
          "사내 규정/매뉴얼 업로드 가능",
          "산업/업종별 기준 자유롭게 추가 가능"
        ],
        note: "회사 상황에 맞는 \"전용 규정 DB\" 구축이 가능합니다."
      },
      {
        title: "실시간 법령 업데이트 (선택)",
        description: "Law Open Data 등 공공 API 연동 시",
        items: [
          "최신 개정 법령 자동 반영",
          "실시간 기준 업데이트",
          "수동 관리 불필요"
        ],
        note: "항상 최신 법 기준으로 분석할 수 있습니다."
      },
      {
        title: "POC 사용 방법 (현장 사진 분석 예시)",
        steps: [
          {
            title: "1. 사진 업로드",
            description: "공사 현장 또는 작업 현장의 사진을 업로드합니다.\n\n예) 안전모 미착용, 보호구 미착용, 추락 위험 구간, 정리되지 않은 작업 환경, 안전 표지 미설치\n\n현재 POC에서는 이미지 1장씩 업로드하여 테스트합니다."
          },
          {
            title: "2. 자동 분석",
            description: "AI가 사진 상황을 분석하여 위험 요소 탐지, 위반 가능 항목 식별, 관련 법 조항 자동 매칭, 해당 규정 source 표시를 수행합니다."
          },
          {
            title: "3. 리포트 생성",
            description: "위반 사항과 근거 규정을 포함한 리포트가 자동 생성됩니다."
          }
        ]
      },
      {
        title: "생성되는 리포트",
        items: [
          "위반/위험 항목 목록",
          "사진 내 문제 위치 표시",
          "관련 법/시행규칙 source 제공",
          "개선 권장 사항",
          "조치 체크리스트"
        ],
        note: "리포트 형식과 내용은 회사 요청에 맞게 자유롭게 커스터마이징 가능합니다.\nPDF 파일 다운로드, 이메일 자동 전송 모두 지원합니다."
      },
      {
        title: "Product 납품 시 추가 제공 기능",
        description: "POC는 단일 파일 테스트용이지만 실제 Product 구축 시 아래 기능이 자동 적용됩니다.",
        items: [
          "여러 장 이미지 동시 업로드",
          "클라우드 폴더 자동 연동",
          "신규 사진 자동 수집 및 분석",
          "실시간 리포트 생성",
          "대량 현장 데이터 일괄 처리",
          "내부 서버(On-premise) 구축 가능"
        ],
        note: "즉, 사진을 폴더에 올려두기만 하면 시스템이 자동으로 분석을 수행합니다."
      },
      {
        title: "POC 데이터 보안 안내",
        subtitle: "테스트에 사용된 파일은 저장되지 않습니다",
        description: "POC 체험 과정에서 업로드한 모든 파일은 오직 테스트 분석 용도로만 일시 처리됩니다.",
        items: [
          "다른 고객사와 절대 공유되지 않습니다",
          "외부로 전송되지 않습니다",
          "분석 완료 후 자동 삭제됩니다",
          "서버에 장기 보관되지 않습니다"
        ],
        note: "즉, 체험이 끝나면 데이터는 남지 않습니다.\n\n※ 실제 Product 구축 시에는 고객사 전용 환경 또는 내부 서버에만 저장됩니다."
      }
    ],
    summary: "이 AI 직원은 현장 사진이나 문서를 기반으로 규정 위반과 리스크를 자동으로 찾아냅니다.\n외부 전문가에게 맡기기 전 회사 내부에서 먼저 점검이 가능해져 비용과 시간을 크게 줄일 수 있습니다.\n\n작게 테스트하고 효과를 확인한 뒤 회사 환경에 맞게 확장하는 방식으로 도입됩니다."
  },
  5: {
    heroTitle: "스마트팜 설계 AI 직원 (무료 체험)",
    heroSubtitle: "토지 규격을 입력하면\n최적 모듈 배치와 예상 견적까지 자동으로 계산해주는 AI 설계 직원",
    heroDescription: "복잡한 엑셀 계산 없이\nAI가 토지 조건을 이해하고\n현실적인 설계안을 몇 초 만에 만들어줍니다.",
    sections: [
      {
        title: "POC 안내",
        subtitle: "POC(Proof of Concept)란, 실제 도입 전 우리 회사 환경에서 효과를 미리 확인해보는 무료 테스트입니다.",
        description: "현재 POC는\n토지 입력 → 모듈 배치 계산 → 견적 생성\n기능 중심의 최소 버전입니다.\n\n실제 Product 구축 시에는 다음과 같이 확장됩니다.",
        items: [
          "다양한 모듈 타입 자동 선택",
          "실제 장비 가격 DB 연동",
          "농작물별 수익성 분석",
          "지역 기후 데이터 연동",
          "금융/투자 시뮬레이션"
        ]
      },
      {
        title: "POC 사용 방법",
        steps: [
          {
            title: "1. 토지 정보 입력",
            description: "토지 형태와 규격 입력\n\n예) 가로 / 세로 / 여유 공간 / 경계 거리\n\n직사각형, 다각형 토지도 입력 가능합니다."
          },
          {
            title: "2. 자동 배치 계산",
            description: "AI가 토지 조건을 분석하여\n\n✔ 최적 모듈 개수 계산\n✔ 배치 구조 생성\n✔ 면적 활용률 계산\n✔ 설치 가능 위치 시뮬레이션\n\n사람이 하루 걸리던 작업이 몇 초 만에 끝납니다."
          },
          {
            title: "3. 단가 설정",
            description: "모듈 가격, 인건비, 공사비 등 입력\n\n또는 기본값 사용 가능\n\n회사 상황에 맞게 자유롭게 설정 가능합니다."
          },
          {
            title: "4. 결과 확인",
            description: "AI가 설계 결과와 예상 견적을 제공합니다.\n\n✔ 총 설치 모듈 수\n✔ 예상 투자 금액\n✔ 면적 활용률\n✔ 배치도 이미지\n✔ PDF 견적서 다운로드\n\n설계안을 바로 검토할 수 있습니다."
          }
        ]
      },
      {
        title: "이런 상황에 특히 적합합니다",
        items: [
          "스마트팜 사업 타당성 검토",
          "농지 활용 설계 빠른 비교",
          "투자자 제안용 설계 자료 생성",
          "견적 계산 자동화",
          "초기 사업 검토 단계"
        ],
        note: "즉, 아이디어를 바로 설계안으로 바꿉니다."
      },
      {
        title: "Product 납품 시 추가 제공 기능",
        items: [
          "실제 장비 업체 가격 DB 연동",
          "기후/일조량 데이터 분석",
          "작물별 수익성 시뮬레이션",
          "금융 모델링 (ROI / 회수기간)",
          "ERP / 프로젝트 관리 연동",
          "On-premise 구축 가능"
        ],
        note: "설계 → 견적 → 투자 검토까지 자동화됩니다."
      },
      {
        title: "POC 데이터 안내",
        subtitle: "POC 체험에 입력한 토지 정보와 데이터는 저장되지 않습니다.",
        items: [
          "외부 공유 없음",
          "장기 보관 없음",
          "분석 완료 후 자동 삭제"
        ],
        note: "실제 Product는 고객사 전용 환경에 구축됩니다."
      }
    ],
    summary: "이 AI 직원은\n스마트팜 설계 경험이 없어도\n토지 정보만으로 현실적인 설계안을 만들어 줍니다.\n\n작게 테스트하고 효과를 확인한 뒤\n회사 환경에 맞게 확장 도입할 수 있습니다."
  }
};

const aiEmployees = [
  {
    id: 1,
    icon: MessageSquare,
    title: "대화·영상 분석 AI 직원",
    headline: "고객 대화와 현장 영상을 자동으로 읽고, 중요한 신호를 먼저 알려주는 직원",
    description: "통화 녹취, 상담 기록, 회의 음성, CCTV 영상까지 AI가 대신 분석합니다.",
    features: [
      "고객 불만/이탈 징후 탐지",
      "상담 품질 자동 평가",
      "위험 상황 감지",
      "반복 이슈 패턴 정리",
      "이상 행동/사고 가능성 알림"
    ],
    benefit: "사람이 일일이 듣고 보고 확인하지 않아도 문제가 생기기 전에 먼저 알려줍니다.",
    imagination: "콜센터가 아니어도 괜찮습니다.\n매장 CCTV, 공장 현장, 물류센터, AS 방문 기록, 영업 통화, 내부 회의 녹음 등\n'듣거나 보는 업무'가 있다면 어디든 바로 적용 가능합니다.",
    url: "https://cas.synthya.ai/",
    available: true
  },
  {
    id: 2,
    icon: Calculator,
    title: "회계/정산 검증 AI 직원",
    headline: "장부를 대신 확인하고, 실수와 이상 거래를 먼저 잡아주는 직원",
    description: "거래 내역, 전표, 정산 데이터를 AI가 실시간으로 점검합니다.",
    features: [
      "누락/중복 전표 탐지",
      "이상 금액 알림",
      "규정 위반 체크",
      "자동 리포트 생성"
    ],
    benefit: "사람이 놓치기 쉬운 숫자를 AI가 24시간 대신 감시합니다.",
    imagination: "회계팀이 없어도 괜찮습니다. 엑셀 정산, 매출 관리, 발주/입출고 관리 등 '숫자를 다루는 업무'가 있다면 어디든 적용 가능합니다.",
    url: "http://auditpilot.synthya.ai/",
    available: true
  },
  {
    id: 3,
    icon: FileText,
    title: "원고 심사 AI 직원",
    headline: "접수되는 원고를 자동 평가하고\n검토할 작품만 선별해주는 AI 전담 사원",
    description: "출판사에 매일 접수되는 수십, 수백 편의 원고를\nAI가 먼저 심사 기준에 맞춰 점수화합니다.\n\n읽을 원고만 남기고\n1차 선별 작업을 자동으로 처리합니다.",
    features: [
      "원고 자동 스크리닝",
      "심사 기준/가중치 설정",
      "AI 점수 자동 산출",
      "추천/제외 자동 분류",
      "순위 정렬 및 통계 대시보드",
      "심사 리포트 생성"
    ],
    benefit: "읽을 원고만 남기고 1차 선별 작업을 자동으로 처리합니다.",
    imagination: "인사팀이나 심사 인력이 많지 않아도 괜찮습니다.\n원고 접수 → 자동 평가 → 상위 작품만 검토\n\n사실상,\n1차 심사 담당자를 한 명 먼저 채용하는 것과 같습니다.",
    url: "https://route.synthya.ai",
    available: true
  },
  {
    id: 4,
    icon: Shield,
    title: "규정·컴플라이언스 검토 AI 직원",
    headline: "법규·회계·ESG 기준을 먼저 확인하고, 위험 요소를 미리 잡아주는 직원",
    description: "그동안은 변호사, 회계사, 컨설턴트에게 처음부터 전부 맡겨야 했던 업무들.\n이제는 AI가 먼저 검토합니다.",
    features: [
      "법/규정 자동 대조",
      "계약서/문서 리스크 체크",
      "회계 기준 위반 탐지",
      "ESG/안전/인증 요건 점검",
      "체크리스트 자동 생성",
      "개선 항목 제안"
    ],
    benefit: "전문가에게 보내기 전, 1차 검토를 대신 처리합니다.",
    imagination: "규정과 법률은 이미 공개된 자료입니다. AI는 그 기준에 맞춰 자동으로 비교·검토합니다.\n대표님이 70~80%를 직접 준비하고, 마지막 확인만 전문가에게 맡기면 됩니다.\n그래서 컨설팅 비용을 크게 줄일 수 있습니다.",
    url: "https://safety.synthya.ai/",
    available: true
  },
  {
    id: 5,
    icon: Sprout,
    title: "스마트팜 설계 AI 직원",
    headline: "토지 규격을 입력하면 최적의 모듈 배치와 예상 견적을 자동 계산하는 AI 설계 직원",
    description: "토지 크기와 여유 공간을 입력하면\nAI가 최적 배치와 모듈 수량을 계산하고\n예상 견적까지 바로 만들어 줍니다.\n\n설계 초기 검토 시간을 몇 시간 → 몇 분으로 줄입니다.",
    features: [
      "모듈 자동 배치 계산",
      "여유 공간 고려 설계",
      "예상 견적 자동 생성",
      "배치 방식 비교",
      "PDF 견적서 출력",
      "대량 설계 시뮬레이션"
    ],
    benefit: "설계팀이 반복 계산 대신 고객 설계와 전략에 집중할 수 있습니다.",
    imagination: "설계팀이 없어도 시작할 수 있습니다.\n부지 하나 입력하면\n설계 검토와 견적이 동시에 나옵니다.\n\n사실상,\n설계 직원 한 명을 먼저 채용하는 것과 같습니다.",
    url: "https://farmdesigner.synthya.ai/",
    available: true
  }
];

function DetailModal({ employeeId, open, onOpenChange }: { employeeId: number; open: boolean; onOpenChange: (open: boolean) => void }) {
  const content = detailContents[employeeId];
  const employee = aiEmployees.find(e => e.id === employeeId);
  if (!content || !employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8 border-b border-border/50">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <employee.icon className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs">무료 체험 상세 안내</Badge>
            </div>
            <DialogTitle className="text-xl md:text-2xl font-bold text-primary leading-tight">
              {content.heroTitle}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground whitespace-pre-line mt-2">
              {content.heroSubtitle}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            {content.heroDescription}
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-7">
          {content.sections.map((section, idx) => (
            <div key={idx} className="border-b border-border/30 pb-7 last:border-b-0 last:pb-0">
              <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                {section.title.includes("보안") ? <Lock className="w-4 h-4" /> :
                 section.title.includes("사용 방법") ? <ArrowRight className="w-4 h-4" /> :
                 <CheckSquare className="w-4 h-4" />}
                {section.title}
              </h3>

              {section.subtitle && (
                <p className="text-sm font-semibold text-foreground mb-2">{section.subtitle}</p>
              )}

              {section.description && (
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{section.description}</p>
              )}

              {section.steps && (
                <div className="space-y-4 mt-3">
                  {section.steps.map((step, i) => (
                    <div key={i} className="bg-secondary/30 rounded-lg p-4">
                      <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.subsections && (
                <div className="space-y-4 mt-2">
                  {section.subsections.map((sub, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-foreground mb-2">{sub.label}</p>
                      <div className="space-y-1.5 ml-1">
                        {sub.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">□</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.items && (
                <div className="space-y-1.5 ml-1 mt-2">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 flex-shrink-0">□</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.note && (
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed whitespace-pre-line italic">{section.note}</p>
              )}
            </div>
          ))}

          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
            <p className="text-sm text-foreground font-medium whitespace-pre-line leading-relaxed">
              {content.summary}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button size="lg" className="rounded-full flex-1 gap-2" asChild>
              <a href={employee.url!} target="_blank" rel="noopener noreferrer">
                체험하기 <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full flex-1" asChild>
              <a href="/poc#poc-form">우리 업무에 적용 상담하기</a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Experience() {
  const [selectedEmployee, setSelectedEmployee] = React.useState<number | null>(null);

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
              말로 설명하지 않겠습니다<br/>
              직접 써보세요
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              아래 AI 직원들은 실제로 동작하는 샘플입니다.<br/>
              클릭 몇 번이면 우리 회사에서 어떻게 쓰일지 바로 감이 옵니다.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-lg max-w-xl mx-auto">
              <p className="text-muted-foreground leading-relaxed">
                꼭 같은 업무가 아니어도 괜찮습니다.<br/>
                아래 예시를 보시고<br/>
                <span className="text-primary font-semibold">"우리 회사라면 어디에 쓰면 좋을지"</span> 떠올려보세요.<br/>
                대부분은 여기서 아이디어가 시작됩니다.
              </p>
            </div>
          </motion.div>
        </Section>

        {/* AI Employees Section */}
        <Section className="bg-white relative z-20 section-after-hero">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                우리 회사에 먼저 투입해볼 수 있는<br/>
                <span className="text-accent">AI 전담 사원 예시</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {aiEmployees.map((employee, index) => (
                <motion.div key={employee.id} variants={fadeIn}>
                  <Card className="border border-border/50 shadow-lg shadow-primary/5 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-[1fr,auto] gap-0">
                        <div className="p-5 md:p-8">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                              <employee.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <Badge variant="outline" className="mb-1 text-xs">#{index + 1}</Badge>
                              <h3 className="text-xl font-bold text-primary">{employee.title}</h3>
                            </div>
                          </div>
                          
                          <p className="text-lg font-medium text-foreground mb-4">
                            {employee.headline}
                          </p>
                          
                          <p className="text-muted-foreground mb-4 whitespace-pre-line">
                            {employee.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {employee.features.map((feature, i) => (
                              <span key={i} className="text-sm bg-secondary/50 text-muted-foreground px-3 py-1 rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                          
                          <p className="text-primary font-medium mb-6">
                            {employee.benefit}
                          </p>
                          
                          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                                {employee.imagination}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-row items-center justify-center gap-3 p-5 md:p-8 bg-gradient-to-br from-secondary/30 to-secondary/10 border-t md:border-t-0 md:border-l border-border/50">
                          {employee.available && (
                            <a 
                              href={employee.url!} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <Button size="lg" className="rounded-full px-6 md:px-8 h-14 text-base font-semibold gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform" data-testid={`button-experience-${employee.id}`}>
                                체험하기 <ExternalLink className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                          {detailContents[employee.id] && (
                            <Button
                              size="lg"
                              variant="outline"
                              className="rounded-full px-6 md:px-8 h-14 text-base font-semibold gap-2"
                              onClick={() => setSelectedEmployee(employee.id)}
                              data-testid={`button-detail-${employee.id}`}
                            >
                              <Info className="w-4 h-4" /> 상세 설명
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Note Section */}
        <Section className="bg-secondary/20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                이 5가지는 예시일 뿐입니다
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                대표님 회사에 맞춰 완전히 새로운 AI 직원을 만들어 드립니다.<br/>
                <span className="text-primary font-semibold">"우리 회사에서는 이런 업무가 귀찮은데…"</span><br/>
                그 한마디면 충분합니다.
              </p>
            </motion.div>
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
              <h2 className="mb-8 text-4xl font-bold md:text-6xl text-white leading-tight">이제,<br/><span className="text-accent">귀사 차례입니다</span></h2>
              <p className="mb-12 text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto break-keep">
                지금 보신 건 샘플일 뿐입니다.<br/>
                대표님 회사 데이터로 연결하면 훨씬 더 정확하고 강력하게 동작합니다.<br/>
                어떤 업무가 제일 귀찮은지 알려주세요.<br/>
                <span className="text-white font-semibold">그 업무 전용 AI 직원을 만들어 드립니다.</span>
              </p>
              <div className="flex flex-col gap-4 justify-center items-center">
                <Button size="lg" className="h-14 md:h-16 rounded-full px-8 md:px-12 text-lg md:text-xl font-bold bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1" asChild>
                  <a href="/poc#poc-form">우리 업무에 적용 상담하기</a>
                </Button>
                <div className="text-white/60 text-sm font-medium">
                  개발비 0원 · 2주 테스트 · 부담 없음
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-0" />
        </Section>
      </main>
      <Footer />

      {selectedEmployee !== null && (
        <DetailModal
          employeeId={selectedEmployee}
          open={selectedEmployee !== null}
          onOpenChange={(open) => { if (!open) setSelectedEmployee(null); }}
        />
      )}
    </div>
  );
}
