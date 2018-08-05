import defaultApp from "../environment";
import { GET_SINGLE_POST } from "./types";

const getSinglePost = props => async dispatch => {
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .doc(props);

  await dbRef
    .get()
    .then(doc => {
      if (doc.exists) {
        dispatch({
          type: GET_SINGLE_POST,
          payload: [doc.data()]
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
export default getSinglePost;
