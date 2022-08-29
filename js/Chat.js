const MESSAGE_CONFIG = {
  from: "",
  to: "Todos",
  type: "message",
  text: "",
};

let PARTICIPANTS = [];

MESSAGE_CONFIG.from = "userfff" + Math.random().toFixed(3);

const updateEachThreeSeconds = (fn) => setInterval(() => fn(), 3 * 1000);

const setupChat = (fn) => {
  updateMessages(fn);
  updateEachThreeSeconds(updateMessages);
  optionsHandler();
  inputSendMessageHandler(updateMessages);
  buttonSendMessageHandler(updateMessages);
  toggleOptions();
  updateEachThreeSeconds(() =>
    UOLChatAPI.keepConnection({ name: MESSAGE_CONFIG.from })
  );
};

signHandler(() => {
  setupChat(() => {
    document.querySelector("#home").classList.toggle("hide");
    document.querySelector("#sign").classList.toggle("hide");
  });
});
