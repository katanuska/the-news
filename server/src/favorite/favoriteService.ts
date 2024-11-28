import { Article } from '../articles/model/article';
import { User } from '../auth/model/user';

const favorites = new Map<string, Article[]>();

export const getFavoritesForUser = (user: User): Article[] => {
  return favorites.get(user.email) || [];
};

export const addFavoriteForUser = (user: User, artcle: Article): void => {
  const usersFavorites = favorites.get(user.email) || [];
  if (usersFavorites.some((favorite) => favorite.url === artcle.url)) {
    return;
  }

  usersFavorites.push(artcle);
  favorites.set(user.email, usersFavorites);
};

export const removeFavoriteForUser = (user: User, artcle: Article): void => {
  let usersFavorites = favorites.get(user.email) || [];
  usersFavorites = usersFavorites.filter(
    (favorite) => favorite.url !== artcle.url
  );
  favorites.set(user.email, usersFavorites);
};
