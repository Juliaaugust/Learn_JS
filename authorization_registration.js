// const express = require("express");
// const app = express();
// const bodyParser = require('body-parser');
//
// const db = require('./model/model.js').db;
//
// app.post('/registration', function (req, res) {
//
//   let user = {
//     id_user_role: 1,
//     name: req.body.name,
//     surname: req.body.surname,
//     group: req.body.group,
//     email: req.body.email,
//     password: req.body.password
//   }
//
//   var query = db.query('INSERT INTO user SET ?', user, function(err, result) {
//     console.log(err);
//     console.log(result);
//     res.redirect('/profile/' + result.insertId);
//   });
// });
//
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
//       // res.redirect('/profile/' + result[0].id_user);
//       res.redirect('/admin');
//       // var role = query.id_user_role;
//       console.log(result);
//
//     }
//   });
// });
