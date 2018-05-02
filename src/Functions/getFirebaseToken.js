const getFirebaseToken = async props => {
  const call = await fetch(
    `http://localhost:5000/steemblr/us-central1/reciveToken?uuid=${props}`, //`https://us-central1-steemblr.cloudfunctions.net/reciveToken?uuid=${props}`,
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
