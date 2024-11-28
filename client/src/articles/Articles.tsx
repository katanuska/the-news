import { Article } from './Article';
import ArticleCard from './ArticleCard';
import LatestNews from './LatetNews';
import './Articles.scss';

type ArticlesProps = {
  articles: Article[];
  onFavoriteChange: (article: Article, favorite: boolean) => void;
};

const Articles: React.FC<ArticlesProps> = ({ articles, onFavoriteChange }) => {
  // TODO: implement infinite scroll
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
          <ArticleCard
            {...article}
            onFavoriteChange={(favorite) => onFavoriteChange(article, favorite)}
          />
        </div>
      ))}
    </div>
  );
};

export default Articles;
