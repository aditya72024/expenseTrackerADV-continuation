const express = require('express');
const purchaseController = require('../controllers/purchase');
const userauthentication = require('../middleware/auth');

const router = express.Router();

router.get('/purchase/premium', userauthentication.authenticate, purchaseController.purchasePremimum);
router.post('/purchase/updateTransactionStatus', userauthentication.authenticate, purchaseController.updateTransactionStatus);
// router.post('/addExpense', userauthentication.authenticate, expenseController.addExpense);
// router.delete('/deleteExpense/:expenseId', userauthentication.authenticate, expenseController.deleteExpense);
// router.get('/getParticularExpense/:expenseId', userauthentication.authenticate, expenseController.getParticularExpense);
// router.put('/putExpense/:expenseId', expenseController.putExpense);

module.exports = router;