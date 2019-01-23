import store from "../store";
//Function to save edited theme to database
const saveTheme = props => {
  //Calling Firebase functions to save the data
  //Needs username, token and platform for verification
  const userData = store.getState();
  const url = process.env.REACT_APP_FIREBASE_EDIT_THEME;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      data: {
        username: userData.login.username,
        token: userData.login.token,
        uid: userData.profile.uid,
        layout: props.layout,
        platform: userData.login.platform
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
};

export default saveTheme;
