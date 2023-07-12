const express = require('express');
const userRouter = express.Router();
const userController= require('../controller/userController')

userRouter.get('/',userController.userHome)
userRouter.post('/signup', userController.userSignup)
userRouter.post('/userlogin',userController.userLogin)

module.exports = userRouter;
