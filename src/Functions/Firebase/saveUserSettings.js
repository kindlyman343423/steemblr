import store from "../../store";
//sending saved settings to API
const saveUserSettings = async props => {
  const login = store.getState().login;
  const url = process.env.REACT_APP_FIREBASE_SAVE_USER_SETTINGS;
  const settings = store.getState().userSettings;
  const { username, token } = login;
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      data: {
        username,
        token,
        payload: { ...settings }
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default saveUserSettings;
