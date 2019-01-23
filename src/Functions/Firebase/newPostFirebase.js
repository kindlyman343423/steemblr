import uuidv4 from "uuid/v4";
import store from "../../store";
import postToDb from "./postToDb";
import tagsNSFWCheck from "../tagsNSFWCheck";
import makePost from "../makePost";
import { newPostIsError } from "../../actions/newPostInterface";
const newPost = async () => {
  //this functions handle making and sending non-blockchain posts

  const post = makePost();
  const storeState = store.getState();
  const isEditing = storeState.newPostInterface.editingExistingPost;
  const uniqueTagsForDB = [...new Set(storeState.newPost.tags)];
  let uniqueTags = [...new Set(storeState.newPost.tags)];
  uniqueTags.includes("steemblr") ? void 0 : uniqueTags.push("steemblr");
  const uuid = isEditing ? storeState.newPost.permlink : uuidv4();
  store.dispatch(newPostIsError(false));
  postToDb(
    storeState.steemProfile.profile.user,
    uuid,
    tagsNSFWCheck(uniqueTags),
    storeState.newPost.type,
    uniqueTagsForDB,
    post.body
  );
};

export default newPost;
