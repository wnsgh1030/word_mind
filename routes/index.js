var express = require('express');
var router = express.Router();
var template = require('../template/home_template')
var db = require('../lib/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  db.getConnection((err, connection) => {
    if(err){
      console.log(err);
    }
    connection.query("SELECT * FROM subjects", (err,result) => {
      connection.release();
      if (err){
        console.log(err);
      }
      else{
        const body = template.home_body(result);
        res.send(template.home_HTML(body));
      }
    })
  })
});

module.exports = router;
