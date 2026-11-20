// 검사 문항
// 각 보기의 scores 는 해당 답을 골랐을 때 각 언어에 더해지는 점수예요.
// 언어마다 받을 수 있는 최대 점수가 다르기 때문에 app.js 에서 비율(%)로 환산해 비교해요.
const QUESTIONS = [
  {
    title: "프로그래밍으로 가장 먼저 만들어보고 싶은 것은?",
    hint: "지금 가장 설레는 것을 골라주세요.",
    options: [
      { text: "멋진 웹사이트나 웹 서비스", icon: "🌐", scores: { javascript: 3, python: 1, java: 1 } },
      { text: "스마트폰 앱", icon: "📱", scores: { kotlin: 3, swift: 3, javascript: 1 } },
      { text: "직접 플레이할 수 있는 게임", icon: "🎮", scores: { csharp: 3, cpp: 2 } },
      { text: "데이터 분석이나 AI 프로그램", icon: "🤖", scores: { python: 3 } },
    ],
  },
  {
    title: "새로운 것을 배울 때 어떤 방식이 더 즐거운가요?",
    hint: "평소 공부하는 습관을 떠올려 보세요.",
    options: [
      { text: "바로 눈에 보이는 결과가 나오는 것", icon: "👀", scores: { javascript: 2, swift: 2, csharp: 1, kotlin: 1 } },
      { text: "원리를 끝까지 깊이 이해하는 것", icon: "🔬", scores: { cpp: 3, go: 1, java: 1 } },
      { text: "짧은 코드로 빠르게 무언가 동작하는 것", icon: "⚡", scores: { python: 3, go: 1 } },
      { text: "정해진 규칙과 구조를 차근차근 따라가는 것", icon: "📐", scores: { java: 3, csharp: 1, kotlin: 1 } },
    ],
  },
  {
    title: "주로 사용하거나 관심 있는 기기는?",
    hint: "내가 매일 쓰는 기기를 위한 프로그램을 만들면 동기부여가 커져요.",
    options: [
      { text: "아이폰 · 맥", icon: "🍎", scores: { swift: 3 } },
      { text: "안드로이드 스마트폰", icon: "🤖", scores: { kotlin: 3, java: 1 } },
      { text: "윈도우 PC · 게임기", icon: "🖥️", scores: { csharp: 2, cpp: 1, python: 1 } },
      { text: "특별히 없음 · 웹 브라우저", icon: "🌍", scores: { javascript: 2, python: 1, go: 1 } },
    ],
  },
  {
    title: "미래에 되고 싶은 모습에 가장 가까운 것은?",
    hint: "정답은 없어요. 지금의 마음을 골라주세요.",
    options: [
      { text: "나만의 서비스를 만드는 창업가 · 1인 개발자", icon: "🚀", scores: { javascript: 2, swift: 1, kotlin: 1, python: 1 } },
      { text: "안정적인 대기업 · 금융권 개발자", icon: "🏢", scores: { java: 3, kotlin: 1 } },
      { text: "데이터 사이언티스트 · AI 엔지니어", icon: "📊", scores: { python: 3 } },
      { text: "게임 · 로봇 · 하드웨어 엔지니어", icon: "🦾", scores: { cpp: 3, csharp: 2 } },
      { text: "클라우드 · 서버 인프라 전문가", icon: "☁️", scores: { go: 3, java: 1 } },
    ],
  },
  {
    title: "어려운 문제를 만났을 때 나는?",
    hint: "가장 나다운 행동을 골라주세요.",
    options: [
      { text: "일단 이것저것 바꿔보며 시도한다", icon: "🧪", scores: { javascript: 2, python: 1, swift: 1 } },
      { text: "공식 문서와 설명을 꼼꼼히 읽는다", icon: "📖", scores: { go: 2, cpp: 1, java: 1 } },
      { text: "전체 구조를 그림으로 먼저 정리한다", icon: "🗺️", scores: { java: 2, csharp: 1, kotlin: 1 } },
      { text: "비슷한 예제를 검색해서 참고한다", icon: "🔍", scores: { python: 2, javascript: 1 } },
    ],
  },
  {
    title: "수학이나 논리 퍼즐을 얼마나 좋아하나요?",
    hint: "",
    options: [
      { text: "아주 좋아한다! 풀 때까지 붙잡고 있는다", icon: "🧩", scores: { cpp: 3, python: 1 } },
      { text: "적당히 좋아한다", icon: "🙂", scores: { java: 1, go: 1, csharp: 1, kotlin: 1 } },
      { text: "그다지 좋아하지 않는다", icon: "😅", scores: { javascript: 2, python: 1 } },
      { text: "숫자보다 디자인이나 시각적인 것이 좋다", icon: "🎨", scores: { javascript: 2, swift: 2 } },
    ],
  },
  {
    title: "컴퓨터 성능이나 내부 동작에 관심이 있나요?",
    hint: "",
    options: [
      { text: "컴퓨터가 어떻게 돌아가는지 너무 궁금하다", icon: "🧠", scores: { cpp: 3, go: 1 } },
      { text: "많은 사용자를 빠르게 처리하는 서버가 궁금하다", icon: "🛰️", scores: { go: 3, java: 2 } },
      { text: "게임 그래픽과 물리 효과가 궁금하다", icon: "✨", scores: { csharp: 3, cpp: 1 } },
      { text: "별로 관심 없다. 결과물이 잘 동작하면 된다", icon: "👍", scores: { python: 1, javascript: 1, swift: 1, kotlin: 1 } },
    ],
  },
  {
    title: "일주일에 공부에 쓸 수 있는 시간은?",
    hint: "현실적으로 생각해 보세요. 쉬운 언어일수록 적은 시간에도 성취감을 느낄 수 있어요.",
    options: [
      { text: "3시간 이하", icon: "⏱️", scores: { python: 2, javascript: 1 } },
      { text: "3 ~ 7시간", icon: "🕒", scores: { javascript: 1, python: 1, kotlin: 1, swift: 1 } },
      { text: "7 ~ 15시간", icon: "🕘", scores: { java: 1, csharp: 1, go: 1, kotlin: 1 } },
      { text: "15시간 이상", icon: "🔥", scores: { cpp: 2, java: 1, csharp: 1 } },
    ],
  },
  {
    title: "어떤 환경에서 일하고 싶나요?",
    hint: "",
    options: [
      { text: "혼자 자유롭게 아이디어를 실현하는 환경", icon: "🏝️", scores: { python: 1, javascript: 1, swift: 2 } },
      { text: "큰 팀에서 체계적인 규칙에 따라 협업하는 환경", icon: "👥", scores: { java: 3, kotlin: 1 } },
      { text: "오픈소스 · 클라우드 기술을 다루는 환경", icon: "🐙", scores: { go: 3, python: 1 } },
      { text: "디자이너 · 기획자와 함께 만드는 크리에이티브한 환경", icon: "🎬", scores: { javascript: 2, csharp: 2, swift: 1, kotlin: 1 } },
    ],
  },
  {
    title: "가장 끌리는 키워드를 하나 고른다면?",
    hint: "직감적으로 골라주세요!",
    options: [
      { text: "AI · 자동화", icon: "🤖", scores: { python: 3 } },
      { text: "인터랙티브 · UI", icon: "🖱️", scores: { javascript: 3, swift: 1, kotlin: 1 } },
      { text: "모바일 · 앱스토어", icon: "📲", scores: { kotlin: 2, swift: 2 } },
      { text: "안정성 · 확장성", icon: "🏗️", scores: { java: 2, go: 2 } },
      { text: "속도 · 제어", icon: "🏎️", scores: { cpp: 3, go: 1 } },
      { text: "몰입 · 게임", icon: "🕹️", scores: { csharp: 3, cpp: 1 } },
    ],
  },
];
