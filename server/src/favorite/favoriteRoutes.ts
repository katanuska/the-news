import { Router } from 'express';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from './favoriteController';

const router = Router();

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/', removeFavorite);

export default router;
