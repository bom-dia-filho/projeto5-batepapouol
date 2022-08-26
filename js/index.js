const formAuth = document.querySelector("#form-auth");
let username = "";

//formAuth[0].value = "Jorge Ben" + Math.random().toFixed(3);

formAuth[1].addEventListener("click", (e) => {
  e.preventDefault();
  if (isNameValid(formAuth[0].value)) {
    loadingHTML();
    tryConnect();
  } else console.log("problema");
});

//formAuth[1].click();

function loadingHTML() {
  document.querySelector("#auth form").classList.toggle("hide");
  document.querySelector("#auth .spinning").classList.toggle("hide");
}

function tryConnect() {
  authAPI(formAuth[0].value)
    .then((response) => {
      connectChat();
      return;
    })
    .catch((e) => {
      return tryConnect();
    });
}

function connectChat() {
  closeAuth();
  openUOLChat();
  username = formAuth[0].value;
  loadMessages();
  keepConnection(username);
}

function closeAuth() {
  document.querySelector("#auth").classList.add("hide");
}

function openUOLChat() {
  document.querySelector("#home").classList.remove("hide");
}

function isNameValid(name) {
  const requiriments = [(name) => name.length >= 3];

  return requiriments.map((req) => req(name)).includes(false) ? false : true;
}

const messages = document.querySelector("#home .messages");

function privateMessageElement(info) {
  return `
        <li class="message private">
            <span class="date">${info.time}</span>
            <span>
                <b>${info.from}</b>
                reservadamente para 
                <b>${info.to}</b>:                        
            </span>
            <span class="text">${info.text}</span>
        </li>
    `;
}

function messageElement(info) {
  return `
    <li class="message">
        <span class="date">${info.time}</span>
        <span>
            <b>${info.from}</b>
            para
            <b>${info.to}</b>:                        
        </span>
        <span class="text">${info.text}</span>
    </li>
`;
}

function statusMessageElement(info) {
  return `
    <li class="message status">
        <span class="date">${info.time}</span>
        <span>
            <b>${info.from}</b>                       
        </span>
        <span class="text">${info.text}</span>
    </li>
`;
}

function convertUTCBrasilia(time) {
  //time_format = hh:mm:ss
  time = time.replace("(", "").replace(")", "");
  const k = 3;
  time = time.split(":").map((t) => Number(t));
  time[0] = time[0] - k < 0 ? 24 + (time[0] - k) : time[0] - k;
  time = time.map((t) => {
    t = t.toString();
    return t.length === 1 ? "0" + t : t;
  });
  if (time < 9) time = "0" + time.toString();
  time = time.join(":");
  return "(" + time + ")";
}

function loadMessages() {
  function get() {
    getMessages()
      .then((participants) => {
        messages.innerHTML = "";
        participants.data.forEach((participant) => {
          participant.time = convertUTCBrasilia(participant.time);
          messages.innerHTML += {
            message: messageElement(participant),
            status: statusMessageElement(participant),
            private_message:
              participant.to === username
                ? privateMessageElement(participant)
                : "",
          }[participant.type];
        });
        loadingHTML();
        messages.querySelector("li:last-child").scrollIntoView();
      })
      .catch((e) => console.log(e));
  }
  get();
  const l = setInterval(() => {
    get();
  }, 3000);
}

const formSendMessage = document.querySelector("#send-message-form");

formSendMessage[1].addEventListener("click", (e) => {
  e.preventDefault();
  sendMessage(
    message({
      from: username,
      to: "Todos",
      text: formSendMessage[0].value,
    })
  )
    .then((response) => {
      formSendMessage[0].value = "";
      loadMessages();
    })
    .catch((e) => {
      window.location.reload();
    });
});
