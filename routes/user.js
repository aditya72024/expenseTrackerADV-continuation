const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/signup', userController.signup);


// router.get('/', shopController.getIndex);
// router.post('/add-user', shopController.addUser);
// router.delete('/delete-user/:userId', shopController.deleteUser);


module.exports = router;