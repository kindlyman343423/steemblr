const createProfile = async props => {
  //Function to send api call to create profile
  //it needs token for verification
  const url = "http://localhost:5000/steemblr/us-central1/createProfile";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      token: props._lat,
      displayName: props.displayName,
      email: props.email
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default createProfile;
