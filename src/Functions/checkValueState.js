//function is summing post/comment payout value
const checkValueState = props => {
  return props.reduce((a, b) => {
    return Number(a) + Number(b);
  });
};
export default checkValueState;
