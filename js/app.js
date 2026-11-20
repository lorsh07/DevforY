(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const screens = {
    intro: $("#screen-intro"),
    quiz: $("#screen-quiz"),
    result: $("#screen-result"),
  };

  const LANG_KEYS = Object.keys(LANGUAGES);

  // 문항별로 각 언어가 받을 수 있는 최대 점수의 합 (비율 계산용)
  const MAX_SCORES = LANG_KEYS.reduce((acc, key) => {
    acc[key] = QUESTIONS.reduce((sum, q) => {
      const best = Math.max(0, ...q.options.map((o) => o.scores[key] || 0));
      return sum + best;
    }, 0);
    return acc;
  }, {});

  let current = 0;
  let answers = []; // 문항별로 선택한 보기의 index

  // ---------- 화면 전환 ----------
  function show(name) {
    Object.entries(screens).forEach(([key, el]) => {
      el.classList.toggle("active", key === name);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- 시작 화면 ----------
  function renderIntroChips() {
    $("#intro-langs").innerHTML = LANG_KEYS.map((key) => {
      const l = LANGUAGES[key];
      return `<span class="chip">${l.icon} ${l.name}</span>`;
    }).join("");
  }

  function startQuiz() {
    current = 0;
    answers = [];
    history.replaceState(null, "", location.pathname + location.search);
    renderQuestion();
    show("quiz");
  }

  // ---------- 질문 화면 ----------
  function renderQuestion() {
    const q = QUESTIONS[current];
    const total = QUESTIONS.length;
    const pct = Math.round((current / total) * 100);

    $("#progress-label").textContent = `${current + 1} / ${total}`;
    $("#progress-bar").style.width = `${pct}%`;
    $(".progress").setAttribute("aria-valuenow", String(pct));
    $("#btn-back").style.visibility = current === 0 ? "hidden" : "visible";

    $("#question-title").textContent = `Q${current + 1}. ${q.title}`;
    const hint = $("#question-hint");
    hint.textContent = q.hint || "";
    hint.hidden = !q.hint;

    const box = $("#options");
    box.innerHTML = "";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.setAttribute("role", "listitem");
      if (answers[current] === i) btn.classList.add("selected");
      btn.innerHTML = `
        <span class="option-key">${i + 1}</span>
        <span class="option-icon" aria-hidden="true">${opt.icon}</span>
        <span class="option-text"></span>`;
      btn.querySelector(".option-text").textContent = opt.text;
      btn.addEventListener("click", () => choose(i, btn));
      box.appendChild(btn);
    });

    // 애니메이션 재시작
    box.classList.remove("fade-in");
    void box.offsetWidth;
    box.classList.add("fade-in");
  }

  let locked = false;
  function choose(index, btn) {
    if (locked) return;
    locked = true;
    answers[current] = index;
    document.querySelectorAll(".option").forEach((el) => el.classList.remove("selected"));
    btn.classList.add("selected");

    setTimeout(() => {
      locked = false;
      if (current < QUESTIONS.length - 1) {
        current += 1;
        renderQuestion();
      } else {
        finish();
      }
    }, 260);
  }

  function goBack() {
    if (current > 0) {
      current -= 1;
      renderQuestion();
    }
  }

  // ---------- 채점 ----------
  function calculate() {
    const raw = Object.fromEntries(LANG_KEYS.map((k) => [k, 0]));
    answers.forEach((optIndex, qIndex) => {
      const scores = QUESTIONS[qIndex].options[optIndex].scores;
      Object.entries(scores).forEach(([k, v]) => (raw[k] += v));
    });

    return LANG_KEYS.map((key) => ({
      key,
      raw: raw[key],
      percent: Math.round((raw[key] / MAX_SCORES[key]) * 100),
    })).sort((a, b) => b.percent - a.percent || b.raw - a.raw);
  }

  function finish() {
    $("#progress-bar").style.width = "100%";
    const ranking = calculate();
    const hash = "r=" + ranking.map((r) => `${r.key}.${r.percent}`).join(",");
    history.replaceState(null, "", "#" + hash);
    renderResult(ranking);
    show("result");
  }

  // 공유 링크(#r=python.82,javascript.60,...)에서 결과 복원
  function parseHash() {
    const m = location.hash.match(/^#r=(.+)$/);
    if (!m) return null;
    const ranking = m[1]
      .split(",")
      .map((part) => {
        const [key, pct] = part.split(".");
        return { key, percent: Math.max(0, Math.min(100, parseInt(pct, 10) || 0)) };
      })
      .filter((r) => LANGUAGES[r.key]);
    return ranking.length ? ranking : null;
  }

  // ---------- 결과 화면 ----------
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );
  }

  function difficultyLabel(n) {
    return ["", "아주 쉬움", "쉬움", "보통", "어려움", "도전적"][n];
  }

  function detailHTML(key, percent, isTop) {
    const l = LANGUAGES[key];
    const dots = Array.from({ length: 5 }, (_, i) =>
      `<span class="dot ${i < l.difficulty ? "on" : ""}"></span>`
    ).join("");

    return `
      <article class="result-hero" style="--lang:${l.color}">
        <p class="eyebrow">${isTop ? "당신에게 가장 잘 맞는 언어" : "추천 언어 상세 보기"}</p>
        <div class="hero-icon" aria-hidden="true">${l.icon}</div>
        <h1 id="result-name">${esc(l.name)}</h1>
        <p class="hero-tagline">${esc(l.tagline)}</p>
        <div class="match">
          <span class="match-num">${percent}%</span>
          <span class="match-label">적합도</span>
        </div>
        <p class="hero-summary">${esc(l.summary)}</p>
      </article>

      <div class="grid">
        <section class="card">
          <h3>💡 이런 분께 잘 맞아요</h3>
          <ul class="check-list">${l.fit.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        </section>

        <section class="card">
          <h3>🛠️ 이런 걸 만들 수 있어요</h3>
          <div class="tags">${l.build.map((b) => `<span class="tag">${esc(b)}</span>`).join("")}</div>
          <h3 class="mt">💼 관련 직업</h3>
          <div class="tags">${l.jobs.map((j) => `<span class="tag tag-soft">${esc(j)}</span>`).join("")}</div>
        </section>

        <section class="card">
          <h3>📈 입문 난이도</h3>
          <div class="difficulty">
            <div class="dots" aria-hidden="true">${dots}</div>
            <span>${difficultyLabel(l.difficulty)}</span>
          </div>
          <h3 class="mt">📚 추천 학습 자료</h3>
          <ul class="link-list">
            ${l.resources
              .map((r) => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.label)} ↗</a></li>`)
              .join("")}
          </ul>
        </section>

        <section class="card card-wide">
          <h3>🗺️ 4단계 학습 로드맵</h3>
          <ol class="roadmap">
            ${l.roadmap.map((step, i) => `<li><span class="step-num">${i + 1}</span><span>${esc(step)}</span></li>`).join("")}
          </ol>
        </section>
      </div>`;
  }

  function renderResult(ranking, selectedKey) {
    const top = ranking[0];
    const focus = ranking.find((r) => r.key === selectedKey) || top;
    const others = ranking.slice(1, 3);

    const altHTML = others
      .map((r) => {
        const l = LANGUAGES[r.key];
        const active = r.key === focus.key ? "active" : "";
        return `
          <button type="button" class="alt ${active}" data-key="${r.key}" style="--lang:${l.color}">
            <span class="alt-icon" aria-hidden="true">${l.icon}</span>
            <span class="alt-body">
              <strong>${esc(l.name)}</strong>
              <small>${esc(l.tagline)}</small>
            </span>
            <span class="alt-pct">${r.percent}%</span>
          </button>`;
      })
      .join("");

    const barsHTML = ranking
      .map((r) => {
        const l = LANGUAGES[r.key];
        return `
          <li>
            <span class="bar-name">${l.icon} ${esc(l.name)}</span>
            <span class="bar-track"><span class="bar-fill" style="--w:${r.percent}%;--lang:${l.color}"></span></span>
            <span class="bar-pct">${r.percent}%</span>
          </li>`;
      })
      .join("");

    const backToTop =
      focus.key !== top.key
        ? `<button type="button" class="btn-text back-top" data-key="${top.key}">← 1순위 ${esc(LANGUAGES[top.key].name)}(으)로 돌아가기</button>`
        : "";

    $("#result").innerHTML = `
      ${backToTop}
      ${detailHTML(focus.key, focus.percent, focus.key === top.key)}

      <section class="card">
        <h3>🥈 함께 고려해볼 만한 언어</h3>
        <p class="muted">눌러서 자세한 정보를 확인해 보세요.</p>
        <div class="alts">${altHTML}</div>
      </section>

      <section class="card">
        <h3>📊 언어별 적합도</h3>
        <ul class="bars">${barsHTML}</ul>
      </section>

      <div class="actions">
        <button type="button" id="btn-share" class="btn btn-primary">🔗 결과 링크 복사</button>
        <button type="button" id="btn-retry" class="btn btn-ghost">↺ 다시 검사하기</button>
      </div>
      <p id="toast" class="toast" role="status" aria-live="polite"></p>`;

    document.querySelectorAll("#result [data-key]").forEach((el) => {
      el.addEventListener("click", () => {
        renderResult(ranking, el.dataset.key);
        $("#result").scrollIntoView({ behavior: "smooth" });
      });
    });
    $("#btn-retry").addEventListener("click", startQuiz);
    $("#btn-share").addEventListener("click", shareResult);

    // 막대 그래프 애니메이션
    requestAnimationFrame(() => {
      document.querySelectorAll(".bar-fill").forEach((el) => el.classList.add("grow"));
    });
  }

  async function shareResult() {
    const url = location.href;
    const toast = $("#toast");
    try {
      if (navigator.share && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        await navigator.share({ title: "DevforY 개발 언어 적성 검사 결과", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.textContent = "결과 링크를 복사했어요!";
    } catch (e) {
      if (e && e.name === "AbortError") return;
      toast.textContent = "복사에 실패했어요. 주소창의 링크를 직접 복사해 주세요.";
    }
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // ---------- 키보드 단축키 (1~6 선택, Backspace 이전) ----------
  document.addEventListener("keydown", (e) => {
    if (!screens.quiz.classList.contains("active")) return;
    const n = parseInt(e.key, 10);
    const opts = document.querySelectorAll(".option");
    if (n >= 1 && n <= opts.length) opts[n - 1].click();
    else if (e.key === "Backspace") goBack();
  });

  // ---------- 초기화 ----------
  $("#btn-start").addEventListener("click", startQuiz);
  $("#btn-back").addEventListener("click", goBack);
  renderIntroChips();

  const shared = parseHash();
  if (shared) {
    renderResult(shared);
    show("result");
  }
})();
