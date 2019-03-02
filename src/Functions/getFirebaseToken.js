const getFirebaseToken = async props => {
  const url = process.env.REACT_APP_FIREBASE_TOKEN_URL;
  const call = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      data: {
        uuid: props
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response) {
    return response.json();
  });
  localStorage.setItem("googleToken", call.result.token);
  return call.result.token;
};

export default getFirebaseToken;
