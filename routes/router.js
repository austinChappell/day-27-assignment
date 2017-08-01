const express = require('express');
const router = express.Router();

const data = require('../data');

router.get('/', function(req, res) {
  res.render('users', data);
});

router.get('/:id', function(req, res) {
  let id = req.params.id;
  let user = data.users.find(function(item) {
    return item.id == id;
  });
  res.render('user', user);
});


module.exports = router;
