const startScreen = document.getElementById("startScreen");
const chatScreen = document.getElementById("chatScreen");
const chatLog = document.getElementById("chatLog");
const answerOptions = document.getElementById("answerOptions");

const script = [
  { from: "H", text: "시즈니이이" },
  { from: "H", text: "잘 잤어요?" },
  {
    options: [
      { text: "웅ㅎㅎ" },
      { text: "웅 너는?" }
    ]
  },
  { from: "H", text: "나도 오랜만에 잘 잤다" },
  { from: "H", text: "드디어" },
  { from: "H", text: "곧 앨범 발매..." },
  { from: "H", text: "너무 기대돼.." },
  {
    options: [
      { text: "나두 너무 떨려" },
      { text: "빨리 듣고 싶다" }
    ]
  },
  { from: "H", text: "난 지금도 듣는중ㅎㅎ" },
  {
    options: [
      { text: "뭐야! 나도 들을래ㅜㅜ" },
      { text: "너만 듣기 있어?" }
    ]
  },
  { from: "H", text: "부럽지 ㅎㅎ" }
];

let step = 0;
let waitingForReply = false;

function showMessage(from, text) {
  const msg = document.createElement("div");
  msg.className = "chatMsg " + (from === "H" ? "fromH" : "fromMe");

  const timeSpan = document.createElement("span");
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  timeSpan.className = "timeStamp";
  timeSpan.textContent = `${h}:${m}`;

  const textDiv = document.createElement("div");
  textDiv.className = "msgText";
  textDiv.textContent = text;

  if (from === "H") {
    const img = document.createElement("img");
    img.src = "profile_h.jpg";
    img.alt = "프로필";

    const contentWrapper = document.createElement("div");
    contentWrapper.style.display = "flex";
    contentWrapper.style.alignItems = "center";

    contentWrapper.appendChild(textDiv);
    contentWrapper.appendChild(timeSpan);

    msg.appendChild(img);
    msg.appendChild(contentWrapper);
  } else {
    const contentWrapper = document.createElement("div");
    contentWrapper.style.display = "flex";
    contentWrapper.style.alignItems = "center";

    contentWrapper.appendChild(timeSpan);
    contentWrapper.appendChild(textDiv);

    msg.appendChild(contentWrapper);
  }

  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showOptions(options) {
  answerOptions.innerHTML = "";
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "answerBtn";
    btn.textContent = option.text;
    btn.onclick = () => {
      if(waitingForReply) return;
      waitingForReply = true;

      showMessage("Me", option.text);
      answerOptions.innerHTML = "";
      step++;

      setTimeout(() => {
        waitingForReply = false;
        runScript();
      }, 2000);
    };
    answerOptions.appendChild(btn);
  });
}

function runScript() {
  if (step >= script.length) return;

  const entry = script[step];

  if (entry.from) {
    if(entry.from === "H" && !waitingForReply){
      showMessage(entry.from, entry.text);
      step++;
      setTimeout(runScript, 2000);
    }
  } else if (entry.options) {
    showOptions(entry.options);
  }
}

setTimeout(() => {
  startScreen.style.display = "none";
  chatScreen.style.display = "flex";
  runScript();
}, 5000);
