import defaultApp from "../environment";

//Function to save edited theme to database
const saveTheme = props => {
  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(props.user)
    .collection("blog")
    .doc("layout");
  dbRef
    .update(props.layout)
    .then(function() {
      //console.log("Document successfully updated!");
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
};

export default saveTheme;
