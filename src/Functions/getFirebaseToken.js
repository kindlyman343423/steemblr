 const getFirebaseToken =  async (props) => {
  
     const call = await fetch(`http://localhost:5000/steady-dryad-163918/us-central1/reciveToken?uuid=${props}`, {
      method: 'GET', 
      headers: {
        Accept: 'application/json'
      },
    }).then(function(response) {
        return response.json()
    })
    localStorage.setItem('cToken', call.token)
    return call.token


  
}

export default getFirebaseToken