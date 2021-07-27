// require
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const path = require('path');

const connect = require('/schemas');

const passport = require('passport');

// DB

//const MongoClient = require('mongodb').MongoClient;

dotenv.config();
const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public'))); // app.use('**request dir', express.static(**'dir')); At this code, static file is existed in pulic folder
app.use(express.json());
app.use(express.urlencoded({extended: false})); // it can read JSON and URL-encoded
app.use(cookieParser(process.env.COOKIE_SECRET)); // it can traslate cookies
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));
app.use(passport.initialize());
app.use(passport.session());

const multer = require('multer');
const fs = require('fs');
// End today work

var db;
MongoClient.connect('mongodb+srv://test:jiwon123@cluster0.nzucs.mongodb.net/todoapp?retryWrites=true&w=majority', function(error, client) {
    if (error) {
        return console.log(error);
    } else {
        db = client.db('todoapp');
    }   
});


app.get('/', (req, res, next) => {
    res.send('공사중');
    next();
}, (req, res) => {
    throw new Error('에러처리 미들웨어로 이동')
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
});