const express = require("express");

const app = express();

//function that returns a boolean if the age of the person is more than 14
function isOldEnough(age) {
  if (age >= 14) {
    return true;
  } else {
    return false;
  }
}

app.get("/ride1", isOldEnoughMiddleware,function (req, res) {
  res.json({
    msg: "you have succesfully riden the ride 1",
  });
});

app.get("/ride2",isOldEnoughMiddleware, function (req, res) {
  res.json({
    msg: "you have succesfully riden the ride 2",
  });
});

//now let's see what change if we want to do same thing via middleware
function isOldEnoughMiddleware(req, res, next) {
  const age=req.query.age;
  if (age >= 14) {
    next();
  } else {
    res.json({
      msg: "sorry you are not of age yet",
    });
  }
}

app.listen(3000);
