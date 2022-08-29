const messageElement = ({ from, to, text, type, time }) => {
  const typeText = {
    status: "",
    private_message: "reservadamente para",
    message: "para",
  };

  return `
        <li class='message ${type !== "message" ? type : ""}'>
            ${time}
            <span>
                <b>${from}</b> ${typeText[type]} <b>${
    type === "status" ? "" : to
  }</b>
            </span>
            ${text}
        </li>
    `;
};

const filterMessages = (msgs, username) => {
  return msgs.filter(({ type, to, from }) => {
    if (type === "private_message" && to !== username && from !== username) {
      return false;
    }

    return true;
  });
};

const updateMessages = (fn = () => {}) => {
  const messagesElement = document.querySelector("#home main .messages");

  UOLChatAPI.getMessages().then((res) => {
    const messages = filterMessages(res.data, MESSAGE_CONFIG.from);
    messagesElement.innerHTML = "";

    messages.forEach((msg) => {
      messagesElement.innerHTML += messageElement(msg);
    });

    messagesElement.querySelector("li:last-child").scrollIntoView();
    const id = setTimeout(() => {
      fn();
      clearTimeout(id);
    }, 500);
  });
};
