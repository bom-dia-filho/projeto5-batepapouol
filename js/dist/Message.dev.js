"use strict";

var messageElement = function messageElement(_ref) {
  var from = _ref.from,
      to = _ref.to,
      text = _ref.text,
      type = _ref.type,
      time = _ref.time;
  var typeText = {
    status: "",
    private_message: "reservadamente para",
    message: "para"
  };
  return "\n        <li class='message ".concat(type !== "message" ? type : "", "'>\n            ").concat(time, "\n            <span>\n                <b>").concat(from, "</b> ").concat(typeText[type], " <b>").concat(type === "status" ? "" : to, "</b>\n            </span>\n            ").concat(text, "\n        </li>\n    ");
};

var filterMessages = function filterMessages(msgs, username) {
  return msgs.filter(function (_ref2) {
    var type = _ref2.type,
        to = _ref2.to,
        from = _ref2.from;

    if (type === "private_message" && to !== username && from !== username) {
      return false;
    }

    return true;
  });
};

var updateMessages = function updateMessages() {
  var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var messagesElement = document.querySelector("#home main .messages");
  UOLChatAPI.getMessages().then(function (res) {
    var messages = filterMessages(res.data, MESSAGE_CONFIG.from);
    messagesElement.innerHTML = "";
    messages.forEach(function (msg) {
      messagesElement.innerHTML += messageElement(msg);
    });
    messagesElement.querySelector("li:last-child").scrollIntoView();
    var id = setTimeout(function () {
      fn();
      clearTimeout(id);
    }, 500);
  });
};