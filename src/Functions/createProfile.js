import defaultApp from "../environmentDev";
import store from "../store";
import getFirebaseToken from "./getFirebaseToken";
import firebaseAuth from "./firebaseAuth";
import delay from "./delay";
const createProfile = async props => {
  if (localStorage.getItem("cToken") === null) {
    await getFirebaseToken(props);
    firebaseAuth();
    await delay(1000);
    createProfile(store.getState().steemProfile.profile._id);
  } else {
    if (props === undefined) {
      await delay(500);
      createProfile(store.getState().steemProfile.profile._id);
    }
    firebaseAuth();
    const dbRef = defaultApp
      .firestore()
      .collection("users")
      .doc(props);
    //checking if profile exist
    const isDoc = await dbRef
      .collection("blog")
      .doc("layout")
      .get()
      .then(doc => {
        return doc.exists;
      })
      .then(value => {
        return value;
      });

    if (isDoc === false) {
      //profile doesn't exist so functions creates it with initial settings
      const json =
        store.getState().steemProfile.profile.account.json_metadata !==
        undefined
          ? JSON.parse(
              store.getState().steemProfile.profile.account.json_metadata
            ).profile
          : void 0;
      dbRef
        .set({ isNSFWAllowed: false })
        .then(function() {})
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
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

      dbRef
        .collection("blog")
        .doc("layout")
        .set(blog)
        .then(function() {})
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};

export default createProfile;
