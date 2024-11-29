import './LatestNews.scss';

type LatestNewsAticle = {
  title: string;
  publishedAt: string;
  url: string;
};

type LatestNewsProps = {
  articles: LatestNewsAticle[];
};

const LatestNews: React.FC<LatestNewsProps> = ({ articles }) => {
  //TODO: vjerojatno treba izdvojiti negdje, barem lokalizaciju
  //TODO: infinite scroll
  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
  };

  return (
    <div className="latest-news-card">
      <div className="title">
        <img src="/LatestNews.png" alt="Latest News" />
        <h2>Latest news</h2>
      </div>
      {articles.map((article) => (
        <div key={article.url}>
          {/* TODO: izdvojiti lokalizaciju vremena */}
          <p className="article-time">
            <small>{formatTime(article.publishedAt)}</small>
          </p>
          <h2>{article.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default LatestNews;
