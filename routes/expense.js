const express = require('express');
const expenseController = require('../controllers/expense');

const userauthentication = require('../middleware/auth');


const router = express.Router();

router.get('/', userauthentication.authenticate, expenseController.getIndex);
router.post('/addExpense', userauthentication.authenticate, expenseController.addExpense);
router.delete('/deleteExpense/:expenseId', userauthentication.authenticate, expenseController.deleteExpense);
router.get('/getParticularExpense/:expenseId', userauthentication.authenticate, expenseController.getParticularExpense);
router.get('/getLeaderBoard', userauthentication.authenticate, expenseController.getLeaderBoard);
router.put('/putExpense/:expenseId', expenseController.putExpense);

module.exports = router;