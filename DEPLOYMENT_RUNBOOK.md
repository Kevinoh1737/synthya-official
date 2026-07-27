# Synthya.ai Relaunch — Production Deployment Runbook

마지막 업데이트: 2026-07-27
대상: `https://synthya.ai`
현재 상태: production 배포 완료 — 다음 release에도 동일 절차 적용

## 1. 이번 배포의 승인 상태

- Global ENP가 현 버전에 사용된 도면, 회사 로고 및 관련 내용의 공개와 배포를 승인했다.
- 따라서 현재 승인된 자산과 문구를 `synthya.ai`에서 사용하는 데 파트너사 공개 승인 문제는 없다.
- 단, 제품 적용 단계에 관한 표현은 사실관계를 유지한다.
  - 실제 계약된 산업 설계 파트너
  - 실제 프로젝트 도면 기반 공동 검증
  - 최종 실무 적용 직전 검증 단계
- `전면 도입 완료`, `완전 자동`, `100% 정확`처럼 실제 적용 상태를 넘어서는 표현은 사용하지 않는다.

## 2. 배포 원칙

1. 리뷰 사이트에서 최종 검수를 끝내기 전에는 GitHub에 push하지 않는다.
2. `npm run check`와 `npm run build`가 모두 성공해야 한다.
3. GitHub에 포함될 파일을 명시적으로 선별한다.
4. Vercel `synthya-official`의 GitHub 배포 연결과 대상 브랜치를 확인한다.
5. 사용자의 최종 배포 승인을 받은 뒤에만 release commit과 push를 실행한다.
6. 배포 직후 핵심 화면과 링크를 확인한다.
7. 중대한 문제가 있으면 수정 배포를 기다리지 않고 이전 버전으로 롤백한다.

## 3. 배포 전 준비 순서

### Gate A — 콘텐츠 및 브랜드 동결

- [ ] 한국어 문구 최종 승인
- [ ] 영어 문구 최종 승인
- [ ] Global ENP 로고·도면·설명 최종 화면 확인
- [ ] 실제 기능과 `IN DEVELOPMENT · CONCEPT PREVIEW` 구분 확인
- [ ] 헤더·푸터에 실제 Synthya 로고 자산이 사용되는지 확인
- [ ] 파비콘과 Apple touch icon 확인
- [ ] 더 이상 이번 release에 디자인 변경을 추가하지 않기로 결정

이 Gate가 끝난 시점을 `release candidate`로 본다.

### Gate B — 네 가지 기준 화면 검수

리뷰 URL:

> https://synthya-vibecad-preview.vercel.app

- [ ] 한국어 데스크톱 1920px
- [ ] 영어 데스크톱 1920px
- [ ] 한국어 모바일 390px
- [ ] 영어 모바일 390px

화면별 공통 확인:

- [ ] 단어 중간 줄바꿈이 없음
- [ ] 제목과 본문 줄바꿈이 자연스러움
- [ ] 가로 스크롤이나 잘린 요소가 없음
- [ ] CAD 이미지의 핵심 영역이 식별됨
- [ ] 실제 영상이 로드되고 자동 재생 또는 재생 대체 화면이 정상임
- [ ] 모바일에서 영상과 이미지가 과도하게 축소되지 않음
- [ ] 헤더·푸터 로고가 선명하고 비율이 변형되지 않음

### Gate C — 기능 및 링크 검수

- [ ] KR/EN 전환 작동
- [ ] 브라우저가 한국어면 최초 한국어, 그 외에는 영어로 시작
- [ ] 사용자가 선택한 언어가 새로고침 후 유지
- [ ] 데모 요청 버튼이 `business@synthya.ai`로 연결
- [ ] Footer 이메일 링크 작동
- [ ] Global ENP 외부 링크가 새 탭에서 정상 작동
- [ ] 내비게이션 앵커가 정확한 섹션으로 이동
- [ ] 동영상 poster가 네트워크 지연 시 표시
- [ ] 브라우저 콘솔에 사용자 경험에 영향을 주는 오류가 없음
- [ ] 존재하지 않는 경로의 동작을 확인

### Gate D — SEO 및 공유 검수

- [ ] 페이지 title과 description 확인
- [ ] canonical URL이 `https://synthya.ai/`
- [ ] Open Graph 이미지가 Synthya 최신 브랜드와 현재 포지셔닝을 반영
- [ ] Open Graph 이미지 URL이 공개 접근 가능
- [ ] favicon과 Apple touch icon 공개 접근 가능
- [ ] 구조화 데이터의 회사명, 서비스명, 이메일 확인
- [ ] `robots.txt`와 `sitemap.xml` 필요 여부 결정 및 공개 접근 확인
- [ ] 기존 Google/Naver 검색 인증 값이 유지되는지 확인

현재 소셜 공유 이미지는 `client/public/opengraph-2026-v2.png`만 사용한다. 구형 OG 파일을 다시 추가하지 않는다.

### Gate E — 성능 및 접근성 검수

- [ ] 데스크톱과 모바일에서 첫 화면이 체감상 빠르게 표시
- [ ] 7.2MB Step 3 영상이 느린 네트워크에서 페이지를 방해하지 않음
- [ ] 영상은 음소거, inline 재생, poster 대체 상태를 제공
- [ ] 이미지에 의미 있는 alt text가 있음
- [ ] 키보드로 언어 선택, 메뉴, CTA 접근 가능
- [ ] 색상 대비와 focus 표시 확인
- [ ] Lighthouse 또는 동등한 검사로 Performance/Accessibility/SEO 확인

## 4. GitHub에 포함할 범위

### Release에 포함할 후보

- `.gitignore`
- `client/index.html`
- `client/public/favicon.png`
- `client/public/apple-touch-icon.png`
- `client/public/product/`
- `client/src/App.tsx`
- `client/src/components/Navbar.tsx`
- `client/src/components/Footer.tsx`
- `client/src/index.css`
- `client/src/pages/Home.tsx`
- `client/src/lib/language.ts`
- 실제 화면에서 참조하는 `client/src/assets/images/` 신규 브랜드 자산
- 실제 화면에서 참조하는 `client/src/assets/product/` 제품 자산
- 필요할 경우 운영 문서 `AGENTS.md`, `HANDOVER.md`, `DEPLOYMENT_RUNBOOK.md`

### 기본적으로 release에서 제외

- `.vercel/`
- `.env`, `.env.local`, 기타 환경 변수 파일
- `captures/`
- `.claude/`
- `.omc/`
- `reference_*.md`
- 루트의 작업용 `logo.png`, `symbol.png`
- `무제 폴더/`
- 로컬 임시 파일 및 원본 화면 녹화
- 실제 화면에서 사용하지 않는 중간 로고 파생 파일

### 별도 확인

- `package-lock.json`의 현재 변경은 패키지 버전 변경이 아니라 npm 버전에 따른 `peer` 메타데이터 차이다.
- `package.json`이 변경되지 않았으므로, release commit에 포함하기 전에 lockfile 변경을 유지할 실익을 다시 판단한다.
- 자산은 코드에서 실제 참조되는 파일만 stage한다.

`git add .`는 사용하지 않는다. 파일을 명시적으로 선택해 stage하고, `git diff --cached`로 최종 확인한다.

## 5. Vercel production 배포 연결

확인된 production 환경:

- Project: `synthya-official`
- Project ID: `prj_DDmmSXaTq9KtUvVEYro7OS2nRf0A`
- GitHub repository: `Kevinoh1737/synthya-official`
- Production branch: `main`
- Domain: `https://synthya.ai` → `https://www.synthya.ai`
- GitHub `main` push 시 Vercel production 자동 배포

배포 전 확인:

- [ ] 현재 Vercel project와 GitHub repository 연결
- [ ] production branch가 `main`
- [ ] build 명령과 output directory
- [ ] Node.js 버전
- [ ] 필요한 환경 변수 또는 Secret
- [ ] 직전 정상 deployment가 rollback candidate인지
- [ ] `synthya.ai`와 `www.synthya.ai`의 HTTPS 및 redirect 상태

## 6. Release candidate 생성

사용자가 release candidate 생성을 승인한 뒤 실행한다.

1. 현재 변경사항을 다시 확인한다.
2. 배포 파일만 명시적으로 stage한다.
3. `git diff --cached --stat`과 `git diff --cached`로 포함 범위를 검토한다.
4. 아래 검사를 실행한다.

```bash
npm run check
npm run build
```

5. 로컬 production build를 브라우저에서 확인한다.
6. Vercel 리뷰 프로젝트가 다음 프로젝트인지 확인한다.

```text
synthya-vibecad-preview
```

7. 필요하면 최종 release candidate를 리뷰 Vercel에 갱신한다.
8. 네 가지 기준 화면과 기능·링크 검수를 다시 완료한다.
9. 승인된 파일만 하나의 release commit으로 만든다.

권장 commit 제목:

```text
Relaunch Synthya as an AI CAD design agent
```

commit만으로는 실제 사이트에 영향을 주지 않는다. GitHub push는 별도의 최종 승인 단계다.

## 7. 최종 라이브 배포 순서

사용자가 명시적으로 `synthya.ai에 배포해`라고 최종 승인한 뒤에만 실행한다.

1. Vercel `synthya-official`과 GitHub `main` 연결을 마지막으로 재확인한다.
2. release commit hash와 현재 라이브 기준 commit `7ef62b9`를 기록한다.
3. working tree에 미반영 변경이 없는지 확인한다.
4. `npm run check`와 `npm run build`를 마지막으로 실행한다.
5. 승인된 release commit을 GitHub의 배포 대상 브랜치에 push한다.
6. Vercel build 및 production deployment 상태를 확인한다.
7. 배포 완료 후 `https://synthya.ai`를 새 브라우저 세션에서 확인한다.
8. CDN 또는 브라우저 캐시의 이전 파일이 남아 있지 않은지 확인한다.
9. 아래 smoke test를 수행한다.

### 배포 직후 Smoke Test

- [ ] 홈페이지 HTTP 200 및 첫 화면 정상 표시
- [ ] 한국어/영어 자동 선택과 수동 전환
- [ ] 데스크톱/모바일 레이아웃
- [ ] Step 1과 Step 3 영상 재생
- [ ] Synthya 로고, Global ENP 로고, CAD 이미지 표시
- [ ] 모든 내비게이션 앵커
- [ ] 데모 요청 이메일
- [ ] Global ENP 외부 링크
- [ ] favicon
- [ ] Open Graph 이미지 공개 URL
- [ ] 브라우저 콘솔 오류
- [ ] `www.synthya.ai` 리디렉션 또는 동일 서비스

10. 이상이 없으면 release commit hash와 배포 시간을 기록하고 배포 완료로 선언한다.

## 8. 롤백 기준과 방법

다음 중 하나라도 발생하면 즉시 롤백을 우선한다.

- 홈페이지가 열리지 않음
- 주요 이미지 또는 영상이 광범위하게 누락
- 모바일 레이아웃이 사용할 수 없을 정도로 깨짐
- 언어 전환이 작동하지 않음
- 잘못된 도면, 파트너 로고 또는 미승인 문구가 노출
- 연락 CTA가 작동하지 않음
- 배포 후 반복적인 치명적 JavaScript 오류

권장 롤백:

1. Vercel에서 직전 정상 production deployment로 rollback한다.
2. GitHub 기반 복구가 필요하면 release commit을 `git revert`한 새 복구 commit을 push한다.
3. `git reset --hard` 또는 원격 이력 강제 변경은 사용하지 않는다.
4. 롤백 후 `synthya.ai` smoke test를 다시 실행한다.

현재 라이브 기준 commit:

```text
7ef62b9 Replace Replit OG/Twitter image with Synthya's own
```

## 9. 배포 책임 구분

### Codex가 준비·확인할 항목

- 코드 및 자산 포함 범위 정리
- TypeScript 검사와 production build
- 로컬·리뷰 사이트 화면 검수
- 링크, 언어, 영상, SEO 확인
- release commit 준비
- 사용자의 명시적 승인 후 push와 배포 상태 확인
- 배포 직후 smoke test

### 사용자가 확인할 항목

- 최종 카피와 브랜드 표현
- Global ENP 공개 승인 범위에 변동이 없는지
- Vercel production 프로젝트의 실제 연결 정보 또는 접근 승인
- release candidate 최종 승인
- `synthya.ai` 라이브 배포 최종 승인

## 10. 현재 준비 상태

2026-07-27 로컬 확인:

- `npm run check`: 통과
- `npm run build`: 통과
- build output: `dist/public`
- Vercel 로컬 연결: `synthya-vibecad-preview`
- GitHub 원격: `https://github.com/Kevinoh1737/synthya-official.git`
- 현재 브랜치: `local/vibecad-relaunch`
- production release: `f173e11 Relaunch Synthya as an AI CAD design agent`
- GitHub `main`: 반영 완료
- 실제 `synthya.ai`: 반영 및 smoke test 완료

현재 남은 주요 Gate:

다음 release의 주요 Gate:

1. 변경사항에 대한 새 release candidate 검수
2. 사용자 라이브 배포 최종 승인
3. Vercel production 배포 및 smoke test
