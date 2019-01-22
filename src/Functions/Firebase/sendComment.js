import uuidv4 from "uuid/v4";
const sendComment = async props => {
  const uuid = uuidv4();
  const url = process.env.REACT_APP_FIREBASE_SEND_COMMENT;
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      id: uuid,
      ...props
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export default sendComment;
