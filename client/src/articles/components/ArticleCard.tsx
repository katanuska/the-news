import './ArticleCard.scss';

type ArticleCardProps = {
  title: string;
  urlToImage: string;
  url: string;
  category: string;
  author?: string;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  urlToImage,
  url,
  category,
  author,
}) => {
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
      </div>
    </a>
  );
};

export default ArticleCard;
