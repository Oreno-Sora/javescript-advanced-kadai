// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedField = document.getElementById('untyped');
const typedField = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

// タイマー値の初期値を取得する
let time = count.textContent;

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

// 時間切れメッセージ
const timeupMessage = 'タイムアップ！';

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
const keyPress = e => {
  // 時間切れのときは即リターン
  if (time <= 0) {
    return;
  }

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
   const id = setInterval(() => {
    // タイマーカウントダウン(1000ms毎)
    time--;
    count.textContent = time;

    // 時間切れのとき
    if (time <= 0) {
      // タイムアップメッセージ出力
      typedField.textContent = '';
      untypedField.textContent = timeupMessage;
        
      // 時間差（100ms）で結果表示
      setTimeout(() => {
        gameOver(id);
      }, 100);
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

untypedField.textContent = 'スタートボタンで開始'
