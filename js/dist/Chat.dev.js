"use strict";

var MESSAGE_CONFIG = {
  from: "",
  to: "Todos",
  type: "message",
  text: ""
};
var PARTICIPANTS = [];
MESSAGE_CONFIG.from = "userfff" + Math.random().toFixed(3);

var updateEachThreeSeconds = function updateEachThreeSeconds(fn) {
  return setInterval(function () {
    return fn();
  }, 3 * 1000);
};

var setupChat = function setupChat(fn) {
  updateMessages(fn);
  updateEachThreeSeconds(updateMessages);
  optionsHandler();
  inputSendMessageHandler(updateMessages);
  buttonSendMessageHandler(updateMessages);
  toggleOptions();
  updateEachThreeSeconds(function () {
    return UOLChatAPI.keepConnection({
      name: MESSAGE_CONFIG.from
    });
  });
};

signHandler(function () {
  setupChat(function () {
    document.querySelector("#home").classList.toggle("hide");
    document.querySelector("#sign").classList.toggle("hide");
  });
});