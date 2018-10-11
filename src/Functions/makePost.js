import store from "../store";

const makePost = () => {
  const state = store.getState().newPost;
  if (state.type === "text") {
    return state;
  } else if (state.type === "photos" || state.type === "gifs") {
    const img = `![](${state.photo})`;
    return {
      type: state.type,
      body: img.concat(state.body),
      tags: state.tags,
      title: state.title
    };
  } else if (state.type === "video") {
    return {
      type: state.type,
      body: state.video.concat(state.body),
      tags: state.tags,
      title: state.title
    };
  } else if (state.type === "audio") {
    return {
      type: state.type,
      body: state.audio.concat(state.body),
      tags: state.tags,
      title: state.title
    };
  } else if (state.type === "quote") {
    return {
      type: state.type,
      body: state.quote.concat(state.quoteSource),
      tags: state.tags,
      title: state.title
    };
  }
};
export default makePost;
