(function () {
  const data = window.ARES_SPONSORS || { official: [], productSupport: [] };

  function renderLink(link) {
    const btnClass = link.primary ? "btn btn-primary" : "btn btn-ghost";
    return `<a href="${link.href}" class="${btnClass}" target="_blank" rel="noopener noreferrer"><span>${link.label}</span><small>${link.labelJa}</small></a>`;
  }

  function renderBrandCard(sponsor) {
    const logoClasses = ["brand-card-logo"];
    if (sponsor.logoLight) logoClasses.push("brand-card-logo--light");
    if (sponsor.logoEmblem) logoClasses.push("brand-card-logo--emblem");
    const actions = (sponsor.links || []).map(renderLink).join("");

    return `
      <article class="brand-card" id="sponsor-${sponsor.id}">
        <div class="${logoClasses.join(" ")}">
          <img src="${sponsor.logo}" alt="${sponsor.logoAlt || sponsor.name}" />
        </div>
        <div class="brand-card-info">
          <h3>${sponsor.name}</h3>
          <p>${sponsor.description}</p>
          <div class="brand-card-actions">${actions}</div>
        </div>
      </article>
    `;
  }

  function renderGrid(container, sponsors) {
    if (!container || !sponsors.length) return;
    container.innerHTML = sponsors.map(renderBrandCard).join("");
  }

  document.querySelectorAll("[data-sponsors]").forEach((container) => {
    const category = container.dataset.sponsors;
    const sponsors = data[category] || [];
    renderGrid(container, sponsors);
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
