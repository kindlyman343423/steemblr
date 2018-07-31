const getFirebaseToken = async props => {
  const call = await fetch(
    `${process.env.REACT_APP_FIREBASE_TOKEN_URL}${props}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }
  ).then(function(response) {
    return response.json();
  });
  localStorage.setItem("cToken", call.token);
  return call.token;
};

export default getFirebaseToken;
