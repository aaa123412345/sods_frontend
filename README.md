FYP Project
Project Frontend

Usage:

use two cmd

p.s. 
.env for local test with json server
.env.local test with spring server
remove .env.local to test with json server


1. json-server db.json
//Start the temporary Json Server for RestAPI in local
run in http://localhost:3000/

2.1
npm install
2.2
npm start
//Start the react service
run in http://localhost:3001/


Docker image:
//build images with command in terminal
docker build --tag aaa123412345/react .

//run
docker run --publish 3000:3000 aaa123412345/react
