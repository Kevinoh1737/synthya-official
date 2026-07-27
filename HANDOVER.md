# Synthya Website Relaunch — Handover

마지막 업데이트: 2026-07-27
상태: 로컬 개편 및 별도 Vercel 리뷰 진행 중, 실제 라이브 미반영

## 1. 새 Codex 세션이 가장 먼저 알아야 할 내용

1. `AGENTS.md`를 먼저 전부 읽는다.
2. 이 `HANDOVER.md`를 전부 읽는다.
3. 실제 `synthya.ai`는 라이브이며 GitHub push가 실제 배포를 유발할 수 있다.
4. 사용자 최종 승인 전에는 GitHub commit/push/merge/PR을 하지 않는다.
5. 현재 결과는 별도 Vercel 리뷰 사이트에서만 확인한다.

리뷰 사이트:

> https://synthya-vibecad-preview.vercel.app

## 2. 저장소 상태

- 로컬 경로: `/Users/kevinoh/synthya-website`
- Git 브랜치: `local/vibecad-relaunch`
- Git 원격: `origin = https://github.com/Kevinoh1737/synthya-official.git`
- 현재 release candidate: `Relaunch Synthya as an AI CAD design agent`
- 기존 라이브 기준: `7ef62b9 Replace Replit OG/Twitter image with Synthya's own`
- 개편 작업은 로컬 release commit으로 고정했으며 아직 GitHub에는 push하지 않았다.
- 기존 라이브 사이트와 신규 개편 코드가 같은 저장소에 있으므로 push에 특히 주의한다.
- 로컬 Vercel 연결:
  - Project: `synthya-vibecad-preview`
  - Project ID: `prj_yCGXXIfvAQydsNDRbslOA3TSdS6j`
  - Stable review URL: `https://synthya-vibecad-preview.vercel.app`

## 3. 현재 웹사이트 방향

새 사이트는 Synthya를 다음과 같이 포지셔닝한다.

> 도면을 읽고, 규칙을 이해하고, CAD를 직접 그리는 AI 설계 에이전트.

영문:

> Read drawings. Understand rules. Generate CAD.

핵심 차별점:

> VibeCAD는 도구입니다. 진짜 자산은 회사가 축적한 설계 규칙입니다.

영문:

> VibeCAD is the tool. Accumulated design rules are the real asset.

일반적인 VibeCAD가 `Prompt → CAD command`에 집중한다면 Synthya는 다음 구조다.

> Company knowledge → Omni Intelligence Agent → Engineering judgment → CAD execution → Validated knowledge loop

## 4. 현재 구현된 홈페이지 구조

현재 사이트는 별도 라우트가 없는 단일 랜딩 페이지다.

1. Hero
   - 실제 CAD 에이전트 영상
   - Upload drawing → Interpret rules → Engineer layout → Generate CAD
2. Understand → Engineer → Draw
   - 제연설계 3단계 워크플로
   - Step 1 부속실 탐지 실제 영상
3. Company Intelligence
   - 회사 프로젝트·도면·계산서·법령·암묵지
   - Omni Intelligence Agent
   - 도메인 설계 에이전트
   - 검증 결과가 회사 지식으로 재축적되는 루프
4. Technology
   - LLM/VLM의 판단과 자체 CAD 엔진의 결정론적 실행 분리
5. Real product workflow
   - 팬·댐퍼·덕트 자동 작도 실제 영상
   - CAD Before/After 확대 화면
   - 제연 설계 규칙 예시
6. Global ENP
   - 제품 설명 뒤에 배치
   - Industry design partner / Pilot validation
7. Human-in-the-loop
   - 개발 중 콘셉트로 명시
   - 모바일에서는 팬 이동과 규칙 기반 재작도를 2개 확대 장면으로 표시
8. Vision
   - 제연 → 소방설계 → VibeCAD
9. Company
10. CTA 및 Footer

## 5. 실제 제연설계 3단계

### Step 1 — Understand

- 전체 도면을 읽고 VLM으로 부속실이 있는 평면도를 찾는다.
- 프로젝트에는 8개 동, 동별 2개 부속실, 총 16개 제연구역이 있다.
- 각 부속실별 계산 영역을 점선으로 표시한다.

### Step 2 — Engineer

- 에이전트가 CAD 줄자 도구로 부속실에 연결된 문·창문 등을 실측한다.
- VLM으로 도면을 확대·판독하고 CAD 도구의 두 점을 찍어 측정한다.
- 계산서 수식에 필요한 값을 입력한다.
- 현재 이 내부 CAD 동작의 전 과정이 프론트에 모두 보이지는 않는다.

### Step 3 — Draw

- 팬룸과 DA(Dry Area)를 찾는다.
- 라이브러리에서 팬과 댐퍼 블록을 불러와 배치한다.
- 흡입측은 DA, 토출측은 엘리베이터 방향으로 연결한다.
- 최단 경로, 구조벽 통과 금지, 굴곡 수 제한, 계산 기반 덕트 크기 등의 규칙을 적용한다.
- 결과는 기존 도면 위의 새 레이어로 생성된다.

## 6. Company Intelligence 설명

Synthya의 독특한 온보딩 방식:

1. 사용자가 규칙을 하나씩 수동 입력하는 방식만 제공하지 않는다.
2. 회사의 프로젝트 자료, 도면, 계산서, 법령, 설계 기준, 현장 노하우, 암묵지를 먼저 통합한다.
3. 이 자료를 기반으로 회사별 Omni Intelligence Agent를 구축한다.
4. 설계 에이전트는 작업마다 필요한 규칙, 맥락, 선례를 Omni Agent에서 가져온다.
5. 전문가가 검증한 결과는 다시 조직 지식으로 축적될 수 있다.

과장 금지:

- 모든 암묵지가 자동으로 완벽하게 추출된다고 주장하지 않는다.
- 초기 지식 기반 구축 후 전문가 검증과 피드백을 통해 발전한다고 설명한다.

## 7. Global ENP 상태

- Global ENP는 실제 계약된 산업 설계 파트너다.
- Global ENP가 현 버전에 사용된 도면, 회사 로고 및 관련 내용 전체의 공개와 배포를 승인했다.
- 따라서 현재 승인된 자산과 문구를 `synthya.ai`에 공개하는 데 파트너사 승인 문제는 없다.
- 아직 최종 전면 실무 적용이 완료된 상태는 아니다.
- 현재 표현:
  - `INDUSTRY DESIGN PARTNER`
  - `PILOT VALIDATION`
  - 실제 도면을 기반으로 최종 실무 적용 검증 중
- 공식 사이트: `https://www.globalenp.com`

## 8. 언어 및 타이포그래피

- Pretendard로 통일했다.
- 브라우저의 첫 번째 선호 언어가 `ko` 또는 `ko-KR`이면 한국어가 기본이다.
- 그 외 언어는 영어가 기본이다.
- 사용자가 KR/EN을 선택하면 localStorage에 저장된 선택이 우선한다.
- 한국어와 영어는 별도 줄바꿈 규칙을 사용한다.
- 한글 단어 중간 줄바꿈을 금지한다.
- 데스크톱의 의도된 강제 줄바꿈은 모바일에서 제거한다.
- 마지막 타이포그래피 검수 캡처:
  - `captures/type-final-ko-desktop-1920.png`
  - `captures/type-final-ko-mobile-390.png`
  - `captures/type-final-en-desktop-1920.png`
  - `captures/type-final-en-mobile-390.png`

## 9. 모바일 최적화

- 기준 너비: 390px
- 히어로 영상은 작업 영역 중심으로 확대 크롭한다.
- 4단계 진행 상태를 2×2로 변경한다.
- 카드와 인포그래픽은 한 열 또는 세로 흐름으로 변환한다.
- Step 1, 자동 작도, Human-in-the-loop은 모바일 전용 확대 뷰를 사용한다.
- 모바일에서는 상세 기술 아키텍처와 장기 로드맵을 숨겨 핵심 흐름에 집중한다.
- 최종 모바일 캡처:
  - `captures/mobile-optimized-ko-390.png`
  - `captures/mobile-optimized-en-390.png`

## 10. 브랜드 자산

중요: 로고를 텍스트로 재구성하지 않는다.

- 2026 신규 브랜드 가이드 원본:
  - `brand/synthya-brand-guide-2026.png`
  - 1536×1024 RGB 래스터 원본이며 벡터 원본은 제공되지 않았다.
- 신규 헤더 가로형:
  - `client/src/assets/images/synthya-brand-2026-horizontal.png`
- 신규 푸터 반전형:
  - `client/src/assets/images/synthya-brand-2026-horizontal-reversed.png`
- 신규 단독 심볼:
  - `client/src/assets/images/synthya-brand-2026-symbol.png`
- 추출 및 사용 규칙:
  - `brand/README.md`
- 원본 루트 로고: `logo.png`
- 원본 루트 심볼: `symbol.png`
- 헤더 투명 락업: `client/src/assets/images/synthya-header-lockup-transparent.png`
- 푸터 실제 락업:
  - `client/src/assets/images/synthya-footer-lockup-white.png`
  - 원본 투명도와 픽셀 위치를 유지하고 네이비 워드마크·태그라인만 흰색으로 변환
- 헤더 심볼: `client/src/assets/images/synthya-symbol-2026.png`
- 새 파비콘: `client/public/favicon.png`
  - 512×512
  - 네이비 라운드 타일, 굵기 보강, 얕은 입체감
- Apple 터치 아이콘: `client/public/apple-touch-icon.png`
- 파비콘 크기별 검수: `captures/favicon-readability-preview.png`
- Global ENP 로고: `client/src/assets/images/global-enp-logo.png`

## 11. 제품 미디어

- Step 1 실제 영상:
  - `client/public/product/step-1-vestibule-detection-live.mp4`
  - `client/public/product/step-1-vestibule-detection-poster.jpg`
- Step 3 실제 영상:
  - `client/public/product/smoke-control-agent-live.mp4`
  - `client/public/product/smoke-control-agent-poster.jpg`
- CAD Before/After:
  - `client/src/assets/product/cad-before-real.png`
  - `client/src/assets/product/cad-after-real.png`
- 실제 서비스 화면:
  - `client/src/assets/product/cad-service-real.png`
- Human-in-the-loop 개발 콘셉트:
  - `client/src/assets/product/hitl-concept-preview-v1.png`

## 12. 주요 코드

- 앱 엔트리: `client/src/App.tsx`
- 홈: `client/src/pages/Home.tsx`
- 글로벌 스타일: `client/src/index.css`
- 내비게이션: `client/src/components/Navbar.tsx`
- 푸터: `client/src/components/Footer.tsx`
- 언어 상태: `client/src/lib/language.ts`
- HTML/SEO/favicon: `client/index.html`
- 기존 기획 문서: `WEBSITE_RELAUNCH_PLAN.md`
- 실제 라이브 배포 절차: `DEPLOYMENT_RUNBOOK.md`
- IR 참고: `reference_synthya_TIPS_IR_deck_1.md`
- 웹사이트 참고:
  - `reference_synthya_website_brief_1.md`
  - `reference_synthya_website_design_brief.md`

## 13. 실행 및 검증

의존성 설치:

```bash
npm install
```

로컬 실행:

```bash
npm run dev:vite
```

기본 검증:

```bash
npm run check
npm run build
```

Vercel 리뷰 배포 전 확인:

```bash
cat .vercel/project.json
```

`projectName`이 반드시 `synthya-vibecad-preview`여야 한다.

리뷰 배포:

```bash
vercel --prod --yes
```

## 14. 현재 완료 상태

- 새로운 VibeCAD 중심 홈페이지 구현
- Company Intelligence 인포그래픽 구현
- Global ENP 파트너 검증 섹션 구현
- 실제 Step 1/Step 3 영상 적용
- Human-in-the-loop 개발 중 프리뷰 적용
- 한국어·영어 전환 및 자동 언어 선택
- 1920px/390px 반응형 검수
- Pretendard 및 언어별 줄바꿈 정리
- 실제 헤더·푸터 로고 적용
- 파비콘 가독성 개선
- 별도 Vercel 리뷰 배포 완료

### 2026-07-27 외부 피드백 반영

- 영문 Hero를 `Read drawings. Apply engineering rules. Generate CAD.`로 강화
- Hero 실제 제품 화면을 데스크톱에서 약 10% 이상 확대하고 상단 간격 축소
- 한글 3단계를 `도면 이해 → 규칙 적용 → CAD 생성`으로 통일
- 각 단계 카드에 실제 처리 대상과 결과 태그 추가
- 모바일 단계 카드를 세로 적층에서 가로 스와이프 구조로 변경
- Step 1 카피를 `도면 전체에서 제연 부속실을 식별합니다`로 정확하게 수정
- Company Intelligence 선언문 크기와 여백을 확대해 핵심 메시지로 강화
- CAD 전·후 이미지에 `BEFORE / AFTER` 배지 추가
- 네이비 구간 본문 크기와 대비 개선, 모바일 규칙 카드를 가로 스크롤로 압축
- Global ENP 카드에 공동 검증, 실제 프로젝트 도면, 현업 방식 반영 근거 추가
- Human-in-the-loop 모바일 화면에 `BEFORE / AFTER` 라벨 적용
- 확장 구조를 `제연설계 에이전트 → 소방설계 에이전트 → VibeCAD 플랫폼`으로 통일
- 수치 의미를 `2020년 설립`, `4개월: 도메인 연구에서 작동 에이전트까지`, `700MB+: 대형 도면 처리 검증`으로 명시
- 영문 CTA를 행동 중심 문구로 변경
- Footer 로고를 축소하고 설명·링크·법인 정보 가독성 강화
- 검수 캡처:
  - `captures/feedback-v2-ko-desktop-1920.png`
  - `captures/feedback-v2-ko-mobile-390.png`
  - `captures/feedback-v2-en-desktop-1920.png`
  - `captures/feedback-v2-en-mobile-390.png`

## 15. 다음 단계

사용자와 함께 리뷰 사이트를 최종 검수한다.

권장 최종 체크:

1. 한국어 데스크톱
2. 한국어 모바일
3. 영어 데스크톱
4. 영어 모바일
5. 실제 영상 로딩 및 재생
6. KR/EN 저장 동작
7. 데모 요청 이메일 링크
8. Global ENP 링크
9. 파비콘 및 푸터 로고
10. 실제 `synthya.ai`로 이전할 방법과 배포 승인

현재 release candidate:

- Commit: 현재 `local/vibecad-relaunch`의 HEAD
- Review URL: `https://synthya-vibecad-preview.vercel.app`
- TypeScript 검사 및 production build 통과
- 새 Open Graph 이미지, `robots.txt`, `sitemap.xml` 공개 확인
- GitHub 및 실제 `synthya.ai`에는 미반영

사용자가 최종 라이브 배포 승인을 내린 뒤에만:

- GitHub push가 실제 라이브를 배포하는지 다시 확인한다.
- 현재 `local/vibecad-relaunch`의 release commit을 승인된 방식으로 `main`에 push한다.
- Google Cloud 자동 배포와 실제 사이트 smoke test를 진행한다.

## 16. Codex 데스크톱에서 시작하는 방법

1. Codex 데스크톱에서 `Open folder`를 선택한다.
2. `/Users/kevinoh/synthya-website`를 연다.
3. 새 대화 첫 메시지로 다음을 입력한다.

> AGENTS.md와 HANDOVER.md를 처음부터 끝까지 읽고, GitHub에는 절대 push하지 말고 현재 Synthya 웹사이트 개편 작업을 이어서 진행해줘. 먼저 현재 상태와 다음 추천 작업을 간단히 보고해줘.
