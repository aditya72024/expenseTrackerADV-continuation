const express = require('express');
const passwordController = require('../controllers/password');
const router = express.Router();

router.post('/forgotpassword', passwordController.forgotpassword);
router.get('/resetpassword/:id', passwordController.resetpassword);
router.post('/updatepassword', passwordController.updatepassword);




// router.get('/', shopController.getIndex);
// router.post('/add-user', shopController.addUser);
// router.delete('/delete-user/:userId', shopController.deleteUser);


module.exports = router;