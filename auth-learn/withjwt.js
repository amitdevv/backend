const express=require("express");
const jwt=require("jsonwebtoken");

const JWT_SECRET="ramdomlovekitaita"

const app=express();
app.use(express.json());

const users=[];




app.post("/signup",function(req,res){
  // User ke frontend (form ya request) se bheje gaye data ko backend mein receive karne ke liye hum yeh line likhte hain.then we store this in database or check that username true or false.

  const username=req.body.username;
  const password=req.body.password;

  users.push({
    username:username,
    password:password
  })

  res.json({
    message:"you are signed up"
  })
})


app.post("/signin",function(req,res){
  const username=req.body.username;
  const password=req.body.password;

  let foundUser=null;

  for(let i=0;i<users.length;i++){
    if(users[i].username==username && users[i].password==password){
      foundUser=users[i]
    }
  }


  if(foundUser){
    const token=jwt.sign({
      username:username
    },JWT_SECRET); //convert username to a jwt
    // foundUser.token=token; //so now i not need to store this into memory
    res.json({
      message:token
    })
  }
  else{
    res.status(403).send({
      message:"invalid username or password"
    })
  }



})

app.get("/me",function(req,res){
  const token=req.headers.token  //jwt
  const decodeInformation=jwt.verify(token,JWT_SECRET); //so this line converting jwt->username
const username=decodeInformation.username
  let foundUser=null;

  for(let i=0;i<users.length;i++){
    if(users[i].username==username){
       foundUser=users[i]
    }
  }
  if(foundUser){
    res.json({
      username:foundUser.username,
      password:foundUser.password
    })
  }
  else{
    res.json({
      message:"token invalid"
    })
  }
})

app.listen(3000);