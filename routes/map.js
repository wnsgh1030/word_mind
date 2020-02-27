const express = require('express');
const router = express.Router();
const template = require('../template/map_template');
const db = require('../lib/db');

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
                const subject = result[0];
                const contents = result[1];
                conncetion.query('SELECT w_no, w_name, words.c_no FROM words , contents WHERE words.c_no = contents.c_no AND s_no = ?', req.params.s_no, (err, words) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        let i = 0;
                        let wordlist = [];
                        while (i < words.length) {
                            wordlist.push(words[i].w_no);
                            i = i + 1;
                        }
                        if(!wordlist.length){
                            const body = template.map_body(subject, contents, words, []);
                            const html = template.map_HTML(body);
                            res.send(html);
                        }
                        else{
                            conncetion.query('SELECT * FROM relationship WHERE w1_no IN (?) OR w2_no IN (?)', [wordlist, wordlist], (err, relationship) => {
                                conncetion.release();
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    const body = template.map_body(subject, contents, words, relationship);
                                    const html = template.map_HTML(body);
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