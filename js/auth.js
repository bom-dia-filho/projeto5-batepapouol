const formAuth = document.querySelector("#form-auth");
let username = "";

formAuth[1].addEventListener("click", (e) => {
  e.preventDefault();
  isNameValid(formAuth[0].value)
    ? auth({ name: formAuth[0].value }).then((response) => {
        closeAuth();
        openUOLChat();
        username = formAuth[0].value;
      })
    : console.log("problema");
});

function closeAuth() {
  document.querySelector("#auth").classList.add("hide");
}

function openUOLChat() {
  document.querySelector("#home").classList.remove("hide");
}

function isNameValid(name) {
  const requiriments = [(name) => name.length >= 3];

  return requiriments.map((req) => req(name)).includes(false) ? false : true;
}
