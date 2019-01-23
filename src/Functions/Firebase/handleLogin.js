import store from "../../store";
import { changeLoginStatus, getLoggedProfile } from "actions/stateActions";
import getUserSettings from "actions/getUserSettings";
const handleLogin = async props => {
  store.dispatch(
    changeLoginStatus({
      status: false,
      platform: "email",
      username: props.displayName,
      token: props._lat
    })
  );
  store.dispatch(getLoggedProfile(props));
  store.dispatch(getUserSettings());
  store.dispatch(changeLoginStatus({ status: true, platform: "email" }));
};

export default handleLogin;
