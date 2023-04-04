import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router: Router = Router();

router.get('/', verifyToken, getAllUsers);

export default router;
