const express = require('express');
const expenseController = require('../controllers/expense');
const router = express.Router();

router.get('/', expenseController.getIndex);
router.post('/addExpense', expenseController.addExpense);
router.delete('/deleteExpense/:expenseId', expenseController.deleteExpense);
router.get('/getParticularExpense/:expenseId', expenseController.getParticularExpense);
router.put('/putExpense/:expenseId', expenseController.putExpense);

module.exports = router;