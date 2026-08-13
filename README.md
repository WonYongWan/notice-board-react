# Notice Board React

React와 Supabase를 활용하여 제작한 공지사항 게시판 프로젝트입니다.

CRUD 기능을 중심으로 게시글 작성, 수정, 삭제, 조회, 검색, 필터, 정렬 기능을 구현했으며,
Supabase Database를 연동하여 실제 데이터베이스를 활용한 데이터 관리 구조를 구현했습니다.

## Demo

https://notice-board-react.vercel.app/

---

## Tech Stack

- React
- Vite
- JavaScript
- SCSS
- React Router
- Supabase
- PostgreSQL
- Vercel

---

## Features

### 게시글 CRUD

- 게시글 작성 / 조회 / 수정 / 삭제
- Supabase Database를 활용한 게시글 데이터 관리
- 작성 날짜 및 수정 날짜 자동 관리
- 게시글 수정 시 `updated_at` 자동 갱신
- 삭제 확인 Modal 구현
- 게시글 조회 시 조회수 증가

### 검색 및 필터

- 제목 검색 기능
- 카테고리별 필터링
- 조회순 / 최신순 / 오래된순 정렬
- 검색 및 필터 결과에 따른 페이지네이션

### 데이터 관리

- Supabase Database와 연동
- PostgreSQL 기반 `posts` 테이블 구성
- Supabase API를 활용한 CRUD 구현
- Database Function을 활용한 조회수 증가 처리
- Database Trigger를 활용한 `updated_at` 자동 갱신

### UI Component

- 재사용 가능한 Modal 컴포넌트 구현
- Dropdown 컴포넌트 구현
- 외부 클릭 시 Dropdown 닫힘 처리
- 페이지네이션 구현

---

## Project Structure

```
📦src
├── 📂api
├── 📂assets
├── 📂components
├── 📂mocks
├── 📂pages
├── 📂router
├── 📂services
└── 📜App.jsx
```

---

## Learned

- React 상태 관리와 Props 데이터 흐름 이해
- useState, useMemo, useEffect, useRef 활용
- React Router를 활용한 SPA 구현
- CRUD 데이터 처리 방식 학습
- Supabase를 활용한 Database 연동
- PostgreSQL 기반 테이블 구조 및 데이터 관리
- Supabase API를 활용한 CRUD 구현
- Database Function을 활용한 조회수 증가 처리
- Database Trigger를 활용한 updated_at 자동 갱신
- Vercel을 활용한 배포 및 환경변수 설정

---

## Update History

### 2026.08.13

#### Supabase Database 연동

- Supabase 프로젝트 생성 및 연결
- PostgreSQL posts 테이블 생성
- 기존 LocalStorage 기반 데이터 관리 방식을 Supabase Database 기반으로 변경
- Supabase를 활용한 게시글 CRUD 구현
  - 게시글 생성
  - 게시글 조회
  - 게시글 수정
  - 게시글 삭제
- Supabase Database와 연동하여 검색 및 카테고리 필터 기능 적용
- Supabase 데이터 기반 조회순 / 최신순 / 오래된순 정렬 기능 적용
- 게시글 수정 시 Database Trigger를 활용하여 updated_at 자동 갱신
- 게시글 조회 시 Database Function을 활용하여 조회수 증가 처리
- Supabase 환경변수를 Vercel에 설정하여 배포 환경 구성

---

## Future Improvements

- TypeScript 적용
- 로그인 / 회원가입 기능 추가
- 사용자 인증 및 권한 관리
- 댓글 기능 추가
- 이미지 업로드 기능 추가
- RLS(Row Level Security)를 활용한 데이터 접근 권한 관리
