"use strict";

var formAuth = document.querySelector("#form-auth");
var username = ""; //formAuth[0].value = "Jorge Ben" + Math.random().toFixed(3);

formAuth[1].addEventListener("click", function (e) {
  e.preventDefault();

  if (isNameValid(formAuth[0].value)) {
    loadingHTML();
    tryConnect();
  } else console.log("problema");
}); //formAuth[1].click();

function loadingHTML() {
  document.querySelector("#auth form").classList.toggle("hide");
  document.querySelector("#auth .spinning").classList.toggle("hide");
}

function tryConnect() {
  authAPI(formAuth[0].value).then(function (response) {
    connectChat();
    return;
  })["catch"](function (e) {
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
  var requiriments = [function (name) {
    return name.length >= 3;
  }];
  return requiriments.map(function (req) {
    return req(name);
  }).includes(false) ? false : true;
}

var messages = document.querySelector("#home .messages");

function privateMessageElement(info) {
  return "\n        <li class=\"message private\">\n            <span class=\"date\">".concat(info.time, "</span>\n            <span>\n                <b>").concat(info.from, "</b>\n                reservadamente para \n                <b>").concat(info.to, "</b>:                        \n            </span>\n            <span class=\"text\">").concat(info.text, "</span>\n        </li>\n    ");
}

function messageElement(info) {
  return "\n    <li class=\"message\">\n        <span class=\"date\">".concat(info.time, "</span>\n        <span>\n            <b>").concat(info.from, "</b>\n            para\n            <b>").concat(info.to, "</b>:                        \n        </span>\n        <span class=\"text\">").concat(info.text, "</span>\n    </li>\n");
}

function statusMessageElement(info) {
  return "\n    <li class=\"message status\">\n        <span class=\"date\">".concat(info.time, "</span>\n        <span>\n            <b>").concat(info.from, "</b>                       \n        </span>\n        <span class=\"text\">").concat(info.text, "</span>\n    </li>\n");
}

function convertUTCBrasilia(time) {
  //time_format = hh:mm:ss
  time = time.replace("(", "").replace(")", "");
  var k = 3;
  time = time.split(":").map(function (t) {
    return Number(t);
  });
  time[0] = time[0] - k < 0 ? 24 + (time[0] - k) : time[0] - k;
  time = time.map(function (t) {
    t = t.toString();
    return t.length === 1 ? "0" + t : t;
  });
  if (time < 9) time = "0" + time.toString();
  time = time.join(":");
  return "(" + time + ")";
}

function loadMessages() {
  function get() {
    getMessages().then(function (participants) {
      messages.innerHTML = "";
      participants.data.forEach(function (participant) {
        participant.time = convertUTCBrasilia(participant.time);
        messages.innerHTML += {
          message: messageElement(participant),
          status: statusMessageElement(participant),
          private_message: participant.to === username ? privateMessageElement(participant) : ""
        }[participant.type];
      });
      loadingHTML();
      messages.querySelector("li:last-child").scrollIntoView();
    })["catch"](function (e) {
      return console.log(e);
    });
  }

  get();
  var l = setInterval(function () {
    get();
  }, 3000);
}

var formSendMessage = document.querySelector("#send-message-form");
formSendMessage[1].addEventListener("click", function (e) {
  e.preventDefault();
  sendMessage(message({
    from: username,
    to: "Todos",
    text: formSendMessage[0].value
  })).then(function (response) {
    formSendMessage[0].value = "";
    loadMessages();
  })["catch"](function (e) {
    window.location.reload();
  });
});