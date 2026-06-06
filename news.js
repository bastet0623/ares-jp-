(function () {
  const INITIAL_VISIBLE = 3;

  /** @type {Array<{date: string, href: string, image: string, images?: string[], imageAlt: string, title: string, titleJa: string, description: string, banner?: boolean, featured?: boolean}>} */
  const newsItems = [
    {
      date: "2026-06-05",
      href: "https://x.com/FLD_apparel_JP/status/2062576981464719565",
      image: "news-fld-denim-cap.png",
      images: ["news-fld-denim-cap.png", "news-fld-denim-cap-detail.png"],
      imageAlt: "FLD 新作ダメージデニムキャップ",
      title: "FLD New Cap",
      titleJa: "FLD新作ダメージデニムキャップ",
      description:
        "ARES OKAYAMAアパレルブランドFLDより、ダメージデニムキャップの新作を発売。フロントロゴとバックルディテールを公開しました。",
    },
    {
      date: "2026-06-04",
      href: "https://x.com/C4rq_vl/status/2062534944765984994",
      image: "news-shiyon-wallhack.png",
      imageAlt: "副代表兼ストリーマー しーよん × WALLHACK アフィリエイト提携",
      title: "WALLHACK Affiliate",
      titleJa: "副代表兼ストリーマー「しーよん」× WALLHACK アフィリエイト提携",
      description: "副代表兼ストリーマーのしーよんが、WALLHACK様とアフィリエイト提携しました。",
      banner: true,
    },
    {
      date: "2026-05-02",
      href: "https://x.com/aresokayama/status/2050500549385109969",
      image: "news-member-recruitment.png",
      imageAlt: "ARES OKAYAMA 再始動メンバー募集",
      title: "Member Recruitment",
      titleJa: "再始動メンバー募集",
      description:
        "ARES OKAYAMAの再始動に伴い、Fortnite部門・STAFF部門（運営・デザイナー）のメンバー募集を開始しました。",
    },
    {
      date: "2026-05-17",
      href: "https://x.com/aresokayama/status/2056329615959052470?s=20",
      image: "news-rakushii-birthday.png",
      imageAlt: "ARES OKAYAMA streamer rakushii birthday visual",
      title: "Happy Birthday",
      titleJa: "ストリーマー「らくしぃ」誕生日",
      description: "ARES OKAYAMA所属ストリーマー、らくしぃのバースデービジュアルを公開。",
    },
    {
      date: "2026-04-29",
      href: "https://x.com/aresokayama/status/2049776121567469766?s=20",
      image: "news-coming-soon.png",
      imageAlt: "ARES OKAYAMA coming soon announcement",
      title: "Coming Soon",
      titleJa: "カミングスーン",
      description: "ARES OKAYAMA始動を予告するティザーを公開。",
      featured: true,
    },
  ];

  function sortedItems() {
    return [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
  }

  function formatDate(isoDate) {
    return isoDate.replace(/-/g, ".");
  }

  function renderImages(item) {
    const sources = item.images && item.images.length > 1 ? item.images : [item.image];
    if (sources.length === 1) {
      return `<img src="${sources[0]}" alt="${item.imageAlt}" />`;
    }
    return `
      <div class="news-card-gallery">
        ${sources
          .map(
            (src, index) =>
              `<img src="${src}" alt="${item.imageAlt}${index === 0 ? "" : "（ディテール）"}" />`
          )
          .join("")}
      </div>
    `;
  }

  function renderCard(item) {
    const classes = ["news-card"];
    if (item.banner) classes.push("news-card--banner");
    if (item.featured) classes.push("news-card--featured");
    if (item.images && item.images.length > 1) classes.push("news-card--gallery");

    return `
      <article class="${classes.join(" ")}">
        <a href="${item.href}" target="_blank" rel="noopener noreferrer">
          ${renderImages(item)}
          <div class="news-card-body">
            <time datetime="${item.date}">${formatDate(item.date)}</time>
            <h3>${item.title}<small>${item.titleJa}</small></h3>
            <p>${item.description}</p>
          </div>
        </a>
      </article>
    `;
  }

  function renderNewsGrid(grid, limit) {
    const items = typeof limit === "number" ? sortedItems().slice(0, limit) : sortedItems();
    grid.innerHTML = items.map(renderCard).join("");
    window.dispatchEvent(new CustomEvent("ares:news-updated"));
  }

  const grid = document.getElementById("newsGrid");
  const actions = document.getElementById("newsActions");
  const loadMoreLink = document.getElementById("newsLoadMore");
  const pageGrid = document.getElementById("newsPageGrid");

  if (pageGrid) {
    renderNewsGrid(pageGrid);
    return;
  }

  if (!grid) return;

  renderNewsGrid(grid, INITIAL_VISIBLE);

  if (!actions || !loadMoreLink) return;

  const hiddenCount = newsItems.length - INITIAL_VISIBLE;
  if (hiddenCount <= 0) {
    actions.hidden = true;
    return;
  }

  actions.hidden = false;
  loadMoreLink.querySelector("span").textContent = "View All News";
  loadMoreLink.querySelector("small").textContent = `すべて見る（全${newsItems.length}件）`;
})();
