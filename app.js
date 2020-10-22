var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
var logger = require('morgan');
const cors = require("cors")

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const expRouter = require("./routes/exp")

var app = express();

mongoose.connect("mongodb://localhost", { useNewUrlParser: true })
const db = mongoose.connection


db.once("open", function () {
    console.log("MongoDB database connection established successfully!");
});
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/exp', expRouter);
app.use('')



module.exports = app;
