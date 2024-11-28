import { Request, Response, NextFunction } from 'express';
import { validateToken } from './authService';
import { User } from './model/user';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.path.startsWith('/favorite')) {
    next();
    return;
  }

  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const user = validateToken(token);
    if (user?.verified) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'An unexpected error occurred while validating token.',
    });
  }
};
