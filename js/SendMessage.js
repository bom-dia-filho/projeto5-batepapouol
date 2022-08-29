const sendMessage = (input, fn) => {
  MESSAGE_CONFIG.text = input.value;
  input.value = "";
  if (
    MESSAGE_CONFIG.to === "Todos" &&
    MESSAGE_CONFIG.type === "private_message"
  )
    MESSAGE_CONFIG.type = "message";
  UOLChatAPI.sendMessage(MESSAGE_CONFIG)
    .then((res) => {
      console.log(MESSAGE_CONFIG);
      fn();
    })
    .catch((e) => {
      console.log(MESSAGE_CONFIG);
      window.location.reload();
    });
};

const inputSendMessageHandler = (fn) => {
  const input = document.querySelector("#form-send-message > input");

  input.onkeydown = (e) => {
    if (e.keyCode === "13") {
      sendMessage(input, fn);
    }
  };
};

const buttonSendMessageHandler = (fn) => {
  const [input, button] = document.querySelectorAll("#form-send-message > *");

  button.onclick = (e) => {
    e.preventDefault();
    sendMessage(input, fn);
  };
};
