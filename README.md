# Notice Board React

React를 활용하여 제작한 공지사항 게시판 프로젝트입니다.

CRUD 기능을 중심으로 게시글 작성, 수정, 삭제, 검색, 필터, 정렬 기능을 구현했으며,
React 상태 관리와 컴포넌트 설계를 학습하기 위해 제작했습니다.

## Demo

https://notice-board-react.vercel.app/

---

## Tech Stack

- React
- Vite
- JavaScript
- SCSS
- React Router
- LocalStorage
- Vercel

---

## Features

### 게시글 CRUD
- 게시글 작성 / 조회 / 수정 / 삭제
- 작성 날짜 자동 생성
- 삭제 확인 Modal 구현

### 검색 및 필터
- 제목 검색 기능
- 카테고리별 필터링
- 조회순 / 최신순 / 오래된순 정렬

### 데이터 관리
- LocalStorage를 활용한 데이터 저장
- 새로고침 이후에도 데이터 유지

### UI Component
- 재사용 가능한 Modal 컴포넌트 구현
- Dropdown 컴포넌트 구현
- 외부 클릭 시 Dropdown 닫힘 처리

---

## Project Structure


src
├── api
├── assets
├── components
├── mocks
├── pages
├── router
├── services
└── App.jsx

---

## Learned

- React 상태 관리와 Props 데이터 흐름 이해
- useState, useMemo, useEffect, useRef 활용
- CRUD 데이터 처리 방식 학습
- React Router를 활용한 SPA 구현
- Vercel 배포 경험

---

## Future Improvements

- Backend API 연동
- Database 연결
- TypeScript 적용
- 로그인 기능 추가
