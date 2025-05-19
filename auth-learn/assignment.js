//can you try creating a middleware called auth that verifies if a user is logged in and ends the request early if the user isn't logged in?

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const JWT_SECRET = "amitilovecoding123";
//we need this middleware for req.body
app.use(express.json());

const users = [];

function logger(req,res,next){
  console.log(req.method +"request came");
  next();
}

app.post("/signup", logger,function (req, res) {
  //we get username and password->we push it to global array or database
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username,
    password,
  });

  //we should check that user with this username already exist or not
  res.json({
    message: "you are signed up",
  });
});

app.post("/signin", logger,function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      foundUser = users[i];
    }
  }
  if (!foundUser) {
    res.json({
      message: "credentials incorrect",
    });
  } else {
    //what token want to return
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  }
});

//Purpose: Protects routes by verifying user authentication
//Middlewares can add data to req (like req.username)
//Next Function: Critical for passing control to the next middleware
function auth(req,res,next){
  const token=req.headers.token;
  const decodedData=jwt.verify(token,JWT_SECRET)
  if(decodedData.username){
    req.username=decodedData.username;
    next();
  }
  else{
    res.json({
      message:"you are not logged in"
    })
  }
}

//first logger then auth and if auth fail then route handler never executes
app.get("/me",logger,auth, function (req, res) {
  
     let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username ==req.username) {
      foundUser = users[i];
    }
  }
  res.json({
    username:foundUser.username,
    password:foundUser.password
  })

});

app.get("/todo",auth,function(req,res){

})

app.post("/todo",auth,function(req,res){

})

app.delete("/todo",auth,function(req,res){

})

app.listen(3000);