const express = require('express');
const router = express.Router();
const {registerUsers, loginUser} = require('../Controller/authController')
router.get('/register', (req,res) => {
    res.send('hi');
})
router.post('/register',registerUsers)
router.post('/login', loginUser)
router.get('/login', (req,res) => {
    res.send('hi');
} )
module.exports = router;