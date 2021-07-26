const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

/* app.use(
    morgan('dev'),
    express.static('/', path.join(__dirname, 'public')), // express.static('**request dir', **'dir'));
    express.json(),
    express.urlencoded({extended: false}), // it can read JSON and URL-encoded
    cookieParser(process.env.COOKIE_SECRET), // it can traslate cookies
    ) */

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

const multer = require('multer');
const fs = require('fs');
// End today work

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