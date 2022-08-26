const API_URL = "https://mock-api.driven.com.br/api/v6/uol/";

function getParticipantsAPI() {
  return axios.get(API_URL + "participants");
}

function authAPI(name) {
  return axios.post(API_URL + "participants", {
    name,
  });
}

function keepConnectionAPI(name) {
  setInterval(() => {
    axios.post(API_URL + "status", {
      name,
    });
  }, 3000);
}

function getMessagesAPI() {
  return axios.get(API_URL + "messages");
}

function sendMessageAPI(msgConfig) {
  return axios.post(API_URL + "messages", msgConfig);
}

function createMessageOBJAPI(msgConfig) {
  return {
    from: msgConfig.from,
    to: msgConfig.to,
    text: msgConfig.text,
    type: msgConfig.type,
  };
}
