var express = require('express');
var router = express.Router();
var template = require('../template/map_template');
var db = require('../lib/db');

router.get('/:s_no', function (req, res, next) {
    db.getConnection((err, conncetion) => {
        if (err) {
            console.log(err);
        }
        conncetion.query('SELECT s_name FROM subjects WHERE s_no = ?; SELECT c_no, c_name FROM contents WHERE s_no = ?', [req.params.s_no, req.params.s_no], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                var subject = result[0];
                var contents = result[1];
                conncetion.query('SELECT w_no, w_name, words.c_no FROM words , contents WHERE words.c_no = contents.c_no AND s_no = ?', req.params.s_no, (err, words) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var i = 0;
                        var wordlist = [];
                        while (i < words.length) {
                            wordlist.push(words[i].w_no);
                            i = i + 1;
                        }
                        if(!wordlist.length){
                            var body = template.map_body(subject, contents, words, []);
                            var html = template.map_HTML(body);
                            res.send(html);
                        }
                        else{
                            conncetion.query('SELECT * FROM relationship WHERE w1_no IN (?) OR w2_no IN (?)', [wordlist, wordlist], (err, relationship) => {
                                conncetion.release();
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    var body = template.map_body(subject, contents, words, relationship);
                                    var html = template.map_HTML(body);
                                    res.send(html);
                                }
                            })
                        }   
                    }
                })
            }
        })
    })
});
module.exports = router;