const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const JWT_SECRET = "amitilovecoding123";
//we need this middleware for req.body
app.use(express.json());

const users = [];

app.post("/signup", function (req, res) {
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

app.post("/signin", function (req, res) {
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

app.get("/me", function (req, res) {
  //this give user their own information->'/courses' etc
  const token=req.headers.token;

  const decodedData=jwt.verify(token,JWT_SECRET);
  if(decodedData.username){
     let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username ==decodedData.username) {
      foundUser = users[i];
    }
  }
  res.json({
    username:foundUser.username,
    password:foundUser.password
  })
  }

});

app.listen(3000);