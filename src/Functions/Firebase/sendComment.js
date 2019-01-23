import uuidv4 from "uuid/v4";
import store from "../../store";
const sendComment = async props => {
  const uuid = uuidv4();
  const url = process.env.REACT_APP_FIREBASE_SEND_COMMENT;
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      data: {
        id: uuid,
        uid: store.getState().profile.uid,
        ...props
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export default sendComment;
