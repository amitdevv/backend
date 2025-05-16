const express = require("express");

const app = express();

//you have been given a express server which have few endpoints
//your task is to create a global middleware(app.use) which will
//rate limit the requests from the user to only 5 requests per second
//if the user sends more than 5 requests in a single second,the server
//should block them with 404
//user will be sending in their user id in the header as "user-id"
//you have been given a numberOfRequestForUser object to start off with which clear every one second

let numberOfRequestForUser = {};
setInterval(() => {
  numberOfRequestForUser = {};
}, 1000);

//create a global middleware
app.use(function (req, res, next) {
  const userId = req.headers("user-id");
  if (numberOfRequestForUser[userId]) {
    numberOfRequestForUser[req.headers("user-id")] += 1;
  
  if(numberOfRequestForUser[userId]>5){
    res.json(404).send("no entry");
  }
  else{
    next();
  }
}
  else{
    numberOfRequestForUser[userId]=1;
    next();
  }
});
