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

const getLocalUTC = () =>
  Math.abs(new Date().getHours() - new Date().getUTCHours());

const convertGlobalDataToLocalData = (time) => {
  time = time.replace("(", "").replace(")", "");
  const UTC_LOCAL = getLocalUTC();

  time = time.split(":").map((t) => Number(t));
  time[0] =
    time[0] - UTC_LOCAL < 0 ? 12 + (time[0] - UTC_LOCAL) : time[0] - UTC_LOCAL;
  time = time.map((t) => {
    t = t.toString();
    return t.length === 1 ? "0" + t : t;
  });

  if (time[0] === "00") time[0] = "12";

  time = time.join(":");
  return "(" + time + ")";
};

const updateMessages = (fn = () => {}) => {
  const messagesElement = document.querySelector("#home main .messages");

  UOLChatAPI.getMessages().then((res) => {
    const messages = filterMessages(res.data, MESSAGE_CONFIG.from).map((el) => {
      el.time = convertGlobalDataToLocalData(el.time);
      return el;
    });
    messagesElement.innerHTML = "";

    messages.forEach((msg) => {
      messagesElement.innerHTML += messageElement(msg);
    });

    messagesElement.querySelector("li:last-child").scrollIntoView();
    fn();
  });
};
