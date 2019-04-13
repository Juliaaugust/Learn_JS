// const express = require("express");
// const app = express();
// const bodyParser = require('body-parser');
// var mysql = require('mysql');
//
// var name;
//
// app.use(bodyParser.urlencoded({extended: false}));
//
// app.listen(3000);
//
// // Create connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'me',
//   password: 'root',
//   database: 'users'
// });
//
// function router(req, res) {
//     getConncetion().query('SELECT * FROM user', function (error, fields, result) {
//         if (error) {
//             throw error;
//         }
//         console.log(fields[0]['name']);
//         name = fields[0]['name'];
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end(JSON.stringify(fields));
//     });
// };
