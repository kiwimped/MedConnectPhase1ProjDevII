const express = require('express');
const router = express.Router()
const cors = require('cors')
const {test,registerUser,forgotpassword,resetpassword,loginUser,getProfile,updateUser,logoutUser} = require('../controllers/authController')
//middleware

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/',test)
router.post('/registerNEW',registerUser)
router.post('/login',loginUser)
router.get('/profile',getProfile)
router.post('/update',updateUser)
router.post('/logout', logoutUser);
router.post('/login/ForgotPassword',forgotpassword)
router.post('/resetpassword/:token', resetpassword);

module.exports = router