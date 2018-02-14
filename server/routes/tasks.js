const express = require('express');
const tasksController = require('../controllers/tasksController'); 

const router = express.Router();


router.get('/', tasksController.getAll); 
router.post('/', tasksController.create);
router.get('/:id', tasksController.find);  
//router.put('/'), tasksController.update);
//router.delete('/', tasksController.get); 

module.exports = router;
