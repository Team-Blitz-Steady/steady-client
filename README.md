## 스테디: 스터디 / 프로젝트 모집 플랫폼

<p align="center"><img src="https://github.com/Team-Blitz-Steady/steady-client/assets/69716992/fce399f8-bab9-4cf2-bcc1-d29ecfba7fd6" width="50%" height="30%"/>
</p>

> 🤔 <span style="font-size: 16px">“큰 노력을 들이지 않고도 좋은 팀원을 만날 수 있는 사이트 어디 없나?”<span><br> 😀 “내가 스터디 / 프로젝트에 진심으로 참여하는 사람이라는 것을 신청 단계에서 보여주고 싶어!”
>
> > <span style="font-size: 16px">좋은 팀장 또는 팀원들과 양질의 스터디 및 프로젝트를 경험하고 싶은 IT 개발 분야의 모든 사람들이 저희 서비스의 타겟 유저입니다.</span>

## 실행 방법

```bash
# 개발 환경 실행
pnpm i
pnpm dev

# 프로덕션 환경 실행
pnpm i
pnpm build
pnpm start
```

## 팀원 소개

|                                             FE                                             |                                             FE                                             |                                            FE                                             |
| :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/61570018?v=4" width=400px alt="이정욱"/> | <img src="https://avatars.githubusercontent.com/u/109654823?v=4" width=400px alt="이지윤"> | <img src="https://avatars.githubusercontent.com/u/69716992?v=4" width=400px alt="홍창기"> |
|                           [이정욱](https://github.com/JeongWuk)                            |                            [이지윤](https://github.com/JIY00N2)                            |                          [홍창기](https://github.com/sscoderati)                          |
|                                          UI / UX                                           |                                        Scurm Master                                        |                                        Team Leader                                        |

## 역할 분담

### 이정욱
- 프로젝트 디자인 총괄
- 메인, 스테디 리뷰, 내 신청서 관리, 스테디 템플릿, 404 페이지 구현
- 반응형 구현

### 이지윤
- 로그인 온보딩 구현
- 스테디 상세, 내 스테디 목록, 신청자 목록 및 답변 열람 페이지, 내가 받은 리뷰, 신청서 작성, 신청서 수정 페이지 구현
- 에러, 로딩(스켈레톤) 페이지 구현
- 페이지 반응형 구현
- 문서화 작업

### 홍창기
- 소셜 로그인, 인증 구현
- 스테디 등록 / 수정 페이지 구현
- 내 프로필 페이지 구현
- 질문 등록 / 수정 페이지 구현
- 스테디 운영 페이지 구현



## 기능 소개

<img width="1142" alt="image" src="https://github.com/Team-Blitz-Steady/steady-client/assets/109654823/f6c3f93c-662e-4675-af4e-8360274bef69">

<img width="1145" alt="image" src="https://github.com/Team-Blitz-Steady/steady-client/assets/109654823/2c3bc330-b023-42b9-bfe6-cfdcfc7ed05b">

<img width="1149" alt="image" src="https://github.com/Team-Blitz-Steady/steady-client/assets/109654823/681823fa-9ae4-442b-8e72-c84d3961e02e">

<img width="1145" alt="image" src="https://github.com/Team-Blitz-Steady/steady-client/assets/109654823/e69baf74-477c-48f6-933b-96f803912ce6">

<img width="1145" alt="image" src="https://github.com/Team-Blitz-Steady/steady-client/assets/109654823/b15680a6-dc60-4331-aabd-accd5f41e8f5">



## 브랜치 네이밍

```bash
// 브랜치 네이밍
feat/#12/postDetail (x)
feat/#12/post-detail (o)
```

## Commit 컨벤션

**커밋 메세지 형식**

```
Emoji Type(#issue-num): subject
// ex) 🚨 Fix(#41): commitlint 이슈 해결
```

```bash
🚨 Fix: [파일 명.tsx] - [수정 내용]
✨ Feat: 새로운 기능 추가, 사용자 입장에서 변화가 있을 경우
🎉 Init: 프로젝트 초기 생성
📝 Chore: 그 외 자잘한 수정에 대한 커밋, 주석, 의존성 설치, 리드미 수정
💄 Style: CSS, styled-component 스타일 관련 변경
🔨 Refactor: 코드 리팩토링에 대한 커밋, 사용자 입장에서 변화가 없는 코드, 파일명 폴더명 변경 및 이동
🗑️ Remove: 파일을 삭제하는 작업만 수행하는 경우
```

## 기술 스택

|       Language       |                                                                                                                                         ![a](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)                                                                                                                                         |
| :------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     **Library**      |                                                                                                                                            ![a](https://img.shields.io/badge/Next.js-white?style=flat-square&logo=Next.js&logoColor=black)                                                                                                                                             |
|      **Build**       |                                                                                                                                                ![a](https://img.shields.io/badge/SWC-white?style=flat-square&logo=SWC&logoColor=black)                                                                                                                                                 |
|     **Package**      |                                                                                                                                               ![a](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=black)                                                                                                                                               |
|       **Http**       |                                                                                                                                              ![a](https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=axios&logoColor=white)                                                                                                                                              |
| **State Management** |                                                                                                                                            ![a](https://img.shields.io/badge/zustand-4A154B?style=flat-square&logo=zustand&logoColor=white)                                                                                                                                            |
|  **Data Fetching**   |                                                                                                                                       ![a](https://img.shields.io/badge/TanstackQuery-FF4154?style=flat-square&logo=reactquery&logoColor=white)                                                                                                                                        |
|      **Style**       |                                                                                                                                        ![a](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white)                                                                                                                                        |
|   **Code Format**    |                                                                                           ![a](https://img.shields.io/badge/ESlint-4B32C3?style=flat-square&logo=eslint&logoColor=white) ![a](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=black)                                                                                            |
|      **Deploy**      |                                                                                                                                             ![a](https://img.shields.io/badge/vercel-000000?style=flat-square&logo=vercel&logoColor=white)                                                                                                                                             |
|     **Co-work**      | ![a](https://img.shields.io/badge/Gather-5865F2?style=flat-square&logo=Gather&logoColor=white)![a](https://img.shields.io/badge/github-181717?style=flat-square&logo=github&logoColor=white)![a](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)![a](https://img.shields.io/badge/slack-4A154B?style=flat-square&logo=slack&logoColor=white) |

## 디렉토리 구조

```
📦public
┗ 📦assets -> 정적 파일들
📦src
┣ 📦app -> 라우팅 용도
┣ ┣ 📦[dynamic] -> 동적 라우팅
┣ 📦components -> 컴포넌트
┣ ┣ 📦_common -> 공통 컴포넌트
┣ ┗ 📦containers -> 지역적인 UI 컴포넌트
┣ 📦constants -> 상수
┣ 📦hooks -> 커스텀 훅
┣ 📦services -> api 요청
┣ ┣ 📦types ->
┣ 📦stores -> Zustand Store
┗ 📦utils -> 유틸함수
```


