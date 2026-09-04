(function () {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "IMG") e.preventDefault();
  });
})();

(function () {
  document.querySelectorAll(".service__top").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".service");
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
})();

(function () {
  const rules = document.querySelectorAll(".cases__title-rule, .about__title-rule, .services__title-rule, .reviews__title-rule");
  if (!rules.length) return;
  if (!("IntersectionObserver" in window)) {
    rules.forEach((r) => r.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  rules.forEach((r) => observer.observe(r));
})();

(function () {
  const viewport = document.querySelector(".cases__viewport");
  const track = document.getElementById("casesTrack");
  const dotsWrap = document.getElementById("casesDots");
  if (!viewport || !track || !dotsWrap) return;

  const cards = Array.from(track.children);

  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Кейс " + (i + 1));
    dot.addEventListener("click", () => {
      cards[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  function setActive(index) {
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }

  function closestIndex() {
    const viewportLeft = viewport.getBoundingClientRect().left;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - viewportLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  }

  let ticking = false;
  viewport.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActive(closestIndex());
      ticking = false;
    });
  });

  setActive(0);
})();
