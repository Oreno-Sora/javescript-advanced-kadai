// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
//let totalCount = 0;     // 現在のタイプ数カウンタ

// 必要なHTML要素の取得
const untypedField = document.getElementById('untyped');
const typedField = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
// 現在の正解タイプ数を表示するHTML要素を取得するように修正
// ☓現在のタイプ数を表示するHTML要素を取得する
// ☓const total = document.getElementById('total');
const correct = document.getElementById('correct');
 
// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScripts','Good Morning',
  'I am Japanese','Let it be','samurai','Typing Game',
  'Information Technology','I want to be a programmer',
  'What day is today?','I want to build a web app',
  'Nice to meet you','Chrome Firefox Edge Safari',
  'machine learning','Brendan Eich','John Resig',
  'React Vue Angular','Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon','ECMAScript',
  'console.log','for while if switch','var let const',
  'Windows Mac Linux iOS Android','programming'
];

//--------------------------
// ランダムなテキストを表示
//--------------------------
const createText = () => {
  // 正タイプした文字列をクリア
  typed = '';
  typedField.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedField.textContent = untyped;
};

//--------------------------
// キー入力の判定
//--------------------------
const keyPress = (e) => {
  // 現在の正解タイプ数を表示するHTML要素を取得するように修正
  // ☓現在のタイプ数をインクリメント
  // ☓totalCount++;
  // ☓total.textContent = totalCount;        // 現在のタイプ数を表示

  // 次の正解のキーを取得
  let nextkey = untyped.substring(0, 1);

  //入力キーと正解のキーを比較する 
  if (e.key !== nextkey) {
    // 誤タイプの場合、背景色を赤にする
    wrap.classList.add('mistyped');
    // ただし、100ms後に背景色をもとに戻る
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合
  // スコアのインクリメント
  score++;
  // ★現在のスコア（正解タイプ数）を表示する
  correct.textContent = score;
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedField.textContent = typed;
  untypedField.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if (untyped === '') {
    createText();
  }
};

//--------------------------
// タイピングスキルのランクを判定
//--------------------------
const rankCheck = (score) => {
  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数text二格納する
  if (score < 100) {
    text = `あなたのランクはCランクです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBランクです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAランクです。\nSランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSランクです。\nおめでとうございます！`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`
};

//--------------------------
// ゲームを終了
//--------------------------
const gameOver = (id) => {
  clearInterval(id);
  const result = confirm(rankCheck(score));

  // OKボタンをクリックされたらリロードする
  if (result == true) {
    window.location.reload();
  }

};

//--------------------------
// カウントダウンタイマー
//--------------------------
const timer = () => {
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {
    // タイマーカウントダウン
    time--;
    count.textContent = time;

    // タイマーカウントが0になったらタイマーを停止する
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
  // カウントダウンタイマーを開始する
  timer();
  // ランダムなテキストを表示する
  createText();
  // スタートボタンを非表示にする
  start.style.display = 'none';

  // キーボードイベント処理
  document.addEventListener('keypress', keyPress);
});

//--------------------------
// ゲームの開始を促す表示
//--------------------------
untypedField.textContent = 'スタートボタンで開始'
