import { hot } from "react-hot-loader";

const colors = {
  background: "#1c313a",

  font: {
    normal: "grey",
    lightNormal: "lightgrey"
  },
  events: {
    hover: "#1c313a"
  },
  buttons: {
    login: "#2962ff"
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
