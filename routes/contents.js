const express = require('express');
const router = express.Router();
const template = require('../template/contents_template');
const db = require('../lib/db');

router.get('/create-form', function (req, res, next) {
    db.getConnection((err, connection) => {
        if(err){
            console.log(err);
        }
        connection.query('SELECT s_no, s_name FROM subjects WHERE s_no = ?', req.query.s_no, (err,subject) => {
            connection.release();
            if(err){
                console.log(err);
            }
            else{
                const body = template.create_contents_body(subject);
                const html = template.contents_HTML(body);
                res.send(html);
            }
        })
    })    
});

router.post('/create-process', function (req, res, next) {
    db.getConnection((err, connection) => {
        if(err){
            console.log(err);
        }
        connection.query('INSERT INTO contents SET ?', req.body, (err, result) => {
            connection.release();
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                res.redirect(`/subjects/${req.body.s_no}`);
            }
        })
    })
});

router.get('/update-form', function (req, res, next) {
    db.getConnection((err, connection) => {
        if(err){
            console.log(err);
        }
        connection.query('SELECT c_no, c_name, contents.s_no, s_name FROM contents JOIN subjects ON contents.s_no = subjects.s_no WHERE c_no = ?', req.query.c_no, (err, content) => {
            connection.release();
            if(err){
                console.log(err);
            }
            else{
                const body = template.update_contents_body(content);
                const html = template.contents_HTML(body);
                res.send(html);
            }
        })
    })    
});
router.post('/update-process', function (req, res, next) {
    db.getConnection((err, connection) => {
        if(err){
            console.log(err);
        }
        connection.query('UPDATE contents SET ? WHERE c_no = ?', [req.body, req.body.c_no], (err, result) => {
            connection.release();
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                res.redirect(`/subjects/${req.body.s_no}`);
            }
        })
    })
});
router.post('/delete-process', function (req, res, next) {
    db.getConnection((err, connection) => {
        if(err){
            console.log(err);
        }
        connection.query('DELETE FROM contents WHERE c_no = ?', [req.body.c_no], (err, result) => {
            connection.release();
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                res.redirect(`/subjects/${req.body.s_no}`);
            }
        })
    })
});
module.exports = router;