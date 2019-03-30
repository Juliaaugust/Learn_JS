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

var info = {curr_level: "1", solved_tasks: "0", publ_articles: "0"};

app.get('/', function (req, res) {
  res.render('main/main');
});

app.get('/profile', function (req, res) {
  res.render('profile', {profileID: req.params.id, info: info});
});

app.get('/profile/:id', function (req, res) {
  res.render('profile', {profileID: req.params.id, info: info});
});

app.get('/authorization/error', function (req, res) {
  res.render('profile_err');
});

app.get('/profile/settings', function (req, res) {
  res.render('profile_settings', {profileID: req.params.id, info: info});
});

app.get('/admin', function (req, res) {
  res.render('admin/admin_profile', {profileID: req.params.id, info: info});
});

app.get('/task/:num', function (req, res) {
  res.render('tasks/task2', {profileID: req.params.id, taskNum: req.params.num});
});

app.get('/lesson/:num', function (req, res) {
  res.render('lessons/lesson', {profileID: req.params.id, lessonNum: req.params.num});
});

app.post('/registration', function (req, res) {

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
    res.redirect('/profile/' + result.insertId);
  });
});

app.post('/authorization', function (req, res) {

  let user = {
    email: req.body.email,
    password: req.body.password
  }

  var query = db.query("SELECT * FROM users WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'", function(error, result, fields){
    if (error) throw error;
    if(result.length == 0) { // 0 – запись в БД не найдена
      console.log("Неверный логин или пароль");
      res.redirect('/authorization/error');
    } else {
      console.log(result[0].email);
      console.log(result.length);

      res.redirect('/profile/' + result[0].id_user);
    }
  });
});

// прописать отдельные получения кода (асинхронно отправляется код) POST
// полученую строку с кодом и номер задачи запускать [eval()]

// public: html, js, css, img
// routes: файлы, которые отвечают за подпути (маршрутизация)

// ajax
