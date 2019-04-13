var mysql = require('mysql');
// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'root',
  database: 'users'
});
db.connect();

exports.db = db;
