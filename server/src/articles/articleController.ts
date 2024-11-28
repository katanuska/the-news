import { Request, Response } from 'express';
import { loadArticles } from './articleService';

export const getArticles = async (req: Request, res: Response) => {
  const { category, search } = req.query;

  const categoryStr = typeof category === 'string' ? category : undefined;
  const searchStr = typeof search === 'string' ? search : undefined;

  try {
    const articles = await loadArticles(categoryStr, searchStr);
    res.json(articles);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ messag: error.message });
    } else {
      res.status(500).json({ message: 'Unexpected error' });
    }
  }
};
