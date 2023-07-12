const express = require('express');
const partnerRouter = express.Router();

/* GET users listing. */
partnerRouter.get('/partner', function(req, res) {
  res.send('partner');
});

module.exports = partnerRouter;
