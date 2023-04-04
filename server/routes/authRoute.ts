import { Request, Response, Router } from 'express';
import {
  login,
  refreshAllToken,
  register
} from '../controllers/authController';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World from authRoute.ts!' });
});

router.post('/login', login);
router.post('/register', register);
router.get('/refresh', refreshAllToken);

export default router;
