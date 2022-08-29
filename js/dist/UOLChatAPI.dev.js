"use strict";

var API_URL = "https://mock-api.driven.com.br/api/v6/uol/";
var UOLChatAPI = {
  getParticipants: function getParticipants() {
    return axios.get(API_URL + "participants");
  },
  getMessages: function getMessages() {
    return axios.get(API_URL + "messages");
  },
  sendMessage: function sendMessage(_ref) {
    var from = _ref.from,
        to = _ref.to,
        type = _ref.type,
        text = _ref.text;
    return axios.post(API_URL + "messages", {
      from: from,
      to: to,
      text: text,
      type: type
    });
  },
  keepConnection: function keepConnection(name) {
    setInterval(function () {
      axios.post(API_URL + "status", name);
    }, 3000);
  },
  sign: function sign(name) {
    return axios.post(API_URL + "participants", {
      name: name
    });
  }
};

var sign = function sign(name) {
  return axios.post(API_URL + "participants", {
    name: name
  });
};