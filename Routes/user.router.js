const express = require('express');
const router = express.Router();
const { verifyAccesToken } = require('../Controller/authController')
const  { updateUsers } = require('../Controller/userController')
router.get('/updateUser',verifyAccesToken ,(req,res,next) => {
    res.json("Truy cap hop le");
})
router.put('/updateUser',verifyAccesToken, updateUsers)
module.exports = router;