(function () {
  const SCREEN_NAME = "aresokayama";
  const API_URL = `https://api.vxtwitter.com/${SCREEN_NAME}`;
  const POLL_MS = 30000;
  const el = document.getElementById("followerCount");
  if (!el) return;

  let currentCount = null;
  let hasAnimated = false;
  let rafId = null;

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

  function setDisplay(count, animate) {
    if (!animate) {
      el.textContent = formatCount(count);
      return;
    }

    if (!hasAnimated) {
      animateCount(0, count);
      hasAnimated = true;
      return;
    }

    if (currentCount !== count) {
      animateCount(currentCount, count, 800);
    }
  }

  async function fetchFollowers() {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`Follower fetch failed: ${response.status}`);
    const data = await response.json();
    const count = data.followers_count ?? data.user?.followers;
    if (typeof count !== "number") throw new Error("Follower count unavailable");
    return count;
  }

  async function updateFollowers(animate) {
    try {
      const count = await fetchFollowers();
      setDisplay(count, animate);
      currentCount = count;
      el.removeAttribute("data-loading");
    } catch (error) {
      console.warn("Failed to update follower count:", error);
      if (currentCount === null) {
        el.textContent = "--";
      }
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        updateFollowers(true);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(el);
  setInterval(() => updateFollowers(true), POLL_MS);
})();
