import store from "../../store";
const rebloggedBody = props => {
  const gStore = store.getState();
  const state = gStore.newPost;
  const rebloggedPost = state.reblogged_post;
  const rebloggedFooter = [
    `</br>
    <a href="${`https://steemblr.com/post/@${
      store.getState().steemProfile.profile.user
    }/` + props.uuid}">View this post on steemblr</a>
    </br>
    <p>Reblog of a <a href="${`https://steemblr.com/post/@${
      rebloggedPost.author
    }/${rebloggedPost.permlink}`}">post made by ${rebloggedPost.author}</a>.
    Original author is getting 47.5% beneficiary rewards.</p>`
  ];

  const post = props.post.concat(rebloggedFooter);
  //steemblr_body prop doesn't exist in older posts so it checks
  //to support reblogging of older posts
  if (state.reblogged_post.steemblr_body === undefined) {
    return {
      ...state,
      body: state.reblogged_post.body.concat(post)
    };
  } else {
    return {
      ...state,
      body: state.reblogged_post.steemblr_body.concat(post)
    };
  }
};

export default rebloggedBody;
