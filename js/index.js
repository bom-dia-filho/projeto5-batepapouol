let username = "Jorge Ben" + Math.random().toFixed(3);
let to = "Todos";
let typeMessage = "message";
let participants = [];

function handleFormAuth() {
  const [input, button] = document.querySelectorAll("#form-auth > *");

  function tryConnect(id) {
    authAPI(username)
      .then((response) => {
        connectChat();
        clearInterval(id);
        return console.log("1");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function connectChat() {
    closeAuth();
    openUOLChat();
    //username = input.value;
    updateUOLChat();
    keepConnectionAPI(username);
    handleSendMessage();
  }

  button.onclick = (e) => {
    e.preventDefault();
    if (isNameValid("ssss")) {
      toggleSpinner();
      const id = setInterval(() => tryConnect(id), 1000);
    } else console.log("problema");
  };

  button.click();
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

function updateUOLChat() {
  loadMessages();
  const time = 3000;
  setInterval(() => {
    loadMessages();
    getParticipantsAPI().then((res) => {
      participants = [{ name: "Todos" }].concat(res.data);
    });
  }, time);
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
      const { type, time, to, from } = msg;
      msg.time = convertGlobalUTCDate(time);
      if (type === "status") msg.to = "";
      let message = createMessage(msg);
      //if (type === "private_message") console.log(msg);
      if (type === "private_message" && to !== username && from !== username) {
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
      to: to,
      text: input.value,
      type: typeMessage,
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

function handleMenu() {
  const bg = document.querySelector(".menu .bg");
  const menuBtn = document.querySelector("#home header ion-icon");

  function toggleMenu() {
    document.querySelector(".menu").classList.toggle("hide");
  }

  function item(name, hide = false) {
    return `
      <li data-name='${name}'>
          <ion-icon name="${
            name === "Todos" ? "people" : "person-circle"
          }"></ion-icon>
          ${name}
          <ion-icon class="check ${
            hide ? "" : "hide"
          }" name="checkmark-outline"></ion-icon>
      </li>
    `;
  }

  function renderContacts() {
    const contact = document.querySelector(".menu .bar > .contact");

    contact.innerHTML = "";

    participants.forEach((d) => {
      contact.innerHTML += item(d.name, d.name === to);
      //console.log(d.name, to);
    });
    handleVisibility();
    handleContact();
  }

  function handleContact() {
    const contacts = document.querySelectorAll(".menu .bar > .contact li");

    function addHide() {
      contacts.forEach((c) => {
        console.log(c);
        c.querySelector(".check").classList.add("hide");
      });
    }

    contacts.forEach((c) => {
      c.onclick = (e) => {
        addHide();
        c.querySelector(".check").classList.remove("hide");
        to = c.getAttribute("data-name");
        console.log(to);
      };
    });
  }

  function handleVisibility() {
    const visibilitiesItem = document.querySelectorAll(
      ".menu .bar > .visibility li"
    );

    function addHide() {
      visibilitiesItem.forEach((i) => {
        i.querySelector(".check").classList.add("hide");
      });
    }

    visibilitiesItem.forEach((item) => {
      item.onclick = (e) => {
        addHide();
        item.querySelector(".check").classList.remove("hide");
        item.getAttribute("0")
          ? (typeMessage = "message")
          : (typeMessage = "private_message");
      };
    });
  }

  menuBtn.onclick = (e) => {
    toggleMenu();
    renderContacts();
  };

  bg.onclick = (e) => {
    toggleMenu();
  };
}

handleMenu();
