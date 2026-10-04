const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(element => observer.observe(element));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.counter);
      const duration = prefersReducedMotion ? 0 : 900;
      const start = performance.now();

      function update(now) {
        const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
        entry.target.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  initCounters();
});
