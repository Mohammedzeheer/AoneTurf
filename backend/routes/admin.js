const express = require('express');
const AdminRouter = express.Router();
const adminController= require('../controller/adminController')
const auth= require('../middleware/jwt')

AdminRouter.post('/adminLogin',adminController.adminLogin)
AdminRouter.get('/users',adminController.userList)
// AdminRouter.post('/blockuser',adminController.blockUser)

module.exports = AdminRouter;
