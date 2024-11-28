import { Request, Response } from 'express';
import {
  addFavoriteForUser,
  getFavoritesForUser,
  removeFavoriteForUser,
} from './favoriteService';
import { Article } from '../articles/model/article';

export const getFavorites = (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const favorites = getFavoritesForUser(req.user);
    res.json(favorites);
  } catch (error) {
    // TODO: move error handling to middleware
    if (error instanceof Error) {
      res.status(500).json({ messag: error.message });
    } else {
      res.status(500).json({ message: 'Unexpected error' });
    }
  }
};

export const addFavorite = (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const article = req.body as Article;
  if (!article?.url) {
    res.status(400).json({ message: 'Article expected in the request body.' });
    return;
  }

  try {
    addFavoriteForUser(req.user, article);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unexpected error' });
    }
  }
};

export const removeFavorite = (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const article = req.body as Article;
  if (!article?.url) {
    res.status(400).json({ message: 'Article expected in the request body.' });
    return;
  }

  try {
    removeFavoriteForUser(req.user, article);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ messag: error.message });
    } else {
      res.status(500).json({ message: 'Unexpected error' });
    }
  }
};
