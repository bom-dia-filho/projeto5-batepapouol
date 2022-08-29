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
    let i = 0;
    setInterval(() => {
      console.log(i++);
      axios
        .post(API_URL + "status", name)
        .then(() => {})
        .catch((e) => {
          console.log("O problema é aqui em keep connection");
        });
    }, 5000);
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
