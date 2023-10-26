const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('./config/dbconnect')
const authRouter = require('./Routes/auth.router');
app.use('/auth',authRouter);
const userRouter = require('./Routes/user.router')
app.use('/user',userRouter);
app.listen(3000, () => {
    console.log('App listen on port 3000');
})