// src/routes/authRoutes.ts
import { Router } from 'express';
import {
  signupController,
  signinController,
  verifyUserController,
} from './authController';

const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/signin', signinController);
authRouter.get('/verify', verifyUserController);

export default authRouter;
