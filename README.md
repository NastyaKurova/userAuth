# userAuth
It is a full stack auth project written with TypeScript React MobX graphQL Nodejs Express sqlite3

to start the project run server and client:
* install dependencies for client and server `yarn install`
* to start server use command `npm run server`
* to start client use command `npm run start` 

App has 4 pages:
* Main page `/` shows links to Login and Register pages
* Register page `/register` creates user and navigates to User page
* Login page `/login` logins user and navigates to User page
* User page `/user` shows user data : login, create date, last login date. Dates are in UTC
Page is available for logged in users only

System uses token to auth user. There is a log out button on main page 



