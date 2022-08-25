"use strict";

var API_URL = "https://mock-api.driven.com.br/api/v6/uol/";

function getParticipants() {
  return axios.get(API_URL + "participants");
}

function auth() {
  return axios.post(API_URL + "participants", {
    name: "Jorge Ben JooJ"
  });
}

function keepConnection() {
  return axios.post(API_URL + "status", {});
}

function getMessage() {
  return axios.get(API_URL + "messages");
}

function sendMessage(msgConfig) {
  return axios.post(API_URL + "messages", msgConfig);
}

function timeNow() {
  return new Date().toLocaleTimeString().split(" ")[0];
}

function privateMessage(msgConfig) {
  return {
    from: msgConfig.from,
    to: msgConfig.to,
    text: msgConfig.text,
    type: "private_message",
    time: timeNow()
  };
}

function statusMessage(msgConfig) {
  return {
    from: msgConfig.from,
    to: "Todos",
    text: msgConfig.text,
    type: "private_message",
    time: timeNow()
  };
}

function message(msgConfig) {
  return {
    from: msgConfig.from,
    to: msgConfig.to,
    text: msgConfig.text,
    type: "message",
    time: timeNow()
  };
}