// 시작 화면 배경: 짙은 회색 점들 위로 빛이 파도타기처럼 지나가는 효과
(function () {
  "use strict";

  const canvas = document.querySelector(".hero-dots");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;

  // 캔버스 위치를 CSS에만 맡기지 않아요. (예전 CSS가 캐시돼 있으면 캔버스가 화면 흐름에 끼어들어
  // 히어로 높이를 키우고 → 캔버스가 다시 커지는 무한 반복이 생길 수 있어서)
  Object.assign(canvas.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  });
  const MAX_SIDE = 4096; // 혹시 모를 경우에도 캔버스가 끝없이 커지지 않게
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // 점 밝기: 평소엔 검정에 가까운 회색, 파도 꼭대기에서 살짝 밝아져요
  const BASE = 30; // rgb(30,30,30)
  const PEAK = 92; // rgb(92,92,92)
  const LEVELS = 14; // 밝기 단계를 나눠서 한 번에 그리기(성능)

  let dots = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = 0;
  let visible = true;

  // 크기가 실제로 바뀌었을 때만 다시 배치해요. 바뀌지 않았으면 false
  function layout() {
    const rect = hero.getBoundingClientRect();
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
    const nextW = Math.min(rect.width, MAX_SIDE / nextDpr);
    const nextH = Math.min(rect.height, MAX_SIDE / nextDpr);
    if (nextW === width && nextH === height && nextDpr === dpr && dots.length) return false;
    dpr = nextDpr;
    width = nextW;
    height = nextH;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gap = width < 600 ? 18 : 24;
    const cols = Math.ceil(width / gap) + 1;
    const rows = Math.ceil(height / gap) + 1;
    const offsetX = (width - (cols - 1) * gap) / 2;
    const offsetY = (height - (rows - 1) * gap) / 2;
    dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({ x: offsetX + c * gap, y: offsetY + r * gap });
      }
    }
    return true;
  }

  // 두 개의 물결을 겹쳐서 자연스럽게, 꼭대기는 좁고 밝게
  function waveAt(x, y, t) {
    const a = Math.sin(x * 0.011 + y * 0.005 - t * 1.4);
    const b = Math.sin(x * 0.004 - y * 0.009 - t * 0.8 + 1.3);
    const w = (a * 0.65 + b * 0.35 + 1) / 2; // 0 ~ 1
    return w * w * w; // 꼭대기를 좁게 → 띠처럼 지나가는 느낌
  }

  function draw(time) {
    const t = time / 1000;
    ctx.clearRect(0, 0, width, height);

    const buckets = Array.from({ length: LEVELS }, () => []);
    for (const d of dots) {
      const level = Math.min(LEVELS - 1, Math.floor(waveAt(d.x, d.y, t) * LEVELS));
      buckets[level].push(d);
    }

    for (let i = 0; i < LEVELS; i++) {
      const list = buckets[i];
      if (!list.length) continue;
      const k = i / (LEVELS - 1);
      const v = Math.round(BASE + (PEAK - BASE) * k);
      const radius = 1 + k * 0.7;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.beginPath();
      for (const d of list) {
        ctx.moveTo(d.x + radius, d.y);
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      }
      ctx.fill();
    }
  }

  function loop(time) {
    draw(time);
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (rafId || reduceMotion.matches || !visible || document.hidden) return;
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function refresh(force) {
    if (!layout() && !force) return;
    stop();
    draw(performance.now()); // 움직임을 줄인 경우에도 정지 화면은 보여줘요
    start();
  }

  // 화면에 보일 때만 움직이기 (스크롤로 지나가거나 다른 화면으로 가면 멈춤)
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      visible ? start() : stop();
    }).observe(canvas);
  }

  if ("ResizeObserver" in window) {
    let pending = 0;
    new ResizeObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => refresh());
    }).observe(hero);
  } else {
    window.addEventListener("resize", () => refresh());
  }

  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", () => refresh(true));

  refresh(true);
})();
