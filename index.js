var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");


app.listen(3000);

app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/lib', express.static('lib'));
app.use('/mode', express.static('mode'));

var info = {curr_level: "2", solved_tasks: "5", publ_articles: "0"};

app.get('/', function (req, res) {
  res.render('main');
});

app.get('/profile', function (req, res) {
  res.render('profile', {profileID: req.params.id, info: info});
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

// прописать отдельные получения кода (асинхронно отправляется код) POST
// полученую строку с кодом и номер задачи запускать [eval()]

// public: html, js, css, img
// routes: файлы, которые отвечают за подпути (маршрутизация)

// ajax
