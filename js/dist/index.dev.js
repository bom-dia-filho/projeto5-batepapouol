"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var username = "";

function handleFormAuth() {
  var _document$querySelect = document.querySelectorAll("#form-auth > *"),
      _document$querySelect2 = _slicedToArray(_document$querySelect, 2),
      input = _document$querySelect2[0],
      button = _document$querySelect2[1];

  function tryConnect() {
    authAPI(input.value).then(function (response) {
      connectChat();
      return console.log("1");
    })["catch"](function (e) {
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

  button.onclick = function (e) {
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
var messages = document.querySelector("#home .messages");

function updateMessages() {
  loadMessages();
  var time = 3000;
  setInterval(function () {
    return loadMessages();
  }, time);
}

function loadMessages() {
  function getMessages() {
    getMessagesAPI().then(renderMessages)["catch"](errorGetMessages);
  }

  function clearMessages() {
    messages.innerHTML = "";
  }

  function errorGetMessages(e) {
    return console.log(e);
  }

  function renderMessages(messagesAPI) {
    clearMessages();
    var data = messagesAPI.data;
    data.forEach(function (msg) {
      var type = msg.type,
          time = msg.time,
          to = msg.to;
      msg.time = convertGlobalUTCDate(time);
      if (type === "status") msg.to = "";
      var message = createMessage(msg); //if (type === "private_message") console.log(msg);

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
  var _document$querySelect3 = document.querySelectorAll("#send-message-form > *"),
      _document$querySelect4 = _slicedToArray(_document$querySelect3, 2),
      input = _document$querySelect4[0],
      button = _document$querySelect4[1];

  var message;
  var i = true;

  function sendMessage() {
    sendMessageAPI(message).then(sendMessageSuccess)["catch"](sendMessageError);
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
      type: "message"
    });
  }

  button.onclick = function (e) {
    e.preventDefault();

    if (i) {
      noSpam();
      message = createMessage();
      sendMessage();
    }
  };

  input.onfocus = function (e) {
    input.onkeydown = function (e) {
      if (e.keyCode === 13 && i) {
        noSpam();
        message = createMessage();
        sendMessage();
      }
    };
  };
}