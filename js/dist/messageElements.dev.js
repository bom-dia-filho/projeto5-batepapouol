"use strict";

function createMessageTo(to) {
  return "\n    <b class='to'>\n        ".concat(to, "\n    </b>\n  ");
}

function createMessageFrom(from) {
  return "\n    <b class='from'>\n        ".concat(from, "\n    </b>\n  ");
}

function createMessageText(text) {
  return "\n    <span class='text'>\n        ".concat(text, "\n    </span>\n  ");
}

function createMessageTime(time) {
  return "\n    <span class='time'>\n        ".concat(time, "\n    </span>\n  ");
}

function createTypeText(type) {
  var typeText = "";
  if (type === "status") typeText = "";
  if (type === "private_message") typeText = "reservadamente para";
  if (type === "message") typeText = "para";
  return typeText;
}

function createMessage(info) {
  var text = createMessageText(info.text);
  var from = createMessageFrom(info.from);
  var to = createMessageTo(info.to);
  var time = createMessageTime(info.time);
  var typeText = createTypeText(info.type);
  return "\n    <li class='message ".concat(info.type, "'>\n      ").concat(time, "\n      <span>\n          ").concat(from, " ").concat(typeText, " ").concat(to, "\n      </span>\n      ").concat(text, "\n    </li>\n  ");
}