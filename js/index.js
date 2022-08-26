let username = "";

function handleFormAuth() {
  const [input, button] = document.querySelectorAll("#form-auth > *");

  function tryConnect() {
    authAPI(input.value)
      .then((response) => {
        connectChat();
        return console.log("1");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function connectChat() {
    closeAuth();
    openUOLChat();
    username = input.value;
    updateMessages();
    keepConnectionAPI(username);
    handleSendMessage();
  }

  button.onclick = (e) => {
    e.preventDefault();
    if (isNameValid(input.value)) {
      toggleSpinner();
      tryConnect();
    } else console.log("problema");
  };
}

function closeAuth() {
  document.querySelector("#auth").classList.add("hide");
}

function openUOLChat() {
  document.querySelector("#home").classList.remove("hide");
}

function toggleSpinner() {
  document.querySelector(".spinning").classList.toggle("hide");
  document.querySelector("#form-auth").classList.toggle("hide");
}

handleFormAuth();

const messages = document.querySelector("#home .messages");

function updateMessages() {
  loadMessages();
  const time = 3000;
  setInterval(() => loadMessages(), time);
}

function loadMessages() {
  function getMessages() {
    getMessagesAPI().then(renderMessages).catch(errorGetMessages);
  }

  function clearMessages() {
    messages.innerHTML = "";
  }

  function errorGetMessages(e) {
    return console.log(e);
  }

  function renderMessages(messagesAPI) {
    clearMessages();
    const { data } = messagesAPI;
    data.forEach((msg) => {
      const { type, time, to } = msg;
      msg.time = convertGlobalUTCDate(time);
      if (type === "status") msg.to = "";
      let message = createMessage(msg);
      //if (type === "private_message") console.log(msg);
      if (type === "private_message" && to !== username) {
        console.log(msg);
        message = "";
      }

      messages.innerHTML += message;
    });

    messages.querySelector("li:last-child").scrollIntoView();
  }

  getMessages();
}

function handleSendMessage() {
  const [input, button] = document.querySelectorAll("#send-message-form > *");

  let message;

  let i = true;

  function sendMessage() {
    sendMessageAPI(message).then(sendMessageSuccess).catch(sendMessageError);
  }

  function noSpam() {
    i = !i;
  }

  function clearInput() {
    input.value = "";
  }

  function sendMessageSuccess() {
    noSpam();
    clearInput();
    loadMessages();
  }

  function sendMessageError(e) {
    window.location.reload();
  }

  function createMessage() {
    return createMessageOBJAPI({
      from: username,
      to: "Todos",
      text: input.value,
      type: "message",
    });
  }

  button.onclick = (e) => {
    e.preventDefault();
    if (i) {
      noSpam();
      message = createMessage();
      sendMessage();
    }
  };

  input.onfocus = (e) => {
    input.onkeydown = (e) => {
      if (e.keyCode === 13 && i) {
        noSpam();
        message = createMessage();
        sendMessage();
      }
    };
  };
}
