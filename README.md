# Group Project 3

### Front-End NPM packages - need to be installed in the 'client' folder:

* npm init -y
* npm i axios
* npm i classnames
* npm i jwt-decode
* npm i moment
* npm i react
* npm i react-dom
* npm i react-moment
* npm i react-redux
* npm i react-router-dom
* npm i react-scripts
* npm i redux
* npm i redux-thunk

#### You will also need to insert the following line in your client folder's package.json file (can be placed anywhere):

"proxy": "http://localhost:5000"

### Back-End NPM packages - need to be installed in the main/root folder:

* npm init -y
* npm i bcryptjs
* npm i body-parser
* npm i concurrently
* npm i express
* npm i gravatar
* npm i jsonwebtoken
* npm i mongoose
* npm i passport
* npm i passport-jwt
* npm i validator

#### Under scripts you will need to add the following lines:

* "client-install": "npm install --prefix client"
* "client": "npm start --prefix client"
* "dev": "concurrently \"npm run server\" \"npm run client\""






