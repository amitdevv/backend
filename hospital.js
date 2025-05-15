const express = require("express");
const app = express();

const users = [
  {
    name: "john",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

//extra line of code understand after
app.use(express.json());

//queryparameter use for 'get' request
//now let's write code of checking info about kidney of john
app.get("/", function (req, res) {
  //write logic
  const johnkidneys = users[0].kidneys;
  // console.log(johnkidneys);
  const numOfkidneys = johnkidneys.length;

  //we can do below task using FILTER also
  let numofhealthykideneys = 0;
  for (i = 0; i < johnkidneys.length; i++) {
    if (johnkidneys[i].healthy) {
      numofhealthykideneys = numofhealthykideneys + 1;
    }
  }
  const numofUnhealthykideneys = numOfkidneys - numofhealthykideneys;
  res.json({
    numOfkidneys,
    numofhealthykideneys,
    numofUnhealthykideneys,
  });
});

app.post("/", function (req, res) {
  const ishealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: ishealthy,
  });

  res.json({
    msg: "done!",
  });
});

app.put("/", function (req, res) {
  for (let i = 0; i <= users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
    res.json({
      msg: "all kidneys are healthy now",
    });
  }
});

//removing all the unhealthy kidneys
app.delete("/", function (req, res) {
  //you should reuturn a 411
  //only if atleast one unhealthy kidney is there do this,else return 411
if(isThereAtleastOneUnhealthyKidney()){
  const newKidneys = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy) {
      newKidneys.push({
        healthy: true,
      });
    }
  }
  users[0].kidneys = newKidneys;
  res.json({ msg: "done" });
}
else{
  res.status(411).json({
    msg:"you have no bad kidneys"
  });
}
});

function isThereAtleastOneUnhealthyKidney(){
  let alteastOneUnHealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      alteastOneUnHealthyKidney = true;
    }
  }
  return alteastOneUnHealthyKidney;
}

app.listen(3000);
