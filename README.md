FYP Project
Project Frontend

Usage:

use two cmd

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
