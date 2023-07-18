const express = require('express');
const partnerRouter = express.Router();
const partnerController= require('../controller/partnerController')

/* GET users listing. */
partnerRouter.get('/partner', function(req, res) {
  res.send('partner');
});

partnerRouter.post('/partnersignup',partnerController.partnerSignup)
partnerRouter.post('/partnerlogin',partnerController.partnerLogin)

module.exports = partnerRouter;
