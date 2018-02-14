const express = require('express');
const passport = require('passport');

const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), usersController.get);
router.post('/auth/register', usersController.register);
router.post('/auth/login', usersController.login);

module.exports = router;


