import express from 'express';
import { addTransaction , getAllTransaction, editTransaction,deleteTransaction } from '../controllers/transactionController.js';

const router = express.Router();

// routes
// Add transaction POST method
router.post('/add-transaction',addTransaction);

// Edit  transaction
router.post('/edit-transaction',editTransaction);


// Delete  transaction
router.post('/delete-transaction',deleteTransaction);

// Get transaction
router.post('/get-transaction',getAllTransaction);
export default router;