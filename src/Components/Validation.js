import React from 'react'
import steem from 'steem'

const Validation = async (props) => {
  //Checking if private key is valid
  if(await steem.auth.isWif(props.wif)) {
    //Generating public key to check if username is valid
    
    const getAccountsAsync = await steem.api.getAccountsAsync([props.name])
    const pubWifFromName = await getAccountsAsync[0].posting.key_auths[0][0]
    
    const pubWif = await steem.auth.wifToPublic(props.wif)

    //Checking if Private Key suits Public Key from Username
    
    const checkLogin = await steem.auth.wifIsValid(props.wif, pubWifFromName)
    return checkLogin
  }

 
  
  //steem.utils.validateAccountName('snwolak');

  //check for Public Key by username
  
  
}

export default Validation