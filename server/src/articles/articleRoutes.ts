import { Router } from 'express';
import { getArticles } from './articleController';

const router = Router();

router.get('/', getArticles);

export default router;
