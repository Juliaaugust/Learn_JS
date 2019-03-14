const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var mysql = require('mysql');
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000);

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'root',
  database: 'users'
});

app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/lib', express.static('lib'));
app.use('/mode', express.static('mode'));

var info = {curr_level: "2", solved_tasks: "5", publ_articles: "0"};

app.get('/', function (req, res) {
  res.render('main/main');
});

app.get('/profile', function (req, res) {

  res.render('profile', {profileID: req.params.id, info: info});
});

app.get('/profile/settings', function (req, res) {
  res.render('profile_settings', {profileID: req.params.id, info: info});
});

app.get('/profile/:id', function (req, res) {
  res.render('profile', {profileID: req.params.id, info: info});
});

app.get('/task/:num', function (req, res) {
  res.render('tasks/task', {profileID: req.params.id, taskNum: req.params.num});
});

app.get('/lesson/:num', function (req, res) {
  res.render('lessons/lesson', {profileID: req.params.id, lessonNum: req.params.num});
});

app.post('/registration', function (req, res) {
  // console.dir(req.body);
  // let data = {
  //   name: req.body.name,
  //   surname: req.body.surname,
  //   info: {
  //     level: 1
  //   }
  // };

  // let name = req.body.name;
  // let surname = req.body.surname;
  // let group = req.body.group;
  // let email = req.body.email;
  // let password = req.body.password;

  let user = {
    name: req.body.name,
    surname: req.body.surname,
    group: req.body.group,
    email: req.body.email,
    password: req.body.password
  }

  var query = db.query('INSERT INTO users SET ?', user, function(err, result) {
    console.log(err);
    console.log(result);
  });

  res.redirect('/profile') ;
});

// прописать отдельные получения кода (асинхронно отправляется код) POST
// полученую строку с кодом и номер задачи запускать [eval()]

// public: html, js, css, img
// routes: файлы, которые отвечают за подпути (маршрутизация)

// ajax
