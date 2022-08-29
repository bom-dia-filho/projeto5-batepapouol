const signHandler = (fn) => {
  const [input, button] = document.querySelectorAll("#sign form > *");

  button.onclick = (e) => {
    e.preventDefault();
    const username = input.value.trim();
    if (username.length > 0) {
      document.querySelector(".spinning").classList.toggle("hide");
      document.querySelector("#sign form").classList.toggle("hide");
      UOLChatAPI.sign(username)
        .then((e) => {
          MESSAGE_CONFIG.from = username;
          fn();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
};
