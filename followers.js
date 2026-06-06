(function () {
  const SCREEN_NAME = "aresokayama";
  const API_URL = `https://api.vxtwitter.com/${SCREEN_NAME}`;
  const POLL_MS = 15000;
  const el = document.getElementById("followerCount");
  if (!el) return;

  let currentCount = null;
  let hasAnimated = false;
  let rafId = null;
  let inFlight = false;

  function formatCount(value) {
    return value.toLocaleString("ja-JP");
  }

  function animateCount(from, to, duration = 1200) {
    if (rafId) cancelAnimationFrame(rafId);
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(from + (to - from) * eased);
      el.textContent = formatCount(value);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    rafId = requestAnimationFrame(tick);
  }

  function isInViewport() {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
  }

  function playIntroAnimation() {
    if (hasAnimated || currentCount === null || !isInViewport()) return;
    animateCount(0, currentCount);
    hasAnimated = true;
  }

  async function fetchFollowers() {
    const response = await fetch(API_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Follower fetch failed: ${response.status}`);
    const data = await response.json();
    const count = data.followers_count ?? data.user?.followers;
    if (typeof count !== "number") throw new Error("Follower count unavailable");
    return count;
  }

  async function refresh(animate = false) {
    if (inFlight) return;
    inFlight = true;
    try {
      const count = await fetchFollowers();
      const prev = currentCount;
      currentCount = count;
      el.removeAttribute("data-loading");

      if (animate && !hasAnimated) {
        animateCount(0, count);
        hasAnimated = true;
      } else if (animate && prev !== null && prev !== count) {
        animateCount(prev, count, 800);
      } else {
        el.textContent = formatCount(count);
      }
    } catch (error) {
      console.warn("Failed to update follower count:", error);
      if (currentCount === null) {
        el.textContent = "--";
      }
    } finally {
      inFlight = false;
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        playIntroAnimation();
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(el);
  refresh(false).then(playIntroAnimation);
  window.setInterval(() => refresh(true), POLL_MS);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refresh(true);
    }
  });
})();
