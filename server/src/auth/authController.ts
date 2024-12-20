import { Request, Response } from 'express';
import { signup, signin, verifyUser } from './authService';
import { CreateUserDTO } from './model/newUserDTO';

export const users: { [key: string]: { email: string; password: string } } = {}; // In-memory user data

export const getCurrentUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const signupController = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body as CreateUserDTO;

  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({
      message:
        'Provide email, password, first and last name for user registration.',
    });
    return;
  }

  //TODO: validate user data

  try {
    const user = await signup(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};

const setTokenCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict' as any,
    maxAge: 60 * 60 * 1000, // 1 hour
  });
};

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  try {
    const { user, token } = await signin(email, password);

    setTokenCookie(res, token);
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};

export const verifyUserController = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (typeof token !== 'string') {
    res.status(400).json({ message: 'Invalid token.' });
    return;
  }

  try {
    verifyUser(token as string);
    if (!process.env.CLIENT_URL) {
      console.error('Client URL is not specified.');
      res.status(204);
      return;
    }

    setTokenCookie(res, token);
    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};
