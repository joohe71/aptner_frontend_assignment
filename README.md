# GitHub 유저 검색 및 북마크 서비스

이 프로젝트는 Next.js와 TypeScript를 기반으로 하며, Mantine UI와 Emotion을 사용하여 컴포넌트 스타일을 적용합니다. 또한, React Query와 React Intersection Observer를 활용하여 무한 스크롤 기능을 구현하였습니다.

## 실행 방법

1. 패키지 설치: `pnpm install`
2. 개발 서버 실행: `pnpm run dev`

### 주요 기능

- 무한 스크롤: React Query와 React Intersection Observer를 활용하여 사용자의 목록을 무한 스크롤로 불러옵니다.
- 세션 저장소: 새로 고침이 되어도 북마크한 상태 값이 변경되지 않도록 sessionStorage를 사용하여 상태를 관리합니다.
- GitHub API 활용:
  - 사용자 전체 조회 API
  - 사용자 검색 API

### 주요 사용 기술 스택 및 라이브러리

- next.js
- typeScript
- mantine
- emotion
- axios
- react-query
- react-intersection-observer
