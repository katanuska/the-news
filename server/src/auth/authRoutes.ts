// src/routes/authRoutes.ts
import { Router } from 'express';
import {
  signupController,
  signinController,
  verifyUserController,
  getCurrentUser,
} from './authController';

const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/signin', signinController);
authRouter.get('/verify', verifyUserController);
authRouter.get('/user', getCurrentUser);

export default authRouter;
