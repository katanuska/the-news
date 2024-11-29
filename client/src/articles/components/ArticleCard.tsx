import { useUser } from '../../auth/user/UserContext';
import './ArticleCard.scss';

type ArticleCardProps = {
  title: string;
  urlToImage: string;
  url: string;
  category: string;
  author?: string;
  isFavorite?: boolean;
  onFavoriteChange: (favorite: boolean) => void;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  urlToImage,
  url,
  category,
  author,
  isFavorite,
  onFavoriteChange,
}) => {
  const { user } = useUser();
  const showFavorite = !!user;

  const handleFavoriteChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onFavoriteChange(!isFavorite);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card"
    >
      <img src={urlToImage} alt={title} />
      <div className="card-content">
        <p className="category">
          <small>{category}</small>
        </p>
        <h2 className="title">{title}</h2>
      </div>
      <div className="card-footer">
        <p className="author">{author}</p>
        {showFavorite && (
          <button onClick={handleFavoriteChange}>
            {isFavorite ? (
              <img src="/FavoritesFull.svg" alt="Remove from favorites" />
            ) : (
              <img src="/Favorites.svg" alt="Make this article your favorite" />
            )}
          </button>
        )}
      </div>
    </a>
  );
};

export default ArticleCard;
