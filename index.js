//creating an HTTP server 
//express
//node default library=No->npm install express

const express=require("express");
//so now we will create our hospital
const app=express();
//doctor taking a room where all works will be
app.listen(3000);
//so if we do node index.js after above line then we get "Cannot GET/" in browser localhost:3000 port
//so now we need to implement functionlity of doctor

function sum(n){
  let ans=0;
  for(let i=1;i<=n;i++){
    ans=ans+i;
  }
  return ans;
}

//so this "/" is a port address that say that come here like "localhost:3000/" 
app.get("/",function(req,res){
  // res.send("Hi there")  any request come send them "hi there" message
  const n=req.query.n; //we get input
  const ans=sum(n);
  res.send("Hi your ans is:"+ ans);
})