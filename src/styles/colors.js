import { hot } from "react-hot-loader";

const colors = {
  background: "#263238",

  font: {
    normal: "grey",
    lightNormal: "lightgrey",
    light: "rgba(0, 0, 0, 0.54)",
    active: "white"
  },
  events: {
    hover: "#1c313a"
  },
  borders: {
    light: "lightgrey",
    inactive: "lightgrey",
    active: "black"
  },
  tags: {
    normal: "#29434e"
  },
  buttons: {
    login: "#0064a0",
    loginHover: "#003c8f",
    active: "#263238"
  },
  postTypes: {
    text: "#65499c",

    photo: "#0093c4",

    quote: "#a8b545",

    audio: "#c88719",

    video: "#af4448"
  }
};

export default hot(module)(colors);
