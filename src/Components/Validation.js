import steem from 'steem'

const Validation = async (props) => {
  //Checking if private key is valid
  if(await steem.auth.isWif(props.wif)) {
    //Generating public key to check if username is valid
    const getAccountsAsync = await steem.api.getAccountsAsync([props.name])
    if(getAccountsAsync.length === 0) {
      return false
    } else {
      const pubWifFromName = await getAccountsAsync[0].posting.key_auths[0][0]
      const checkLogin = await steem.auth.wifIsValid(props.wif, pubWifFromName)
      return checkLogin
    }
    //Checking if Private Key suits Public Key from Username
  }
  
  
}

export default Validation