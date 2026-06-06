(function () {
  const events = window.ARES_EVENTS || [];

  function renderEventCard(event) {
    const tweetLink = event.tweet
      ? `<a class="member-profile-x" href="${event.tweet}" target="_blank" rel="noopener noreferrer">View Tweet<small>告知ツイートを見る</small></a>`
      : "";

    return `
      <article class="member-profile-card" id="${event.id}">
        <div class="member-profile-icon">${event.icon}</div>
        <div class="member-profile-body">
          <span class="member-profile-role">${event.role}</span>
          <h3>${event.name}</h3>
          <p>${event.bio}</p>
          ${tweetLink}
        </div>
      </article>
    `;
  }

  const grid = document.getElementById("eventListGrid");
  if (!grid) return;

  grid.innerHTML = events.map(renderEventCard).join("");

  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (target) {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
