(function () {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const cursorTube = document.getElementById("cursorTube");

  // Page is visible immediately; no opening loader is used.
  function markLoaded() {
    document.body.classList.add("loaded");
  }

  if (document.readyState === "complete") {
    markLoaded();
  } else {
    window.addEventListener("load", markLoaded);
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

  // Card spotlight follows the cursor.
  document.querySelectorAll(".player-card, .match-card, .contact-form").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
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
    const points = nodes.map(() => ({ x: -100, y: -100 }));
    const pointer = { x: -100, y: -100 };

    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      document.body.classList.add("cursor-active");
    });

    window.addEventListener("pointerleave", () => {
      document.body.classList.remove("cursor-active");
    });

    function renderCursorTube() {
      points.forEach((point, index) => {
        const target = index === 0 ? pointer : points[index - 1];
        const ease = 0.34 - index * 0.035;
        point.x += (target.x - point.x) * ease;
        point.y += (target.y - point.y) * ease;
        nodes[index].style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
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
})();
