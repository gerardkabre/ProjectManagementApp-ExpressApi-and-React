const express = require('express');
const passport = require('passport');

const projectsController = require('../controllers/projectsController');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), projectsController.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), projectsController.create);
router.get('/:id', projectsController.find);
//router.put('/'), projectsController.update);
//router.delete('/', null);

module.exports = router;
