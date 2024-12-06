import { apiFetch } from '../../api';
import { Article } from '../model/Article';

interface FavoriteApi {
  getFavorite: () => Promise<Article[]>;
  addToFavorite: (article: Article) => Promise<void>;
  removeFromFavorite: (url: string) => Promise<void>;
}

const FavoriteApiImpl: FavoriteApi = {
  getFavorite: async () => {
    const favoriteArticles = await apiFetch('/favorite', { method: 'GET' });
    return favoriteArticles as Article[];
  },
  addToFavorite: (article: Article): Promise<void> => {
    return apiFetch('/favorite', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  },
  removeFromFavorite: (url: string): Promise<void> => {
    return apiFetch('/favorite', {
      method: 'DELETE',
      body: JSON.stringify({ url }),
    });
  },
};

export default FavoriteApiImpl;
