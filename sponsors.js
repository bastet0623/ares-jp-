(function () {
  const data = window.ARES_SPONSORS || {
    official: [],
    supportOrganizations: [],
    productSupport: [],
  };

  function renderLink(link) {
    const btnClass = link.primary ? "btn btn-primary" : "btn btn-ghost";
    return `<a href="${link.href}" class="${btnClass}" target="_blank" rel="noopener noreferrer"><span>${link.label}</span><small>${link.labelJa}</small></a>`;
  }

  function renderBrandCard(sponsor) {
    const logoClasses = ["brand-card-logo"];
    if (sponsor.logoLight) logoClasses.push("brand-card-logo--light");
    if (sponsor.logoEmblem) logoClasses.push("brand-card-logo--emblem");
    if (sponsor.logoText && !sponsor.logo) logoClasses.push("brand-card-logo--text");
    const actions = (sponsor.links || []).map(renderLink).join("");
    const logoMarkup = sponsor.logo
      ? `<img src="${sponsor.logo}" alt="${sponsor.logoAlt || sponsor.name}" />`
      : `<span class="brand-card-logo-text" aria-hidden="true">${sponsor.logoText || sponsor.name.charAt(0)}</span>`;

    return `
      <article class="brand-card" id="sponsor-${sponsor.id}">
        <div class="${logoClasses.join(" ")}">
          ${logoMarkup}
        </div>
        <div class="brand-card-info">
          <h3>${sponsor.name}</h3>
          <p>${sponsor.description}</p>
          <div class="brand-card-actions">${actions}</div>
        </div>
      </article>
    `;
  }

  function renderEmptyState(category) {
    const messages = {
      supportOrganizations: "サポート団体は近日公開予定です。",
      official: "スポンサー情報は近日公開予定です。",
      productSupport: "プロダクトサポート情報は近日公開予定です。",
    };
    return `<p class="brand-empty-note">${messages[category] || "情報は近日公開予定です。"}</p>`;
  }

  function renderGrid(container, sponsors, category) {
    if (!container) return;
    if (!sponsors.length) {
      container.innerHTML = renderEmptyState(category);
      return;
    }
    container.innerHTML = sponsors.map(renderBrandCard).join("");
  }

  document.querySelectorAll("[data-sponsors]").forEach((container) => {
    const category = container.dataset.sponsors;
    const sponsors = data[category] || [];
    renderGrid(container, sponsors, category);
  });

  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (target) {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
