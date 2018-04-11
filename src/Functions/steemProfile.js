import api from '.././Api'

const steemProfile = async () => {
  const profile = await api.me(function (err, res) {
    if (err !== null) {
      return err
    } else {
      return res
    }
  })
  return profile
}

export default steemProfile