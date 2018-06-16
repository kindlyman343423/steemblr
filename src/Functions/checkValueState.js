//function to determine which value to show
const checkValueState = props => {
  const now = Date.now();
  const week = 604800000;
  const date = Date.parse(props); //when post was created
  if (now - date > week) {
    return true; //this.props.post.total_payout_value;
  } else {
    return false;
  }
};
export default checkValueState;
