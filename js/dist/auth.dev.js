"use strict";

var formAuth = document.querySelector("#form-auth");
formAuth[1].addEventListener("click", function (e) {
  e.preventDefault();
  console.log(isNameValid(formAuth[0].value)); //auth({ name: formAuth[0].value }).then((response) => console.log(response));
});

function isNameValid(name) {
  var requiriments = [function (name) {
    return name.length >= 3;
  }];
  return requiriments.filter(function (req) {
    return req(name);
  });
}