var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '951030',
  database: 'mindmap',
  multipleStatements: true
});
module.exports = pool;