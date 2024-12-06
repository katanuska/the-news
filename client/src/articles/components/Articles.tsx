import { Article } from '../model/Article';
import ArticleCard from './ArticleCard';
import LatestNews from './LatetNews';
import AddToFavorite from '../favorite/AddToFavorite';
import './Articles.scss';

type ArticlesProps = {
  articles: Article[];
  canAddToFavorite: boolean;
};

const Articles: React.FC<ArticlesProps> = ({ articles, canAddToFavorite }) => {
  // TODO: implement infinite scroll

  const getArticleComponent = (article: Article) => {
    if (canAddToFavorite) {
      return (
        <AddToFavorite article={article}>
          <ArticleCard {...article} />
        </AddToFavorite>
      );
    } else {
      return <ArticleCard {...article} />;
    }
  };

  return (
    <div className="articles-container">
      <div
        className="card latest-news"
        style={{
          gridRow: articles.length < 3 ? 'span 1' : 'span 2',
        }}
      >
        <LatestNews articles={articles} />
      </div>
      {articles.map((article) => (
        <div className="card" key={article.url}>
          {getArticleComponent(article)}
        </div>
      ))}
    </div>
  );
};

export default Articles;
