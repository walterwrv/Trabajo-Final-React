import { Router } from 'express';
import { register, login, getUser } from '../controllers/authController.js';
import verifyToken from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', verifyToken, getUser);


export default router;
