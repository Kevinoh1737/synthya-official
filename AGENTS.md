# Synthya Website — Codex Working Rules

이 파일은 Codex가 이 저장소에서 작업할 때 항상 따라야 하는 영구 규칙이다.
새 세션에서는 작업을 시작하기 전에 이 파일과 `HANDOVER.md`를 모두 읽는다.

## 1. 가장 중요한 배포 안전 규칙

- 현재 실제 서비스 `https://synthya.ai`는 라이브 상태다.
- GitHub 원격 저장소는 `https://github.com/Kevinoh1737/synthya-official.git`이다.
- GitHub에 push하면 Google Cloud를 통해 실제 사이트가 자동 배포될 가능성이 있다.
- **사용자가 명시적으로 최종 승인을 내리기 전에는 절대로 GitHub에 push하지 않는다.**
- 사용자가 요청하지 않은 commit, merge, PR 생성, 브랜치 전환도 하지 않는다.
- 리뷰 배포는 로컬에 연결된 별도 Vercel 프로젝트 `synthya-vibecad-preview`만 사용한다.
- 리뷰용 고정 URL은 `https://synthya-vibecad-preview.vercel.app`이다.
- 이 Vercel 프로젝트에서 `vercel --prod`는 실제 `synthya.ai`가 아니라 리뷰 프로젝트의 고정 URL을 갱신한다.
- 배포 전에는 반드시 `npm run check`와 `npm run build`를 통과시킨다.

## 2. 현재 작업 기준

- 작업 폴더: `/Users/kevinoh/synthya-website`
- 작업 브랜치: `local/vibecad-relaunch`
- 현재 개편 작업은 아직 커밋되지 않았으며 사용자 검토 중이다.
- 기존 변경과 사용자 파일을 임의로 삭제하거나 되돌리지 않는다.
- `captures/`에는 검수용 이미지가 많다. 사용자의 요청 없이 전부 commit 대상으로 간주하지 않는다.
- `.vercel/`과 환경 변수 파일은 commit하지 않는다.

## 3. 제품 및 사업 포지셔닝

- Synthya는 단순 CAD 뷰어나 프롬프트-to-CAD 도구가 아니다.
- 핵심 포지셔닝은 **규칙과 회사의 설계 지식을 이해하고 CAD를 직접 실행하는 AI 설계 에이전트**다.
- VibeCAD는 인터페이스이고, 회사가 축적한 프로젝트·규칙·도메인 노하우를 구조화하는 Company Intelligence가 차별점이다.
- 고객의 프로젝트 자료, 도면, 계산서, 법령, 설계 기준, 암묵지로 Omni Intelligence Agent를 먼저 구축한다.
- 도메인 설계 에이전트는 Omni Intelligence Agent에서 현재 작업에 필요한 규칙과 선례를 가져와 판독·실측·계산·작도를 수행한다.
- 제연설계는 첫 상용화 도메인이자 기술 검증장이다.
- 중장기 방향은 제연 → 소방설계 → 범용 VibeCAD다.

## 4. 사실과 표현의 경계

현재 구현·검증된 것으로 표현할 수 있는 내용:

- 브라우저 안에서 동작하는 CAD
- 자체 DWG·DXF 파싱 기술
- 700MB 이상 대형 도면 업로드·처리
- DXF 다운로드
- 도면 메타데이터와 VLM 시각 판독 결합
- 계산 매크로의 입력·출력·수식 분석
- CAD 도구를 이용한 실측과 계산서 입력
- 사용자 블록 라이브러리 활용
- 사전 규칙 기반 팬·댐퍼·덕트 배치 및 작도
- 결과를 기존 도면 위의 새 편집 레이어로 생성

개발 중이라고 명확히 표시해야 하는 내용:

- DWG 다운로드
- 사용자가 팬·덕트를 옮기면 규칙에 따라 자동 재작도하는 Human-in-the-loop
- 아직 최종 제품화 또는 전면 실무 배포가 완료되지 않은 기능

금지 또는 주의할 표현:

- `100% 정확`, `완전 자동`, `전면 도입 완료`처럼 검증 범위를 넘는 표현 금지
- Global ENP는 실제 계약된 산업 설계 파트너이며, 현 버전에 사용된 도면, 회사 로고 및 관련 내용 전체의 공개와 배포를 승인했다.
- 파트너사의 공개 승인은 완료되었지만 제품은 아직 최종 실무 적용 직전 검증 단계다.
- Global ENP 관련 표현은 `Industry design partner`, `Pilot validation`, `실제 도면 기반 최종 실무 적용 검증` 범위로 제한한다.

## 5. 디자인 품질 규칙

- 전체 폰트는 Pretendard를 사용한다.
- 한글은 단어 중간 줄바꿈을 금지하고 한국어 문장 단위로 자연스럽게 줄바꿈한다.
- 영어는 한글과 동일한 줄바꿈 규칙을 강제로 공유하지 않는다.
- 데스크톱용 강제 줄바꿈은 모바일에 그대로 적용하지 않는다.
- 최소 검수 해상도:
  - 데스크톱: 1920px 너비
  - 모바일: 390px 너비
- 화면 변경 후에는 한글·영어 양쪽을 모두 확인한다.
- 정적인 전체 CAD 화면을 모바일에서 단순 축소하지 말고 핵심 작업 영역을 확대·크롭한다.
- 실제 제품 기능은 실제 캡처와 영상으로 보여준다.
- 개발 중 기능은 `IN DEVELOPMENT · CONCEPT PREVIEW`라고 명시한다.
- 로고, 심볼, 파비콘은 실제 브랜드 자산을 사용한다.
- 로고를 임의 폰트 텍스트로 재구성하거나 생성형 이미지로 다시 그리지 않는다.
- 로고 색상 변경이 필요하면 원본 픽셀 위치와 투명도 마스크를 보존한 결정론적 변환을 사용한다.
- 2026 신규 로고의 유일한 제공 원본은 `brand/synthya-brand-guide-2026.png`이며, 웹 파생 자산과 변환 규칙은 `brand/README.md`를 따른다.

## 6. 구현 및 검증 규칙

- 주요 화면: `client/src/pages/Home.tsx`
- 글로벌 스타일: `client/src/index.css`
- 내비게이션: `client/src/components/Navbar.tsx`
- 푸터: `client/src/components/Footer.tsx`
- 언어 설정: `client/src/lib/language.ts`
- 브라우저 기본 언어가 한국어면 한국어, 그 외에는 영어로 시작한다.
- 사용자가 KR/EN을 직접 선택하면 localStorage의 선택을 우선한다.
- 변경 후 기본 검증:

```bash
npm run check
npm run build
```

- 로컬 개발 서버:

```bash
npm run dev:vite
```

- 리뷰 배포:

```bash
vercel --prod --yes
```

- 배포 전 `.vercel/project.json`의 `projectName`이 `synthya-vibecad-preview`인지 확인한다.
- 배포 후 고정 리뷰 URL이 정상적으로 alias 되었는지 확인한다.

## 7. 사용자와 협업하는 방식

- 사용자는 개발자가 아니므로 코드 중심이 아니라 결과 중심으로 설명한다.
- 변경 결과, 검증한 화면, 리뷰 URL, 실제 라이브 사이트 영향 여부를 먼저 말한다.
- 기술 용어는 의사결정에 필요한 범위까지만 사용한다.
- 로고·파트너십·제품 구현 상태처럼 브랜드 신뢰에 영향을 주는 항목은 추측하지 않는다.
- 불명확한 기능 사용법이나 CAD 결과의 의미는 사용자에게 확인한다.
- 사용자가 최종 승인을 내리기 전까지 실제 라이브 배포를 제안하거나 실행하지 않는다.
