import getAvatar from "./Firebase/getAvatar";

//Getting avatar url accordingly to user platform
const getAvatarURL = async (platform, author) => {
  if (platform === "steem") {
    return `https://steemitimages.com/u/${author}/avatar`;
  } else if (platform === "email") {
    const url = await getAvatar(author);

    return url;
  }
};

export default getAvatarURL;
