const API_URL = "https://mock-api.driven.com.br/api/v6/uol/";

const UOLChatAPI = {
  getParticipants: () => axios.get(API_URL + "participants"),

  getMessages: () => axios.get(API_URL + "messages"),

  sendMessage: ({ from, to, type, text }) =>
    axios.post(API_URL + "messages", {
      from,
      to,
      text,
      type,
    }),

  keepConnection: (name) => {
    setInterval(() => {
      axios.post(API_URL + "status", name);
    }, 3000);
  },

  sign: (name) => {
    return axios.post(API_URL + "participants", {
      name,
    });
  },
};

const sign = (name) => {
  return axios.post(API_URL + "participants", {
    name,
  });
};
