/**
 * @author Sourabh Kanwade
 * @email sourabhkanwade10@gmail.com
 * @create date 2021-09-07
 * @modify date 2021-09-07 
 * @desc Main server file provides endpoints for CRUD operation on student table
 */
const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
// database connection
const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Shiv@123',
    database:'student_managment_system'
});

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + req.body.first_name.replace(' ', '_') + path.extname(file.originalname));
    },
});

let upload = multer({ storage: storage });
app.set('port', process.env.PORT || 3000);
// get all students
app.get('/api/students', (req, res) => {
    const { limit, offset, total } = req.query;
    let queryString;
    if (limit && offset) {
        queryString = `SELECT * FROM students WHERE status='active' LIMIT ${offset} , ${limit}`;
    } else if (total) {
        queryString = 'SELECT count(1) as totalStudents FROM students';
    } else {
        queryString = "SELECT * FROM students WHERE status='active'";
    }
    db.query(queryString, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
});
// get student by id
app.get('/api/students/:studentId', (req, res) => {
    db.query('SELECT * FROM students WHERE studentId=?', [req.params.studentId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results[0]);
    });
});
// add a student
app.post('/api/students', upload.single('picture'), (req, res) => {
    delete req.body.picture;
    req.body['picture'] = 'http://localhost:3000/uploads/' + req.file.filename;

    db.query('INSERT INTO students set ?', req.body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ message: 'Successfully Added Student. ', studentId: results.insertId });
    });
});
// update student id
app.patch('/api/students/:studentId', upload.single('picture'), (req, res) => {
    delete req.body.picture;
    if (req.file != undefined) {
        req.body['picture'] = 'http://localhost:3000/uploads/' + req.file.filename;
    }
    db.query('UPDATE students set ? WHERE studentId=?', [req.body, req.params.studentId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Successfully Updated Student. ', studentId: req.params.studentId });
    });
});
// Deactivate student with id
app.delete('/api/students/:studentId', (req, res) => {
    db.query("UPDATE students SET status='in-active' WHERE studentId=?", req.params.studentId, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Successfully Deactivated Student. ', studentId: req.params.studentId });
    });
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port') + '\nhttp://localhost:' + app.get('port'));
});
