var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
var logger = require('morgan');
const cors = require("cors")
require("dotenv").config();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const expRouter = require("./routes/exp")
const reviewRouter = require("./routes/review")
const authRouter = require("./routes/auth")

var app = express();


mongoose.connect("mongodb://localhost", { useNewUrlParser: true })
const db = mongoose.connection
db.once("open", function () {
    console.log("MongoDB database connection established successfully!");
    require("./test/testSchema")
});

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter)
app.use('/exp', expRouter);
app.use('/review', reviewRouter)



module.exports = app;
