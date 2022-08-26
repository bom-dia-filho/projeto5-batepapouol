function createMessageTo(to) {
  return `
    <b class='to'>
        ${to}
    </b>
  `;
}

function createMessageFrom(from) {
  return `
    <b class='from'>
        ${from}
    </b>
  `;
}

function createMessageText(text) {
  return `
    <span class='text'>
        ${text}
    </span>
  `;
}

function createMessageTime(time) {
  return `
    <span class='time'>
        ${time}
    </span>
  `;
}

function createTypeText(type) {
  let typeText = "";
  if (type === "status") typeText = "";
  if (type === "private_message") typeText = "reservadamente para";
  if (type === "message") typeText = "para";
  return typeText;
}

function createMessage(info) {
  const text = createMessageText(info.text);
  const from = createMessageFrom(info.from);
  const to = createMessageTo(info.to);
  const time = createMessageTime(info.time);
  const typeText = createTypeText(info.type);
  return `
    <li class='message ${info.type}'>
      ${time}
      <span>
          ${from} ${typeText} ${to}
      </span>
      ${text}
    </li>
  `;
}
