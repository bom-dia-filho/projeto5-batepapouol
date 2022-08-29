"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sendMessage = function sendMessage(input, fn) {
  MESSAGE_CONFIG.text = input.value;
  input.value = "";
  if (MESSAGE_CONFIG.to === "Todos" && MESSAGE_CONFIG.type === "private_message") MESSAGE_CONFIG.type = "message";
  UOLChatAPI.sendMessage(MESSAGE_CONFIG).then(function (res) {
    fn();
  })["catch"](function (e) {
    console.log(MESSAGE_CONFIG);
    window.location.reload();
  });
};

var inputSendMessageHandler = function inputSendMessageHandler(fn) {
  var input = document.querySelector("#form-send-message > input");

  input.onkeydown = function (e) {
    if (e.keyCode === "13" && trim(MESSAGE_CONFIG.text).length > 0) {
      sendMessage(input, fn);
    }
  };
};

var buttonSendMessageHandler = function buttonSendMessageHandler(fn) {
  var _document$querySelect = document.querySelectorAll("#form-send-message > *"),
      _document$querySelect2 = _slicedToArray(_document$querySelect, 2),
      input = _document$querySelect2[0],
      button = _document$querySelect2[1];

  button.onclick = function (e) {
    e.preventDefault();
    sendMessage(input, fn);
  };
};