const MESSAGE_CONFIG = {
  from: "",
  to: "Todos",
  type: "message",
  text: "",
};

let PARTICIPANTS = [];

const updateEachThreeSeconds = (fn) => setInterval(() => fn(), 3 * 1000);

const setupChat = (fn) => {
  getParticipants();
  updateMessages(fn);
  updateEachThreeSeconds(updateMessages);
  inputSendMessageHandler(updateMessages);
  buttonSendMessageHandler(updateMessages);
  updateEachThreeSeconds(getParticipants);
  toggleOptions();
  updateEachThreeSeconds(() => {
    //console.log(MESSAGE_CONFIG.from);
    UOLChatAPI.keepConnection({ name: MESSAGE_CONFIG.from });
  });
};

signHandler(() => {
  setupChat(() => {
    document.querySelector("#sign").classList.toggle("hide");
  });
});
