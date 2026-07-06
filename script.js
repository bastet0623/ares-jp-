(function () {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const cursorTube = document.getElementById("cursorTube");
  const introVideo = document.getElementById("introVideo");
  const introVideoPlayer = document.getElementById("introVideoPlayer");
  const introVideoSkip = document.getElementById("introVideoSkip");
  let pageMarkedLoaded = false;

  function markLoaded() {
    if (pageMarkedLoaded) return;
    pageMarkedLoaded = true;
    document.body.classList.add("loaded");
  }

  function finishIntroVideo() {
    if (!introVideo) {
      markLoaded();
      return;
    }

    introVideo.classList.add("intro-video--done");
    introVideo.setAttribute("aria-hidden", "true");
    document.body.classList.remove("intro-active");

    if (introVideoPlayer) {
      introVideoPlayer.pause();
    }

    markLoaded();

    window.setTimeout(() => {
      introVideo.remove();
    }, 700);
  }

  function initIntroVideo() {
    if (!introVideo || !introVideoPlayer) {
      markLoaded();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishIntroVideo();
      return;
    }

    document.body.classList.add("intro-active");
    introVideoSkip?.addEventListener("click", finishIntroVideo);
    introVideoPlayer.addEventListener("ended", finishIntroVideo);
    introVideoPlayer.addEventListener("error", finishIntroVideo);

    const introFallbackTimer = window.setTimeout(() => {
      if (introVideoPlayer.readyState < 2) {
        finishIntroVideo();
      }
    }, 4000);

    const clearIntroFallbackTimer = () => {
      window.clearTimeout(introFallbackTimer);
    };

    introVideoPlayer.addEventListener("playing", clearIntroFallbackTimer, { once: true });
    introVideoPlayer.addEventListener("error", clearIntroFallbackTimer);

    const playPromise = introVideoPlayer.play();
    if (playPromise) {
      playPromise.catch(() => {
        introVideoPlayer.muted = true;
        introVideoPlayer.play().catch(finishIntroVideo);
      });
    }
  }

  if (document.readyState === "complete") {
    initIntroVideo();
  } else {
    window.addEventListener("load", initIntroVideo);
  }

  // Header scroll state
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Stat counter animation
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-value[data-count]").forEach((el) => {
    statObserver.observe(el);
  });

  // Scroll reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  function bindRevealElements(elements, startIndex = 0) {
    elements.forEach((el, i) => {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min((startIndex + i) % 6, 5) * 0.05}s`;
      revealObserver.observe(el);
    });
  }

  bindRevealElements(
    document.querySelectorAll(
      ".section-header, .player-card, .member-profile-card, .news-card, .match-card, .about-text, .about-card, .about-mvv-card, .character-text, .apparel-text, .apparel-card, .contact-text, .contact-form"
    )
  );

  window.addEventListener("ares:news-updated", () => {
    const cards = document.querySelectorAll("#newsGrid .news-card");
    cards.forEach((card) => {
      revealObserver.unobserve(card);
      card.classList.remove("reveal", "visible");
    });
    bindRevealElements(cards);
  });

  window.addEventListener("ares:events-updated", () => {
    const cards = document.querySelectorAll("#eventHomeGrid .member-profile-card");
    cards.forEach((card) => {
      revealObserver.unobserve(card);
      card.classList.remove("reveal", "visible");
    });
    bindRevealElements(cards);
  });

  function updateCardGlow(card, event) {
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const localX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const localY = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    card.style.setProperty("--mouse-x", `${localX}%`);
    card.style.setProperty("--mouse-y", `${localY}%`);
  }

  // Card spotlight follows the cursor.
  document.querySelectorAll(".player-card, .match-card, .contact-form").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      updateCardGlow(card, event);
    });
  });

  // Division cards navigate to each member profile page.
  document.querySelectorAll(".division-card").forEach((card) => {
    function openDivisionPage() {
      const division = card.dataset.division;
      if (!division) return;
      window.location.href = `division.html?division=${encodeURIComponent(division)}`;
    }

    card.addEventListener("click", openDivisionPage);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openDivisionPage();
    });
  });

  // Cursor tube effect
  if (cursorTube && !window.matchMedia("(pointer: coarse)").matches) {
    const nodes = Array.from(cursorTube.querySelectorAll("span"));
    const sizes = nodes.map((node) => parseFloat(getComputedStyle(node).width) || 22);
    const points = nodes.map(() => ({ x: -100, y: -100 }));
    const pointer = { x: -100, y: -100 };

    function syncCursorLayer() {
      const vv = window.visualViewport;
      if (!vv) {
        cursorTube.style.inset = "0";
        cursorTube.style.width = "";
        cursorTube.style.height = "";
        cursorTube.style.transform = "";
        return;
      }

      cursorTube.style.inset = "auto";
      cursorTube.style.left = `${vv.offsetLeft}px`;
      cursorTube.style.top = `${vv.offsetTop}px`;
      cursorTube.style.width = `${vv.width}px`;
      cursorTube.style.height = `${vv.height}px`;
      cursorTube.style.transform = "";
    }

    function setCursorCoords(event) {
      const vv = window.visualViewport;
      const offsetLeft = vv?.offsetLeft ?? 0;
      const offsetTop = vv?.offsetTop ?? 0;
      pointer.x = event.clientX - offsetLeft;
      pointer.y = event.clientY - offsetTop;
    }

    function onPointerMove(event) {
      syncCursorLayer();
      setCursorCoords(event);
      document.body.classList.add("cursor-active");
    }

    function onPointerLeave(event) {
      if (event.relatedTarget) return;
      document.body.classList.remove("cursor-active");
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", syncCursorLayer);
      window.visualViewport.addEventListener("scroll", syncCursorLayer);
    }

    window.addEventListener("resize", syncCursorLayer);
    syncCursorLayer();

    function renderCursorTube() {
      points.forEach((point, index) => {
        const target = index === 0 ? pointer : points[index - 1];
        const ease = 0.34 - index * 0.035;
        point.x += (target.x - point.x) * ease;
        point.y += (target.y - point.y) * ease;
        const radius = sizes[index] / 2;
        nodes[index].style.left = `${point.x - radius}px`;
        nodes[index].style.top = `${point.y - radius}px`;
      });
      requestAnimationFrame(renderCursorTube);
    }

    renderCursorTube();
  }

  const contactForm = document.getElementById("contactForm");
  const contactFormNext = document.getElementById("contactFormNext");
  const contactSuccessScreen = document.getElementById("contactSuccessScreen");
  const contactSuccessHome = document.getElementById("contactSuccessHome");
  const useNativeContactSubmit = window.matchMedia("(pointer: coarse)").matches;
  let contactSuccessTimer = null;

  function getContactSuccessUrl() {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("contact", "success");
    return url.toString();
  }

  function resetContactForm() {
    if (!contactForm) return;
    const submitBtn = contactForm.querySelector('[type="submit"]');
    contactForm.reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "送信する";
    }
  }

  function hideContactSuccessScreen(goHome = true) {
    if (!contactSuccessScreen) return;
    if (contactSuccessTimer) {
      window.clearTimeout(contactSuccessTimer);
      contactSuccessTimer = null;
    }
    contactSuccessScreen.classList.remove("is-visible");
    document.body.classList.remove("contact-success-open");
    window.setTimeout(() => {
      contactSuccessScreen.hidden = true;
      resetContactForm();
      if (goHome) {
        history.replaceState(null, "", `${window.location.pathname}#hero`);
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 320);
  }

  function showContactSuccessScreen(autoReturn = true) {
    if (!contactSuccessScreen) return;
    contactSuccessScreen.hidden = false;
    document.body.classList.add("contact-success-open");
    window.requestAnimationFrame(() => {
      contactSuccessScreen.classList.add("is-visible");
    });
    if (autoReturn) {
      contactSuccessTimer = window.setTimeout(() => {
        hideContactSuccessScreen(true);
      }, 3000);
    }
  }

  async function submitContactAjax() {
    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "送信中...";

    try {
      const response = await fetch("https://formsubmit.co/ajax/ares.sportsteam@gmail.com", {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Contact form submit failed");
      showContactSuccessScreen(true);
    } catch (error) {
      console.warn(error);
      showToast("送信に失敗しました。時間をおいて再度お試しください。");
      submitBtn.disabled = false;
      submitBtn.textContent = "送信する";
    }
  }

  if (contactFormNext) {
    contactFormNext.value = getContactSuccessUrl();
  }

  if (new URLSearchParams(window.location.search).get("contact") === "success") {
    history.replaceState(null, "", `${window.location.pathname}#hero`);
    showContactSuccessScreen(true);
  }

  if (contactForm && contactSuccessScreen) {
    contactForm.addEventListener("submit", (event) => {
      if (useNativeContactSubmit) {
        const submitBtn = contactForm.querySelector('[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = "送信中...";
        return;
      }

      event.preventDefault();
      void submitContactAjax();
    });
  }

  if (contactSuccessHome) {
    contactSuccessHome.addEventListener("click", (event) => {
      event.preventDefault();
      hideContactSuccessScreen(true);
    });
  }

  function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }

  let tickerLogoTemplate = null;
  let tickerResizeTimer = null;

  function waitForImages(root) {
    const images = root.querySelectorAll("img");
    return Promise.all(
      [...images].map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve();
              return;
            }
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          })
      )
    );
  }

  function applyTickerShift() {
    const track = document.getElementById("tickerTrack");
    if (!track?.firstElementChild) return;

    const shift = track.firstElementChild.getBoundingClientRect().width;
    track.style.setProperty("--ticker-shift", `${shift}px`);
    track.style.animation = "none";
    void track.offsetWidth;
    track.style.animation = "";
  }

  async function fillTickerTrack() {
    const track = document.getElementById("tickerTrack");
    const seed = document.getElementById("tickerSeed");
    if (!track) return;

    if (!tickerLogoTemplate && seed) {
      tickerLogoTemplate = [...seed.querySelectorAll("img")].map((logo) => ({
        src: logo.getAttribute("src"),
        alt: logo.getAttribute("alt") || "",
        className: logo.className,
      }));
    }

    if (!tickerLogoTemplate?.length) return;

    function createLogoNode({ src, alt, className }) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      if (className) img.className = className;
      return img;
    }

    function createHalf() {
      const probe = document.createElement("div");
      probe.className = "ticker-set";
      probe.style.cssText =
        "position:fixed;left:-9999px;top:0;visibility:hidden;pointer-events:none";
      document.body.appendChild(probe);

      const minWidth = window.innerWidth + 120;
      let cycles = 0;
      do {
        tickerLogoTemplate.forEach((logo) => probe.appendChild(createLogoNode(logo)));
        cycles += 1;
      } while (probe.scrollWidth < minWidth || cycles < 2);

      const half = document.createElement("div");
      half.className = "ticker-set";
      half.innerHTML = probe.innerHTML;
      probe.remove();
      return half;
    }

    track.style.animation = "none";

    const first = createHalf();
    const second = first.cloneNode(true);
    second.setAttribute("aria-hidden", "true");
    second.querySelectorAll("img").forEach((img) => {
      img.alt = "";
    });

    track.replaceChildren(first, second);
    await waitForImages(track);
    applyTickerShift();
  }

  function scheduleTickerFill() {
    clearTimeout(tickerResizeTimer);
    tickerResizeTimer = setTimeout(() => {
      void fillTickerTrack();
    }, 150);
  }

  async function initTicker() {
    const seed = document.getElementById("tickerSeed");
    if (!seed) return;

    await waitForImages(seed);
    await fillTickerTrack();
    window.requestAnimationFrame(applyTickerShift);
  }

  initTicker();
  window.addEventListener("resize", scheduleTickerFill, { passive: true });
})();
