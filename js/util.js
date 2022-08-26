function getLocalUTC() {
  return Math.abs(new Date().getHours() - new Date().getUTCHours());
}

function convertGlobalUTCDate(time) {
  time = time.replace("(", "").replace(")", "");

  const UTC = getLocalUTC();

  time = time.split(":").map((t) => Number(t));
  time[0] = time[0] - UTC < 0 ? 12 + (time[0] - UTC) : time[0] - UTC;
  time = time.map((t) => {
    t = t.toString();
    return t.length === 1 ? "0" + t : t;
  });

  if (time[0] === "00") time[0] = "12";

  time = time.join(":");
  return "(" + time + ")";
}

function isNameValid(name) {
  const requiriments = [(name) => name.length >= 3];

  return requiriments.map((req) => req(name)).includes(false) ? false : true;
}

function timeNow() {
  return new Date().toLocaleTimeString().split(" ")[0];
}
