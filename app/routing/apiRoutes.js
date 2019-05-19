var friends = require('../data/friends.js');
  var express = require("express");
  var path = require("path");
  // Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/home.html'));
});
// Basic route that sends the user first to the AJAX Page
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/survey.html'));
});

app.get('/api/friends', function(req, res){
  res.json(friends);
});

function subtract(arr1, arr2) {
  return arr2.map(function (el, i) {
    return Math.abs(el - arr1[i]);
  });
}
function getSum(total, num) {
  return total + num;
}
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
var diff = []

app.post("/api/friends/", function(req, res) {
  var newFriends = req.body;
  // newFriends.routeName = newFriends.name.replace(/\s+/g, "").toLowerCase();
  // console.log(newFriends);
  // reserveTable.push(newReserve);
  // res.json(newReserve);
  // console.log("new --> "+newFriends.scores[0])
  // console.log("JLO -->"+friends[0].scores[1])
  var totalFriends = friends.length
  for (var i = 0 ; i< totalFriends; i++){
    var diffSub = subtract(friends[i].scores, newFriends.scores)
    diff.push(diffSub.reduce(getSum))
  }
  // console.log("Diff -->"+diff)
  var friendIdx = diff.indexOf(diff.min())
  // console.log("Name -->" +friends[friendIdx].name)
  // console.log("Photo --> "+friends[friendIdx].photo)
    friends.push(newFriends)
  console.log("Result --> "+friends[friendIdx])
  // res.json({
  //             name: friends[friendIdx].name,
  //             photo: friends[friendIdx].photo
  //           })
  res.json(friends[friendIdx])
});




app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
