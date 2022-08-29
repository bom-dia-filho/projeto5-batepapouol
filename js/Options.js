const contactElement = (name, hide = false) => {
  return `
        <li data-name='${name}'>
            <ion-icon name="${
              name === "Todos" ? "people" : "person-circle"
            }"></ion-icon>
            ${name}
            <ion-icon class="check ${
              hide ? "" : "hide"
            }" name="checkmark-outline"></ion-icon>
        </li>
    `;
};

const renderParticipants = (contact) => {
  PARTICIPANTS.forEach((participant) => {
    contact.innerHTML += contactElement(participant.name);
  });
};

const hideCheckElements = (elements) => {
  elements.forEach((element) => {
    element.querySelector(".check").classList.add("hide");
  });
};

const chooseParticipant = (participantElements) => {
  participantElements.forEach((element) => {
    element.onclick = (e) => {
      hideCheckElements(participantElements);
      MESSAGE_CONFIG.to = element.getAttribute("data-name");
      element.querySelector(".check").classList.remove("hide");
    };
  });
};

const chooseVisibility = () => {
  const elements = document.querySelectorAll(".visibility ul li");

  elements.forEach((element) => {
    element.onclick = (e) => {
      hideCheckElements(elements);
      MESSAGE_CONFIG.type =
        element.getAttribute("data-type") === "0"
          ? "message"
          : "private_message";
      element.querySelector(".check").classList.remove("hide");
    };
  });
};

const getParticipants = (fn) => {
  UOLChatAPI.getParticipants().then((res) => {
    PARTICIPANTS = [{ name: "Todos" }]
      .concat(res.data)
      .filter((data) => data.name !== MESSAGE_CONFIG.from);
    fn(res.data);
  });
};

const optionsHandler = () => {
  const contact = document.querySelector(
    ".options-container .options .contact ul"
  );

  getParticipants((data) => {
    contact.innerHTML = "";
    renderParticipants(contact, data.name !== MESSAGE_CONFIG.to);

    chooseParticipant(contact.querySelectorAll("li"));
    chooseVisibility();
  });
};

const toggleOptions = () => {
  const background = document.querySelector(".bg");
  const btn = document.querySelector(".side-bar-btn");

  btn.onclick = (e) => {
    document.querySelector(".options-container").classList.toggle("hide");
  };

  background.onclick = (e) => {
    document.querySelector(".options-container").classList.toggle("hide");
  };
};
