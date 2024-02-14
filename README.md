# 🍔 맞춤형 메뉴 추천 서비스 : 투잇 (Today-Eat)

### [✨배포사이트](https://today-eat.vercel.app)

## 개요

각 사용자의 선호하는 옵션을 기반으로 최적의 메뉴를 추천하며, 현재 위치를 기반으로 한 식당 정보를 지도를 통해 제공합니다. <br>
사용자는 자신의 취향과 식사 선호도를 반영한 맞춤형 식단을 즐길 수 있고, 추천된 식당의 위치와 정보를 쉽게 확인하여 편리하게 방문할 수 있습니다.

## 개발 정보
- 개인 프로젝트
- 1차 개발기간 : 2024.02.09 ~ 2024.02.13
- Front : Typescript, Next.js, React, Tailwnd CSS


<br>

## 페이지 및 기능

### [홈화면]
- 매콤, 기름진, 국물, 밥의 옵션을 선택하는 페이지입니다.
- context를 통해 사용자의 선호 옵션들을 저장하였습니다.

<img width="700" alt="스크린샷 2024-02-12 오후 8 29 50" src="https://github.com/Jangeunhye/Today-Eat/assets/65762430/2ca24fba-89e6-4a7b-b1d0-65eddabf68ec">
<img width="700" src="https://github.com/Jangeunhye/Today-Eat/assets/65762430/f986e6f6-c481-4e26-a6b1-a68ed0bf73d0">

### [결과페이지]
- 전체 음식 리스트에서 선호 옵션들에 해당하는 음식들 중 랜덤으로 메뉴를 추천합니다.
- "다시선택"을 누르면 홈 화면으로 이동하여 다시 옵션을 선택할 수 있습니다.
- "새로고침"을 누르면 선택한 옵션들을 그대로지만 랜덤으로 음식들이 변경
됩니다.
- "지도 보기"를 눌러 음식점의 정보를 확인할 수 있습니다.
<img width="700" alt="스크린샷 2024-02-14 오전 9 16 19" src="https://github.com/Jangeunhye/Today-Eat/assets/65762430/c67d8f86-f022-4fb5-a2bf-10e737625a77">


### [지도보기]
- kakaomap api를 통해 현재 위치를 기반으로 가까운 추천음식 식당을 제공합니다.
- 각 음식점의 정보를 클릭하면 카카오맵 길찾기 페이지로 이동합니다.
<img width="700" alt="스크린샷 2024-02-14 오전 9 16 52" src="https://github.com/Jangeunhye/Today-Eat/assets/65762430/c8de092d-22b1-49db-9267-5f225574f3a5">
