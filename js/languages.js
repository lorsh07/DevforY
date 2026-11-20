// 추천 대상 언어 정보
// difficulty: 1(쉬움) ~ 5(어려움)
const LANGUAGES = {
  python: {
    name: "Python",
    icon: "🐍",
    color: "#3776ab",
    tagline: "쉽고 강력한 만능 언어",
    summary:
      "영어 문장처럼 읽히는 간결한 문법 덕분에 처음 배우기 가장 좋은 언어 중 하나예요. 데이터 분석, 인공지능, 업무 자동화, 웹 서버까지 활용 범위가 매우 넓어요.",
    fit: [
      "짧은 코드로 빠르게 결과를 보고 싶은 분",
      "AI·데이터·자동화에 관심 있는 분",
      "부담 없이 프로그래밍 개념부터 익히고 싶은 분",
    ],
    build: ["AI·머신러닝 모델", "데이터 분석과 시각화", "엑셀·파일 업무 자동화", "웹 크롤러", "웹 서버(Django, FastAPI)"],
    jobs: ["데이터 분석가", "AI/ML 엔지니어", "백엔드 개발자", "자동화 엔지니어"],
    difficulty: 1,
    roadmap: [
      "변수, 조건문, 반복문, 함수 같은 기본 문법 익히기",
      "리스트·딕셔너리를 다루며 작은 문제(코딩 테스트 입문) 풀어보기",
      "파일 정리, 웹 크롤링 같은 생활 속 자동화 스크립트 만들기",
      "관심 분야 라이브러리 배우기 (pandas, FastAPI, scikit-learn 등)",
    ],
    resources: [
      { label: "파이썬 공식 자습서 (한국어)", url: "https://docs.python.org/ko/3/tutorial/" },
      { label: "생활코딩 Python", url: "https://opentutorials.org/course/4769" },
      { label: "점프 투 파이썬 (위키독스)", url: "https://wikidocs.net/book/1" },
    ],
  },
  javascript: {
    name: "JavaScript",
    icon: "🌐",
    color: "#e0b300",
    tagline: "웹을 움직이는 언어",
    summary:
      "모든 웹 브라우저에서 바로 실행되는 언어예요. 코드를 쓰면 화면에 즉시 결과가 나타나서 성취감이 크고, 웹사이트부터 서버, 모바일 앱까지 하나의 언어로 만들 수 있어요.",
    fit: [
      "눈에 보이는 결과물을 바로 만들고 싶은 분",
      "디자인·UI와 인터랙션에 관심 있는 분",
      "나만의 웹 서비스를 만들어 공유하고 싶은 분",
    ],
    build: ["반응형 웹사이트", "웹 서비스·웹 앱(React, Vue)", "서버(Node.js)", "크로스플랫폼 앱(React Native)", "브라우저 게임"],
    jobs: ["프론트엔드 개발자", "풀스택 개발자", "웹 퍼블리셔", "1인 서비스 개발자"],
    difficulty: 2,
    roadmap: [
      "HTML·CSS로 간단한 웹페이지 만들기",
      "JavaScript 기본 문법과 DOM 조작으로 버튼·폼에 기능 붙이기",
      "fetch로 외부 데이터를 불러와 보여주는 미니 프로젝트 만들기",
      "React 같은 프레임워크와 Git으로 포트폴리오 사이트 배포하기",
    ],
    resources: [
      { label: "MDN JavaScript 가이드 (한국어)", url: "https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide" },
      { label: "모던 JavaScript 튜토리얼", url: "https://ko.javascript.info/" },
      { label: "생활코딩 WEB1 - HTML & Internet", url: "https://opentutorials.org/course/3084" },
    ],
  },
  java: {
    name: "Java",
    icon: "☕",
    color: "#e76f00",
    tagline: "탄탄한 기업용 대표 언어",
    summary:
      "국내 대기업·금융권·공공기관 서비스에서 가장 많이 쓰이는 언어예요. 규칙이 명확해서 처음엔 코드가 길게 느껴질 수 있지만, 객체지향 프로그래밍의 기본기를 단단하게 다질 수 있어요.",
    fit: [
      "체계적이고 구조적인 학습을 좋아하는 분",
      "안정적인 기업 취업을 목표로 하는 분",
      "큰 규모의 서비스가 어떻게 만들어지는지 궁금한 분",
    ],
    build: ["대규모 웹 서비스 백엔드(Spring)", "금융·결제 시스템", "안드로이드 앱", "기업용 소프트웨어"],
    jobs: ["백엔드 개발자", "SI/금융권 개발자", "안드로이드 개발자"],
    difficulty: 3,
    roadmap: [
      "기본 문법과 자료형, 클래스와 객체 개념 익히기",
      "상속·인터페이스·컬렉션으로 객체지향 설계 연습하기",
      "콘솔 기반 미니 프로젝트(도서 관리, 가계부 등) 완성하기",
      "Spring Boot로 간단한 REST API 서버 만들고 DB 연결하기",
    ],
    resources: [
      { label: "Dev.java 공식 학습", url: "https://dev.java/learn/" },
      { label: "생활코딩 Java", url: "https://opentutorials.org/course/3930" },
      { label: "Spring 공식 가이드", url: "https://spring.io/guides" },
    ],
  },
  csharp: {
    name: "C#",
    icon: "🎮",
    color: "#68217a",
    tagline: "게임 개발의 첫걸음",
    summary:
      "세계에서 가장 많이 쓰이는 게임 엔진인 Unity의 언어예요. 깔끔한 문법과 강력한 도구 덕분에 게임은 물론 윈도우 프로그램, 웹 서버까지 폭넓게 만들 수 있어요.",
    fit: [
      "게임을 직접 만들어보고 싶은 분",
      "보이는 결과와 탄탄한 문법을 모두 원하는 분",
      "윈도우 PC 프로그램에 관심 있는 분",
    ],
    build: ["2D·3D 게임(Unity)", "VR·AR 콘텐츠", "윈도우 데스크톱 앱", "웹 서버(ASP.NET)"],
    jobs: ["게임 클라이언트 개발자", "Unity 개발자", ".NET 백엔드 개발자"],
    difficulty: 3,
    roadmap: [
      "C# 기본 문법과 클래스, 객체 개념 익히기",
      "Unity 설치 후 공식 튜토리얼로 간단한 2D 게임 만들기",
      "충돌·물리·애니메이션을 활용한 나만의 미니 게임 완성하기",
      "완성한 게임을 itch.io 등에 올려 다른 사람에게 플레이 받기",
    ],
    resources: [
      { label: "Microsoft C# 문서 (한국어)", url: "https://learn.microsoft.com/ko-kr/dotnet/csharp/" },
      { label: "Unity Learn", url: "https://learn.unity.com/" },
      { label: "C# 기초 학습 경로", url: "https://learn.microsoft.com/ko-kr/dotnet/csharp/tour-of-csharp/" },
    ],
  },
  kotlin: {
    name: "Kotlin",
    icon: "🤖",
    color: "#7f52ff",
    tagline: "안드로이드 앱의 공식 언어",
    summary:
      "구글이 공식 지정한 안드로이드 앱 개발 언어예요. Java보다 간결하고 안전하게 설계되어 있어 배우기 편하고, 서버 개발에도 점점 많이 쓰이고 있어요.",
    fit: [
      "안드로이드 스마트폰 앱을 만들고 싶은 분",
      "현대적이고 깔끔한 문법을 선호하는 분",
      "모바일 서비스로 많은 사용자를 만나고 싶은 분",
    ],
    build: ["안드로이드 앱", "모바일 게임·유틸리티 앱", "서버(Spring, Ktor)", "멀티플랫폼 앱(KMP)"],
    jobs: ["안드로이드 개발자", "모바일 앱 개발자", "백엔드 개발자"],
    difficulty: 2,
    roadmap: [
      "Kotlin 기본 문법(변수, 함수, 클래스, null 안정성) 익히기",
      "Android Studio 설치 후 버튼과 화면 전환이 있는 앱 만들기",
      "Jetpack Compose로 UI를 구성하고 외부 API 데이터 연결하기",
      "직접 만든 앱을 내 휴대폰에 설치해 사용해보고 개선하기",
    ],
    resources: [
      { label: "Kotlin 공식 문서", url: "https://kotlinlang.org/docs/getting-started.html" },
      { label: "Android 개발자 과정 (한국어)", url: "https://developer.android.com/courses?hl=ko" },
      { label: "Kotlin Koans (실습)", url: "https://play.kotlinlang.org/koans/overview" },
    ],
  },
  swift: {
    name: "Swift",
    icon: "🍎",
    color: "#f05138",
    tagline: "아이폰·맥 앱을 위한 언어",
    summary:
      "애플이 만든 언어로 아이폰, 아이패드, 맥, 애플워치 앱을 만들 수 있어요. 문법이 읽기 쉽고, SwiftUI를 쓰면 화면을 몇 줄의 코드로 빠르게 그릴 수 있어요.",
    fit: [
      "아이폰·맥을 사용하고 애플 생태계를 좋아하는 분",
      "예쁜 디자인과 사용자 경험에 관심 있는 분",
      "내 앱을 앱스토어에 출시해보고 싶은 분",
    ],
    build: ["iOS·iPadOS 앱", "macOS 앱", "Apple Watch 앱", "위젯·앱 클립"],
    jobs: ["iOS 개발자", "모바일 앱 개발자", "1인 앱 개발자"],
    difficulty: 2,
    roadmap: [
      "Swift Playgrounds로 기본 문법을 게임처럼 익히기",
      "Xcode와 SwiftUI로 화면 몇 개짜리 간단한 앱 만들기",
      "데이터 저장과 네트워크 통신을 붙여 실용적인 앱 완성하기",
      "TestFlight로 친구에게 배포하고 앱스토어 출시에 도전하기",
    ],
    resources: [
      { label: "Swift 공식 문서", url: "https://www.swift.org/documentation/" },
      { label: "SwiftUI 튜토리얼 (Apple)", url: "https://developer.apple.com/tutorials/swiftui" },
      { label: "Swift Playgrounds", url: "https://www.apple.com/kr/swift/playgrounds/" },
    ],
  },
  cpp: {
    name: "C / C++",
    icon: "⚙️",
    color: "#00599c",
    tagline: "컴퓨터의 원리를 깨우치는 언어",
    summary:
      "메모리와 하드웨어를 직접 다루는 언어예요. 처음엔 어렵지만 컴퓨터가 실제로 어떻게 동작하는지 깊이 이해할 수 있고, 게임 엔진·운영체제·로봇처럼 성능이 중요한 분야의 기반이에요.",
    fit: [
      "원리를 끝까지 파고드는 것을 좋아하는 분",
      "수학·논리 문제 해결을 즐기는 분",
      "로봇·하드웨어·고성능 프로그램에 관심 있는 분",
    ],
    build: ["게임 엔진(Unreal)", "임베디드·IoT·로봇", "운영체제·드라이버", "알고리즘 대회(코딩 테스트)"],
    jobs: ["임베디드 개발자", "게임 엔진 개발자", "시스템 프로그래머", "자율주행·로봇 엔지니어"],
    difficulty: 5,
    roadmap: [
      "C 기본 문법과 포인터, 메모리 구조 이해하기",
      "C++의 클래스와 STL(vector, map 등) 익히기",
      "백준·프로그래머스에서 알고리즘 문제 꾸준히 풀기",
      "아두이노 프로젝트나 간단한 게임으로 실전 경험 쌓기",
    ],
    resources: [
      { label: "LearnCpp.com", url: "https://www.learncpp.com/" },
      { label: "cppreference (레퍼런스)", url: "https://ko.cppreference.com/w/" },
      { label: "백준 온라인 저지", url: "https://www.acmicpc.net/" },
    ],
  },
  go: {
    name: "Go",
    icon: "🐹",
    color: "#00add8",
    tagline: "빠르고 단순한 클라우드 언어",
    summary:
      "구글이 만든 언어로, 문법이 단순하면서도 실행 속도가 빨라요. Docker, Kubernetes 같은 클라우드 핵심 도구가 Go로 만들어졌고, 대용량 트래픽을 처리하는 서버에 많이 쓰여요.",
    fit: [
      "단순하고 명확한 코드를 좋아하는 분",
      "서버·클라우드·인프라에 관심 있는 분",
      "오픈소스 프로젝트에 기여해보고 싶은 분",
    ],
    build: ["고성능 API 서버", "클라우드·DevOps 도구", "CLI 프로그램", "마이크로서비스"],
    jobs: ["백엔드 개발자", "DevOps·클라우드 엔지니어", "SRE"],
    difficulty: 3,
    roadmap: [
      "A Tour of Go로 기본 문법과 구조체·인터페이스 익히기",
      "고루틴과 채널로 동시성 프로그래밍 개념 이해하기",
      "표준 라이브러리만으로 간단한 웹 서버와 CLI 도구 만들기",
      "Docker로 서버를 컨테이너화하고 클라우드에 배포해보기",
    ],
    resources: [
      { label: "A Tour of Go (한국어)", url: "https://go-tour-ko.appspot.com/" },
      { label: "Go 공식 문서", url: "https://go.dev/doc/" },
      { label: "Go by Example", url: "https://gobyexample.com/" },
    ],
  },
};
