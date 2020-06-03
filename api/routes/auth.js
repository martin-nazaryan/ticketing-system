import { Router } from 'express';
import { AuthController } from '../controllers';

const router = new Router();

router
  .post('/sign-in', AuthController.signIn)
  .post('/sign-up', AuthController.signUp);

export default router;
