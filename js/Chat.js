const MESSAGE_CONFIG = {
  from: "",
  to: "Todos",
  type: "message",
  text: "",
};

let PARTICIPANTS = [];

const updateEachTime = (fn, time = 3000) => setInterval(() => fn(), time);

const setupChat = (fn) => {
  UOLChatAPI.keepConnection({ name: MESSAGE_CONFIG.from });
  getParticipants();
  updateMessages(fn);
  updateEachTime(updateMessages);
  inputSendMessageHandler(updateMessages);
  buttonSendMessageHandler(updateMessages);
  updateEachTime(getParticipants);
  toggleOptions();
};

signHandler(() => {
  setupChat(() => {
    document.querySelector("#sign").classList.toggle("hide");
  });
});
