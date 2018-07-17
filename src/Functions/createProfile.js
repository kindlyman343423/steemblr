import defaultApp from "../environmentDev";
import store from "../store";
const createProfile = props => {
  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(props);
  //checking if profile exist
  dbRef.get().then(doc => {
    if (doc.exists) {
      //TODO: load settings into redux store
    } else {
      //profile doesn't exist so functions creates it with initial settings
      const json =
        store.getState().steemProfile.profile.account.json_metadata !==
        undefined
          ? JSON.parse(
              store.getState().steemProfile.profile.account.json_metadata
            ).profile
          : void 0;
      const blog = {
        author: props,
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

      const batch = defaultApp.firestore().batch();
      batch.set(dbRef, { isNSFWAllowed: false });
      batch.set(dbRef.collection("blog").doc("layout"), blog);
      batch.commit().then(function() {
        return void 0;
      });
    }
  });
  return void 0;
};

export default createProfile;
