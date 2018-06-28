export default function(props) {
  const arr = props.map(item => {
    return item.toLowerCase();
  });
  //When someone won't enter tags it will become safe for work automaticly
  if (arr.length === 0 || arr.length === undefined) {
    return false;
  }

  const filter = ["nsfw", "porn"];
  const joinedArr = arr.concat(filter);
  const deleteDuplicates = [...new Set(joinedArr)];
  //user tags are joined with filter tags if there are gonna be duplicates that means
  //post is not safe for work
  if (deleteDuplicates.length === joinedArr.length) {
    return false;
  } else {
    return true;
  }
}
