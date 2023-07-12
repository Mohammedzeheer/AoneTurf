const express = require('express');
const AdminRouter = express.Router();
const adminController= require('../controller/adminController')

AdminRouter.post('/adminLogin',adminController.adminLogin)

module.exports = AdminRouter;
