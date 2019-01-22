const createProfile = async props => {
  //Function to send api call to create profile
  //it needs token for verification
  const url = process.env.REACT_APP_FIREBASE_CREATE_PROFILE;
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      token: props.token,
      displayName: props.displayName,
      email: props.email,
      uid: props.uid
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default createProfile;
