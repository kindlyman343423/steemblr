import steem from 'steem'

const getContentReplies = async (author, permlink) => {

  let bucket = []
  await steem.api.getContentRepliesAsync(author, permlink).then((result) => {
    bucket.push(result)
    return result
  }).catch(function(error) {
      console.log(error)
  })
 
  return bucket
  
}

export default getContentReplies