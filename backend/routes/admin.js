const express = require('express');
const AdminRouter = express.Router();
const adminController= require('../controller/adminController')
const auth= require('../middleware/jwt')

AdminRouter.post('/adminLogin',adminController.adminLogin)

AdminRouter.get('/users',adminController.userList)
AdminRouter.post('/blockuser',adminController.blockUser)
AdminRouter.post('/unblockuser',adminController.UnBlockUser)

AdminRouter.get('/partners',adminController.partnerList)

module.exports = AdminRouter;
