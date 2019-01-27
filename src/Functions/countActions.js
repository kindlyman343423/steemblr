const countActions = props => {
  const { comments, upvotes, rebloggs } = props;
  const arr = [comments.length, upvotes.length, rebloggs.length];
  return arr.reduce((a, b) => a + b);
};

export default countActions;
