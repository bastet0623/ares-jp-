(function () {
  const divisions = {
    representative: {
      label: "Representative",
      title: "REPRESENTATIVE",
      subtitle: "代表",
      desc: "ARES OKAYAMAの方針と活動全体を統括するチーム代表です。",
      members: [
        {
          icon: "代",
          image: "representative-icon.png",
          name: "ばすてとぉ / bastet",
          role: "Representative",
          bio: "ARES OKAYAMA代表のばすてとぉです。岡山を拠点に、eスポーツチーム「ARES OKAYAMA」の運営や、デザイン・Web制作などの活動を行っています。チーム運営では、選手・ストリーマー・クリエイターがそれぞれの個性を活かしながら成長できる環境づくりを大切にしています。また、サムネイル・ポスター・名刺・ホームページ制作など、見た人に印象が残るデザイン制作にも取り組んでいます。「岡山から世界へ」をテーマに、地方からでも挑戦できることを証明できるよう、日々活動しています。",
          x: "https://x.com/Bastet_designer",
        },
      ],
    },
    "vice-representative": {
      label: "Vice Representative",
      title: "VICE REPRESENTATIVE",
      subtitle: "副代表",
      desc: "代表を支え、各部門の連携とチーム運営をサポートする副代表です。",
      members: [
        {
          icon: "し",
          image: "vice-representative-shion.png",
          name: "しーよん",
          role: "Vice Representative",
          bio: "ARES OKAYAMA副代表。代表を支え、各部門の連携とチーム運営をサポートします。",
          x: "https://x.com/C4rq_vl",
        },
      ],
    },
    fortnite: {
      label: "Fortnite",
      title: "FORTNITE",
      subtitle: "フォートナイト部門",
      desc: "競技シーン、スクリム、コミュニティ大会に挑むARES OKAYAMAの中心部門です。",
      members: [
        { icon: "F", name: "Coming Soon", role: "Competitive", bio: "フォートナイト競技メンバーは近日公開予定です。" },
        { icon: "Z", name: "Coming Soon", role: "Zero Build", bio: "Zero Buildで活躍するメンバーを準備中です。" },
      ],
    },
    players: {
      label: "Players",
      title: "PLAYERS",
      subtitle: "選手",
      desc: "大会出場と日々の練習で上位を目指す競技ロスターです。",
      members: [
        { icon: "P", name: "Coming Soon", role: "Player", bio: "競技選手プロフィールは近日公開予定です。" },
        { icon: "A", name: "Recruiting", role: "Academy Player", bio: "次世代の選手を募集・育成しています。" },
      ],
    },
    creators: {
      label: "Creators",
      title: "CREATORS",
      subtitle: "クリエイター",
      desc: "デザイン、動画編集、クリップ制作でチームの世界観を発信する部門です。",
      members: [
        {
          icon: "M",
          image: "creator-mili.png",
          name: "MILI",
          role: "Creator",
          bio: "ARES OKAYAMAでデザイナーとして所属しています。ヘッダー ポスター サムネイル デザイン全般を高クオリティで作成します！是非依頼してみてください！よろしくお願いします！",
          x: "https://x.com/Mili_FN_",
        },
        {
          icon: "R",
          image: "creator-riruto.png",
          name: "りると",
          role: "Creator",
          bio: "ARES OKAYAMA所属クリエイター。動画編集やクリエイティブ制作を担当します。",
          x: "https://x.com/ri1ltri1lt",
        },
      ],
    },
    streamers: {
      label: "Streamers",
      title: "STREAMERS",
      subtitle: "ストリーマー",
      desc: "日々の配信や企画で、チームとファンをつなぐ配信部門です。",
      members: [
        {
          icon: "R",
          image: "streamer-rakushii.png",
          name: "Rax1e | らくしぃ",
          role: "Streamer",
          bio: "元々ApexLegendsの競技選手をやっていましたが、一旦身を引いて現在はエイム理論や戦術、戦略を勉強しながらSNSで発信を行っています。第一印象はよく「お堅そう」と言われますが、面白い一面も持っていたりします。よろしくお願いします！",
          x: "https://x.com/rax1ez",
        },
        {
          icon: "う",
          image: "streamer-urasuke.png",
          name: "うらすけ",
          role: "Streamer",
          bio: "ARES OKAYAMA所属ストリーマー。ゲーム実況やコミュニティ配信でチームを盛り上げます。",
        },
        {
          icon: "白",
          image: "streamer-shirashimo.png",
          name: "白霜 優萊",
          role: "Streamer",
          x: "https://x.com/EtNty_SeRapH",
          youtube: "https://www.youtube.com/channel/UCuor7SEbUMR31G6FRIq3j1w/join",
          bio:
            "FPSゲームを中心に活動しているストリーマーです。<br><br>主にApex Legendsの参加型配信やFPS関連コンテンツを配信しており、視聴者の皆様と一緒に楽しめる配信を心掛けています。<br><br>過去にはAVA（Alliance of Valiant Arms）公式大会「ODL 爆破リーグ王座決定戦 ビギナーリーグ」にて優勝経験があります。<br><br>現在はゲーム配信だけでなく、雑談配信や回胴式遊技機を使用した配信など幅広く活動中です。<br><br>ARES OKAYAMAの一員として、チームの魅力を発信しながら多くの方に楽しんでいただけるコンテンツ作りに取り組んでまいります。",
        },
        {
          icon: "i",
          image: "streamer-iba.png",
          name: "iba",
          role: "Streamer",
          bio:
            "普段はFPSゲーム（Apex Legends）を中心に配信活動をしています。<br><br>生まれたてで目立った実績はまだありませんが、視聴者のみなさんと一緒に、とにかく楽しく交流しながら配信をお届けすることを一番大切にしています！<br><br>今後はFPSに限らず、様々なジャンルのゲームや企画を通して、ARES OKAYAMAの魅力をたくさんの方に伝えられるように全力で頑張ります！！<br><br>これから一歩ずつ成長していきますので、ぜひ温かく見守っていただけると嬉しいです。応援よろしくお願いします！",
          x: "https://x.com/Lynfield15",
          twitch: "https://t.co/kM4FqOVTyn",
        },
      ],
    },
    events: {
      label: "Events",
      title: "EVENTS",
      subtitle: "イベント",
      desc: "ARES OKAYAMAではコミュニティ向けのイベントを開催しています。",
      members: [],
    },
    academy: {
      label: "Academy",
      title: "FORTNITE ACADEMY",
      subtitle: "育成チーム",
      desc: "若手選手の練習環境と競技理解を支援する育成部門です。",
      members: [
        { icon: "A", name: "Coming Soon", role: "Academy", bio: "育成メンバーのプロフィールは近日公開予定です。" },
        { icon: "C", name: "Coming Soon", role: "Coach", bio: "育成を支えるコーチ・サポート体制を準備中です。" },
      ],
    },
    partners: {
      label: "Partners",
      title: "PARTNERS",
      subtitle: "パートナー",
      desc: "企業・学校・自治体との連携を進めるパートナー部門です。",
      members: [
        { icon: "P", name: "Coming Soon", role: "Partner Relations", bio: "スポンサー、協賛、地域連携の窓口を担当します。" },
        { icon: "L", name: "Coming Soon", role: "Local Support", bio: "岡山の地域活動とチームをつなぐサポートを行います。" },
      ],
    },
    operations: {
      label: "Operations",
      title: "OPERATIONS",
      subtitle: "運営",
      desc: "大会対応、企画進行、選手・配信者の活動を支える運営部門です。",
      members: [
        {
          icon: "L",
          image: "operations-l1nxs.png",
          name: "L1NXs",
          role: "Operations",
          bio: "ARES OKAYAMA運営メンバー。大会対応、企画進行、選手・配信者の活動をサポートします。",
          x: "https://x.com/L1NXs4ce",
        },
      ],
    },
  };

  const params = new URLSearchParams(window.location.search);
  const key = params.get("division") || "fortnite";

  if (key === "events") {
    window.location.replace(`events.html${window.location.hash}`);
    return;
  }

  const division = divisions[key] || divisions.fortnite;

  document.title = `${division.title} | ARES OKAYAMA`;
  document.getElementById("divisionLabel").innerHTML = `${division.label}<small>${division.subtitle}</small>`;
  document.getElementById("divisionTitle").textContent = division.title;
  document.getElementById("divisionDesc").textContent = division.desc;
  document.getElementById("memberSectionTitle").innerHTML = `${division.title}<small>${division.subtitle} メンバー</small>`;

  function renderMemberIcon(member) {
    if (member.image) {
      return `<div class="member-profile-icon member-profile-icon--image"><img src="${member.image}" alt="${member.name}" /></div>`;
    }
    return `<div class="member-profile-icon">${member.icon}</div>`;
  }

  function renderMemberActions(member) {
    const links = [
      member.x
        ? `<a class="member-profile-x" href="${member.x}" target="_blank" rel="noopener noreferrer">View on X<small>Xで見る</small></a>`
        : "",
      member.twitch
        ? `<a class="member-profile-x member-profile-x--twitch" href="${member.twitch}" target="_blank" rel="noopener noreferrer">Twitch<small>Twitchで見る</small></a>`
        : "",
      member.youtube
        ? `<a class="member-profile-x member-profile-x--youtube" href="${member.youtube}" target="_blank" rel="noopener noreferrer">YouTube<small>YouTubeで見る</small></a>`
        : "",
      member.tweet
        ? `<a class="member-profile-x" href="${member.tweet}" target="_blank" rel="noopener noreferrer">View Tweet<small>告知ツイートを見る</small></a>`
        : "",
    ].filter(Boolean);

    if (!links.length) return "";
    return `<div class="member-profile-actions">${links.join("")}</div>`;
  }

  function renderMemberCard(member) {
    const idAttr = member.id ? ` id="${member.id}"` : "";
    const actionMarkup = renderMemberActions(member);

    return `
      <article class="member-profile-card member-profile-card--featured"${idAttr}>
        ${renderMemberIcon(member)}
        <div class="member-profile-body">
          <span class="member-profile-role">${member.role}</span>
          <h3>${member.name}</h3>
          <div class="member-profile-bio">${member.bio}</div>
          ${actionMarkup}
        </div>
      </article>
    `;
  }

  const members = division.members;
  const showcase = document.getElementById("memberProfileShowcase");
  const nav = document.getElementById("memberProfileNav");
  const stage = document.getElementById("memberProfileStage");
  const counter = document.getElementById("memberProfileCounter");
  const prevBtn = document.getElementById("memberProfilePrev");
  const nextBtn = document.getElementById("memberProfileNext");

  if (!members.length) {
    showcase.innerHTML = '<p class="member-profile-empty">メンバー情報は近日公開予定です。</p>';
    return;
  }

  let activeIndex = 0;
  const memberParam = params.get("member");
  if (memberParam) {
    const memberIndex = members.findIndex((member) => member.id === memberParam || member.name === memberParam);
    if (memberIndex >= 0) activeIndex = memberIndex;
  }

  function updateShowcase() {
    const member = members[activeIndex];
    stage.innerHTML = renderMemberCard(member);

    nav.querySelectorAll(".member-profile-tab").forEach((tab, index) => {
      const isActive = index === activeIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.tabIndex = isActive ? 0 : -1;
    });

    if (members.length > 1) {
      counter.textContent = `${activeIndex + 1} / ${members.length}`;
      counter.removeAttribute("aria-hidden");
      prevBtn.disabled = activeIndex === 0;
      nextBtn.disabled = activeIndex === members.length - 1;
    }
  }

  if (members.length === 1) {
    showcase.classList.add("member-profile-showcase--single");
    nav.hidden = true;
    prevBtn.hidden = true;
    nextBtn.hidden = true;
    counter.hidden = true;
    stage.innerHTML = renderMemberCard(members[0]);
    return;
  }

  nav.innerHTML = members
    .map(
      (member, index) => `
        <button
          type="button"
          class="member-profile-tab${index === activeIndex ? " is-active" : ""}"
          role="tab"
          aria-selected="${index === activeIndex ? "true" : "false"}"
          aria-controls="memberProfileStage"
          data-index="${index}"
          tabindex="${index === activeIndex ? "0" : "-1"}"
        >${member.name}</button>
      `
    )
    .join("");

  nav.addEventListener("click", (event) => {
    const tab = event.target.closest(".member-profile-tab");
    if (!tab) return;
    activeIndex = Number(tab.dataset.index);
    updateShowcase();
  });

  nav.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "ArrowLeft") activeIndex = Math.max(0, activeIndex - 1);
    if (event.key === "ArrowRight") activeIndex = Math.min(members.length - 1, activeIndex + 1);
    if (event.key === "Home") activeIndex = 0;
    if (event.key === "End") activeIndex = members.length - 1;
    updateShowcase();
    nav.querySelectorAll(".member-profile-tab")[activeIndex]?.focus();
  });

  prevBtn.addEventListener("click", () => {
    if (activeIndex > 0) {
      activeIndex -= 1;
      updateShowcase();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (activeIndex < members.length - 1) {
      activeIndex += 1;
      updateShowcase();
    }
  });

  updateShowcase();
})();
