var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/main/index.html");
});

app.get('/profile/:id', function (req, res) {
  var info = {curr_level: "2", solved_tasks: "5", publ_articles: "0"};
  res.render('profile', {profileID: req.params.id, info: info});
});
