const userModel = require('../Models/userModel');
const md5 = require('md5');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const SECRET_KEY = md5(md5('secret_key_keyyy'))
const { authSchema } = require('../config/validation_Schema');
module.exports = {
    registerUsers: async (req, res) => {
        try {
           
            const { email, password , fullname, gender, birthday } = req.body;
            if (!fullname || !gender || !birthday) {
                return res.status(400).json({ error: 'Please provide all required information' });
            }
            const result = await authSchema.validateAsync({email: req.body.email, password: req.body.password});
            const doesExist = await userModel.findOne({ email: result.email });
            if (doesExist) {
                throw createError.Conflict(`${email} is already registered`);
            }

            const newUser = new userModel({ email: result.email , password: result.password, fullname, gender, birthday });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            if(error.details === true) {
                error.status = 422;
                return;
            }
            console.error(error);
            if (error instanceof createError.HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An internal server error occurred' });
            }
        }
    },
   loginUser: async (req, res) => {
       try{
        const {email, password} = req.body;
        const result = await authSchema.validateAsync(req.body); 
        const user = await userModel.findOne({email : result.email});
        if(!user) {
            res.send('Nguoi dung khong ton tai');
            return;
        }
        if(result.password != user.password) {
            res.send('Mat khau khong chinh xac');
            return;
        }
        const accesToken = await jwt.sign({email: user.email, fullname: user.fullname},SECRET_KEY )
        res.json({
            code: 1000,
            email: user.email,
            password: md5(user.password),
            accesToken
        });
       } 
       catch (error) {
        if(error.details === true) {
            error.status = 422;
            return;
        }
        console.log(error);
        if (error instanceof createError.HttpError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An internal server error occurred' });
        }
       }
   },
   verifyAccesToken : (req,res,next) => {
    if(!req.headers['authorization']){
        return next(createError.Unauthorized());

    }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, SECRET_KEY, (err,payload) => {
        if(err) {
            return next(createError.Unauthorized());
        }
        req.payload = payload;
        next();
    });
   }
   
};