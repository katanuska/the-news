import { useState } from 'react';
import './AddToFavorite.scss';
import FavoriteApi from './FavoriteApi';
import { Article } from '../model/Article';
import { useUser } from '../../auth/UserContext';

type AddToFavoriteProps = {
  article: Article;
};

const AddToFavorite: React.FC<React.PropsWithChildren<AddToFavoriteProps>> = ({
  article,
  children,
}) => {
  const { user } = useUser();
  const showFavorite = !!user;

  const [favorite, setFavorite] = useState<boolean>(false);

  const handleAddToFavorite = async () => {
    await FavoriteApi.addToFavorite(article);
    setFavorite(true);
  };

  const handleRemoveFromFavorite = async () => {
    await FavoriteApi.removeFromFavorite(article.url);
    setFavorite(false);
  };

  if (!showFavorite) {
    return children;
  }

  return (
    <div className="add-to-favorite-container">
      {!favorite ? (
        <button onClick={handleAddToFavorite}>Save</button>
      ) : (
        <button className="saved" onClick={handleRemoveFromFavorite}>
          <img src="/FavoritesFull.svg" alt="Saved article" />
        </button>
      )}
      {children}
    </div>
  );
};

export default AddToFavorite;
