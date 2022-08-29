"use strict";

var MESSAGE_CONFIG = {
  from: "",
  to: "Todos",
  type: "message",
  text: ""
};
var PARTICIPANTS = [];

var updateEachThreeSeconds = function updateEachThreeSeconds(fn) {
  return setInterval(function () {
    return fn();
  }, 3 * 1000);
};

var setupChat = function setupChat(fn) {
  getParticipants();
  updateMessages(fn);
  updateEachThreeSeconds(updateMessages);
  inputSendMessageHandler(updateMessages);
  buttonSendMessageHandler(updateMessages);
  updateEachThreeSeconds(getParticipants);
  toggleOptions();
  updateEachThreeSeconds(function () {
    //console.log(MESSAGE_CONFIG.from);
    UOLChatAPI.keepConnection({
      name: MESSAGE_CONFIG.from
    });
  });
};

signHandler(function () {
  setupChat(function () {
    document.querySelector("#sign").classList.toggle("hide");
  });
});