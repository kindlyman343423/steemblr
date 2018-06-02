const deezerApi = async props => {
  let bucket = [];
  await fetch(
    "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?index=0&limit=7?&q=" +
      props
  ).then(res => {
    bucket = res.json();
  });
  return bucket;
};

export default deezerApi;
