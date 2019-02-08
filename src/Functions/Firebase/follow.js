import uuidv4 from "uuid/v4";
import store from "../../store";
//adding or removing following through firebase api
const follow = async props => {
  const uuid = uuidv4();
  const url = process.env.REACT_APP_FIREBASE_FOLLOW;
  const state = store.getState();
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      data: {
        id: uuid,
        username: state.login.username,
        token: state.profile._lat,
        platform: props.platform,
        usernameToFollow: props.usernameToFollow,
        action: props.action
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export default follow;
