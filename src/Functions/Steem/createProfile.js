import store from "../../store";

const createProfile = async props => {
  //Function to send api call to create profile for steem users
  //it needs token for verification
  const url = process.env.REACT_APP_FIREBASE_CREATE_PROFILE_STEEM;
  const json =
    store.getState().steemProfile.profile.account.json_metadata !== undefined
      ? JSON.parse(store.getState().steemProfile.profile.account.json_metadata)
          .profile
      : void 0;
  const blog = {
    author: props.steemAccount,
    about: json === undefined || json.about === undefined ? "" : json.about,
    avatar_shape: "circle",
    background_color: { r: 225, g: 226, b: 225, a: 1 },
    cover_image:
      json === undefined || json.cover_image === undefined
        ? ""
        : json.cover_image,
    layout: "default",
    name: json === undefined || json.name === undefined ? "" : json.name,
    show_avatar: true,
    show_description: true,
    show_header_image: true,
    show_title: true,
    title_color: {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    },
    title_font: {
      family: "Roboto",
      category: "sans-serif",
      url:
        "https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmSU5fBBc4.woff2"
    }
  };
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      token: props.token,
      steemAccount: props.steemAccount,
      blog: blog,
      uid: props.uid
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default createProfile;
