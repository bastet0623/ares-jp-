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
          icon: "H",
          image: "operations-heido.png",
          name: "へいど",
          role: "Operations",
          bio: "元々Fortniteの選手で活動していましたが現在は、裏で選手を支える運営として活動しております。色んな事に挑戦したいです。よろしくお願いします。",
          x: "https://x.com/heid_1202",
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

  function renderMemberCard(member) {
    const isProfileLink = Boolean(member.x);
    const tag = isProfileLink ? "a" : "article";
    const idAttr = member.id ? ` id="${member.id}"` : "";
    const attrs = isProfileLink
      ? `class="member-profile-card member-profile-card--link" href="${member.x}" target="_blank" rel="noopener noreferrer" aria-label="${member.name}のXプロフィールを開く"`
      : `class="member-profile-card"${idAttr}`;

    const actionMarkup = isProfileLink
      ? '<span class="member-profile-x">View on X<small>Xで見る</small></span>'
      : member.tweet
        ? `<a class="member-profile-x" href="${member.tweet}" target="_blank" rel="noopener noreferrer">View Tweet<small>告知ツイートを見る</small></a>`
        : "";

    return `
      <${tag} ${attrs}>
        ${renderMemberIcon(member)}
        <div class="member-profile-body">
          <span class="member-profile-role">${member.role}</span>
          <h3>${member.name}</h3>
          <p>${member.bio}</p>
          ${actionMarkup}
        </div>
      </${tag}>
    `;
  }

  const grid = document.getElementById("memberProfileGrid");
  grid.innerHTML = division.members.map(renderMemberCard).join("");
})();
