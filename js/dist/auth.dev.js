"use strict";

var formAuth = document.querySelector("#form-auth");
var username = "";
formAuth[0].value = "Jorge Ben" + Math.random().toFixed(3);
formAuth[1].addEventListener("click", function (e) {
  e.preventDefault();

  if (isNameValid(formAuth[0].value)) {
    loadingHTML();
    tryConnect();
  } else console.log("problema");
});
formAuth[1].click();

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