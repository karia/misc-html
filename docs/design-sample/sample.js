const concepts = {
  aurora: ["D", "Midnight Aurora", "夜更けの書架から、次の物語を選ぶ。"],
  prism: ["E", "Digital Prism", "次のセッションが、すぐに見つかる。"],
  pop: ["F", "Neo Pop Table", "遊びたい！から始めよう。"],
  lavender: ["G", "Quiet Lavender", "物語を、静かに探す。"],
  cyber: ["H", "Cyber Terminal", "SCENARIO DATABASE / ONLINE"],
  bento: ["I", "Skyline Bento", "みんなの物語を、見やすくひとつに。"],
  chromatic: ["J", "Chromatic Minimal", "PLAY SOMETHING NEW."],
};

const scenarios = [
  ["星屑の航海記", "夜舟堂", "クトゥルフ神話TRPG", "3–4人", "6–8時間", "#7257ff", "#33d6c5"],
  ["雨の街、午前零時", "薄明舎", "エモクロアTRPG", "2–3人", "4時間", "#225c92", "#e1a6c8"],
  ["花冠は誰がために", "庭園文庫", "ダブルクロス The 3rd Edition", "4人", "5–6時間", "#e97385", "#f7c75d"],
  ["銀河鉄道の終着駅", "彗星書房", "銀剣のステラナイツ", "2人", "3時間", "#272b50", "#7ec8e3"],
  ["透明な夏の輪郭", "水槽標本", "新クトゥルフ神話TRPG", "3人", "4–5時間", "#29a5a8", "#d8f1d5"],
  ["魔女と空白の地図", "灯台守", "ソード・ワールド2.5", "3–5人", "8時間", "#442f66", "#f08b64"],
];

const theme = document.body.dataset.theme;
const [letter, name, lead] = concepts[theme];
const icon = (path, label = "") => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg><span class="sr-only">${label}</span>`;
const searchIcon = icon("m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z");
const heartIcon = icon("M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z", "お気に入り");

function card(s, i) {
  const statuses = [
    ["GM経験あり", "PL未経験", "所持 3人", "提出 前日"],
    ["GM未経験", "PL経験あり", "所持 2人", "提出 3日前"],
    ["GM経験あり", "PL経験あり", "所持 4人", "提出 当日"],
  ][i % 3];
  const tags = [["秘匿HO", "現代"], ["初心者向け", "短編"], ["ボイス推奨", "継続可"]][i % 3];
  return `<article class="scenario-card">
    <div class="cover cover-${i}" style="--c1:${s[5]};--c2:${s[6]}"><span>${String(i + 1).padStart(2,"0")}</span><b>${s[0]}</b></div>
    <div class="card-body">
      <div class="eyebrow">${s[2]}</div>
      <h2>${s[0]}</h2><p class="author">${s[1]}</p>
      <div class="facts"><span>♟ ${s[3]}</span><span>◷ ${s[4]}</span></div>
      <div class="tags" aria-label="特徴">${tags.map(tag => `<span>${tag}</span>`).join("")}</div>
      <dl class="status-grid">
        <div><dt>GM</dt><dd>${statuses[0].replace("GM", "")}</dd></div>
        <div><dt>PL</dt><dd>${statuses[1].replace("PL", "")}</dd></div>
        <div><dt>所持</dt><dd>${statuses[2].replace("所持 ", "")}</dd></div>
        <div><dt>提出</dt><dd>${statuses[3].replace("提出 ", "")}</dd></div>
      </dl>
      <div class="card-actions"><button class="text-button">詳しく見る</button><button class="icon-button" aria-label="お気に入り">${heartIcon}</button></div>
    </div>
  </article>`;
}

document.body.innerHTML = `
  <header class="site-header"><a class="brand" href="./"><i>TRPG</i><b>Catalog</b></a><nav><a href="#list">シナリオ</a><a href="#form">セッション</a><a href="#">メンバー</a></nav><button class="profile">KA</button></header>
  <main>
    <section class="hero"><div><a class="concept-back" href="./">← デザイン一覧</a><p class="concept">CONCEPT ${letter} / ${name}</p><h1>${lead}</h1><p class="intro">人数やプレイ時間、ゲームシステムから、今遊びたいシナリオを探せます。</p></div><div class="hero-orb"><span>d20</span></div></section>
    <section class="search-panel" aria-label="シナリオを探す">
      <label class="search">${searchIcon}<input type="search" placeholder="シナリオ名、作者名で検索"></label>
      <div class="primary-filters" aria-label="人数で絞り込む"><button class="chip active">すべて</button><button class="chip">1–2人</button><button class="chip">3–4人</button><button class="chip">5人以上</button></div>
      <details class="filter-disclosure" id="filters">
        <summary>詳細な絞り込み <b>2</b><span aria-hidden="true">⌄</span></summary>
        <div class="filter-body">
          <fieldset><legend>ゲームシステム</legend><label><input type="checkbox" checked> クトゥルフ神話TRPG</label><label><input type="checkbox"> エモクロアTRPG</label><label><input type="checkbox"> その他</label></fieldset>
          <fieldset><legend>プレイ時間</legend><label><input type="radio" name="duration"> 4時間以内</label><label><input type="radio" name="duration" checked> 4–8時間</label><label><input type="radio" name="duration"> 8時間以上</label></fieldset>
          <fieldset><legend>状態</legend><label><input type="checkbox"> GM経験あり</label><label><input type="checkbox"> PL未経験</label><label><input type="checkbox"> 所持者あり</label></fieldset>
          <div class="filter-actions"><button class="reset">条件をクリア</button><button class="apply">12件を表示</button></div>
        </div>
      </details>
    </section>
    <section class="listing" id="list"><div class="section-head"><div><p class="kicker">SCENARIO LIBRARY</p><h2>シナリオを見つける</h2></div><label>並び順 <select><option>おすすめ順</option><option>新着順</option><option>タイトル順</option></select></label></div><div class="scenario-grid">${scenarios.map(card).join("")}</div></section>
    <section class="form-demo" id="form"><div class="form-copy"><p class="kicker">FORM COMPONENTS</p><h2>セッションを登録</h2><p>入力欄、選択肢、補足、エラー、主要操作の見え方を確認するためのサンプルです。</p></div>
      <form><div class="field wide"><label for="title">シナリオ <em>必須</em></label><p>遊ぶシナリオを選択してください。</p><select id="title"><option>星屑の航海記</option></select></div>
      <div class="field"><label for="date">開催日 <em>必須</em></label><input id="date" type="date" value="2026-09-12"></div>
      <div class="field"><label for="time">開始時刻</label><input id="time" type="time" value="21:00"></div>
      <fieldset class="field wide"><legend>参加方法</legend><label class="choice"><input type="radio" name="mode" checked> オンライン</label><label class="choice"><input type="radio" name="mode"> オフライン</label></fieldset>
      <div class="field wide"><label for="note">メモ <span>任意</span></label><textarea id="note" rows="3" placeholder="参加者への連絡事項など"></textarea><p>ネタバレを含む内容は書かないでください。</p></div>
      <div class="form-actions"><button type="button" class="secondary">キャンセル</button><button type="button" class="primary">セッションを登録</button></div></form>
    </section>
  </main><footer><b>TRPG Catalog</b><span>Design study ${letter}</span></footer>`;

if (location.hash === "#filters") document.querySelector("#filters").open = true;
