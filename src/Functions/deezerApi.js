const deezerApi = async props => {
  console.log(props);
  let bucket = [];
  await fetch(
    "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" +
      props
  ).then(res => {
    bucket = res.json();
  });
  return bucket;
};

export default deezerApi;
