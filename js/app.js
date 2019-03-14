const express = require('express');
var mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'root',
  database: 'users'
});
// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

db.query('SELECT * FROM users', function(error, result, fields){
    console.log(result);
});



// connection.connect();
//
// var query = connection.query();
// connection.end();

// connect tot mysql database
// connectToDB = function () {
//   connection = mysql.createConnection(mysqlConfig);
//   connection.connect(function(err){
//
//   });
// }

console.log("App is runing...");
