var express = require('express');
var router = express.Router();
var template = require('../template/subjects_template');
var db = require('../lib/db');

router.get('/create-form', function (req, res, next) {
    var body = template.create_subjects_body();
    var style = template.create_update_subjects_style();
    var html = template.subjects_HTML(body, style);
    res.send(html);
});
router.post('/create-process', function (req, res, next) {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }
        connection.query('INSERT INTO subjects SET ?', req.body, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                res.redirect('/');
            }
        })
    })
});
router.get('/:s_no', function (req, res, next) {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }

        connection.query('SELECT * FROM subjects WHERE s_no != ?; SELECT c_no, c_name FROM contents WHERE s_no = ?', [req.params.s_no, req.params.s_no], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                var subjects = result[0];
                var contents = result[1];
                connection.query('SELECT w_no, w_name, words.c_no, c_name FROM words , contents WHERE words.c_no = contents.c_no AND s_no = ?; SELECT s_name FROM subjects WHERE s_no = ?;', [req.params.s_no, req.params.s_no], (err, result) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var subject = result[1];
                        var i = 0;
                        var contents_words = new Array();
                        while (i < contents.length) {
                            var content = contents[i];
                            var words = result[0].filter(function (item) {
                                return item.c_no == content.c_no;
                            })
                            content.words = words
                            contents_words.push(content);
                            i = i + 1
                        }
                        var body = template.subjects_body(subjects, contents_words, req.params.s_no, subject);
                        var style = template.subjects_style();
                        var html = template.subjects_HTML(body, style);
                        res.send(html);
                       
                    }
                })
            }
        })
    })
})
router.get('/update-form/:s_no', function (req, res, next) {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }
        connection.query('SELECT * FROM subjects WHERE s_no = ?', req.params.s_no, (err, subject) => {
            connection.release();
            if (err) {
                console.log(err);
            }
            else {
                var body = template.update_subjects_body(subject);
                var style = template.create_update_subjects_style();
                var html = template.subjects_HTML(body,style);
                res.send(html);
            }
        })
    })

});
router.post('/update-process/:s_no', function (req, res, next) {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }
        connection.query('UPDATE subjects SET ? WHERE s_no = ?', [req.body, req.params.s_no], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                res.redirect('/');
            }
        })
    })
});
router.post('/delete-process/:s_no', function (req, res, next) {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }
        connection.query('DELETE FROM subjects WHERE s_no = ?', req.params.s_no, (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                res.redirect('/');
            }
        })
    })
});
module.exports = router;