# STEEMBLR
[https://steemblr.com](https://steemblr.com)

Open source social media app based on steem blockchain.
Read more [here](https://steemit.com/utopian-io/@snwolak/introducing-steemblr-a-blockchain-alternative-for-tumblr)
![website.png](https://firebasestorage.googleapis.com/v0/b/steemblr.appspot.com/o/development%2Fproduct_image_steemblr_fdc1b80f7639b8d47fa941cea919c946683b3d292723ea8ddddd9f2a6adbd25a_opti.jpg?alt=media&token=2fb1525f-b6c7-400a-915a-959c5363429b)



### Setup
```
first setup and run api from this repo https://github.com/snwolak/steemblr_api
git clone https://github.com/snwolak/steemblr.git
cd steemblr
create .env files
yarn
yarn start
```
#### Env files

Create .env.development.local in root folder and enter necessary variables

```
NODE_PATH = src/
REACT_APP_LOGIN_URL = http://localhost:3000/redirect 
REACT_APP_FIREBASE_TOKEN_URL = 
REACT_APP_GOOGLE_FONTS_API = 
REACT_APP_FIREBASE_API = 
REACT_APP_FIREBASE_AUTH_DOMAIN = 
REACT_APP_FIREBASE_DATABASE_URL = 
REACT_APP_FIREBASE_PROJECT_ID = 
REACT_APP_FIREBASE_STORAGE_BUCKET = 
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 
REACT_APP_FIREBASE_CREATE_PROFILE = ENTER FIREBASE FUNCTION ADRESS HERE
REACT_APP_FIREBASE_CREATE_PROFILE_STEEM =
REACT_APP_FIREBASE_EDIT_THEME =
REACT_APP_FIREBASE_SEND_COMMENT =
REACT_APP_FIREBASE_UPVOTE_POST = 
REACT_APP_FIREBASE_FOLLOW = 
REACT_APP_FIREBASE_UPVOTE_STEEM_POST
```

### Contribution

If you want to contribute get in touch on my discord channel [https://discord.gg/hHmZgk6](https://discord.gg/hHmZgk6).

### License

MIT License Copyright (c) 2018-present, Szymon Wolak
