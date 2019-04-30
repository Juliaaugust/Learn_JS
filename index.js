const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const db = require('./model/model.js').db;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000);

app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/lib', express.static('lib'));
app.use('/mode', express.static('mode'));

var info = {curr_level: "1", solved_tasks: "0", publ_articles: "0"};

app.get('/', function (req, res) {
  res.render('main/main');
});

app.get('/info', function (req, res) {
  res.render('main/info');
});

app.get('/article', function (req, res) {
  res.render('articles/article_main');
});

app.get('/article/:num', function (req, res) {
  res.render('articles/article1', {profileID: req.params.id, info: info});
});

app.get('/tests', function (req, res) {
  res.render('tests/test_main');
});

app.get('/profile', function (req, res) {
  res.render('user_profile/profile', {profileID: req.params.id, info: info});
});

app.get('/profile/:id', function (req, res) {
  res.render('user_profile/profile', {profileID: req.params.id, info: info});
});

app.get('/authorization/error', function (req, res) {
  res.render('user_profile/profile_err');
});

app.get('/profile_settings', function (req, res) {
  res.render('user_profile/profile_settings', {profileID: req.params.id, info: info});
});

app.get('/admin', function (req, res) {
  res.render('admin/admin_profile', {profileID: req.params.id, info: info});
});

app.get('/toolbar', function (req, res) {
  res.render('admin/admin_toolbar', {profileID: req.params.id, info: info});
});

app.get('/table_users', function (req, res) {
  res.render('admin/table_users', {profileID: req.params.id, info: info});
});

app.get('/lesson_plans', function (req, res) {
  res.render('admin/lesson_plans', {profileID: req.params.id, info: info});
});

app.get('/task/1', function (req, res) {
  res.render('tasks/task1', {profileID: req.params.id, taskNum: req.params.num});
});

app.get('/task/2', function (req, res) {
  res.render('tasks/task2', {profileID: req.params.id, taskNum: req.params.num});
});

app.get('/lesson', function (req, res) {
  res.render('lessons/lesson_main');
});

app.get('/lesson/:num', function (req, res) {
  res.render('lessons/lesson1', {profileID: req.params.id, lessonNum: req.params.num});
});

app.post('/registration', function (req, res) {

  let user = {
    id_user_role: 1,
    name: req.body.name,
    surname: req.body.surname,
    group: req.body.group,
    email: req.body.email,
    password: req.body.password
  }

  var query = db.query('INSERT INTO user SET ?', user, function(err, result) {
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
  var query = db.query("SELECT * FROM user WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'", function(error, result, fields){
    if (error) throw error;
    if(result.length == 0) { // 0 – запись в БД не найдена
      console.log("Неверный логин или пароль");
      res.redirect('/authorization/error');
    } else {
      console.log(result[0].email);
      console.log(result.length);

      // res.redirect('/profile/' + result[0].id_user);
      res.redirect('/admin');
      // var role = query.id_user_role;
      console.log(result);

    }
  });
});


//////////////////////////////////////////////
// app.post('/authorization', function (req, res) {
//   let user = {
//     email: req.body.email,
//     password: req.body.password
//   }
//   var query = db.query("SELECT * FROM user WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'", function(error, result, fields){
//     if (error) throw error;
//     if(result.length == 0) { // 0 – запись в БД не найдена
//       console.log("Неверный логин или пароль");
//       res.redirect('/authorization/error');
//     } else {
//       console.log(result[0].email);
//       console.log(result.length);
//
//       res.redirect('/profile/' + result[0].id_user);
//     }
//   });
// });


// app.get('/table_users', function (req, res, rows) {
//   console.log("Я в пользователях");
//   res.writeHead(200, {
//     'Content-Type': 'text/html'
//   });
//   res.write("<table><h1>Пользователи</h1>");
//   var strUser = "";
//   var query = db.query("SELECT * FROM user", function(error, result, fields)){
//     if (error) throw error;
//
//     for(var i in rows) {
//       strUser = '<tr><td>' + rows[i].id_user + '</td><td>' + rows[i].name + '</td><td>' + rows[i].surname + '</td></tr>';
//       console.log(strUser);
//       res.write(strUser);
//     }
//     res.write("</table>");
//     res.end();
//   });
// });

// прописать отдельные получения кода (асинхронно отправляется код) POST
// полученую строку с кодом и номер задачи запускать [eval()]

// public: html, js, css, img
// routes: файлы, которые отвечают за подпути (маршрутизация)

// ajax

// model - mod control view
