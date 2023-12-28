import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';

const router = express.Router();

//Login
router.post('/login',loginController);


//Register
router.post('/register',registerController);
export default router;