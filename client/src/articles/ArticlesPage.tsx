import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../api';
import { Article } from './model/Article';
import Articles from './components/Articles';
import SearchBar from './components/SearchBar';
import CategorieMenu, { Categorie } from './components/CategoryMenu';
import { useUser } from '../auth/user/UserContext';
import './ArticlePage.scss';

function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [favoriteArticles, setFavoriteArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Categorie>('home');
  const [vbisibleArticles, setVisibleArticles] = useState<Article[]>([]);

  const { user } = useUser();

  //TODO: load latest news

  const loadArticles = useCallback(
    async (category: Categorie, searchQuery?: string) => {
      let url = '/articles';
      const urlParams = new URLSearchParams();
      if (category != 'home') {
        urlParams.append('category', category);
      }
      if (searchQuery?.length) {
        urlParams.append('search', searchQuery);
      }

      const response: Article[] = await apiFetch(
        url,
        { method: 'GET' },
        urlParams
      );
      setArticles(response || []);

      //TODO: error handling when error fetching articles
    },
    []
  );

  // TODO: move favorites to separate file / component / hook?
  const loadFavorites = useCallback(async () => {
    const favoriteArticles = await apiFetch('/favorite', { method: 'GET' });
    setFavoriteArticles(favoriteArticles || []);
  }, []);

  useEffect(() => {
    loadArticles(category);
  }, [loadArticles]);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user, loadFavorites]);

  const prepareVisibleArticles = (
    articles: Article[],
    favorites: Article[]
  ): Article[] => {
    return articles.map((prevArticle: Article) => ({
      ...prevArticle,
      isFavorite: favorites.some(
        (favoriteArticle: Article) => favoriteArticle.url == prevArticle.url
      ),
    }));
  };

  useEffect(() => {
    if (!articles.length) {
      return;
    }

    const visibleArticles = prepareVisibleArticles(
      articles,
      favoriteArticles || []
    );
    setVisibleArticles(visibleArticles);
  }, [articles, favoriteArticles]);

  useEffect(() => {
    if (category === 'favorites') {
      setVisibleArticles(
        favoriteArticles.map((article) => ({ ...article, isFavorite: true }))
      );
    } else {
      const visibleArticles = prepareVisibleArticles(
        articles,
        favoriteArticles
      );
      setVisibleArticles(visibleArticles);
    }
  }, [category]);

  const handleSearch = (searchQuery: string) => {
    loadArticles(category, searchQuery);
  };

  const handleCategoryChange = (category: Categorie) => {
    setCategory(category);
    loadArticles(category);
  };

  const addFavorite = async (article: Article) => {
    await apiFetch('/favorite', {
      method: 'POST',
      body: JSON.stringify(article),
    });

    setFavoriteArticles((prevFavorites) => [...prevFavorites, article]);
  };

  const deleteFavorite = async (article: Article) => {
    await apiFetch('/favorite', {
      method: 'DELETE',
      body: JSON.stringify({ url: article.url }),
    });

    setFavoriteArticles((prevFavorites) =>
      prevFavorites.filter((prevArticle) => prevArticle.url != article.url)
    );
  };

  const handleFavoriteChange = async (article: Article, favorite: boolean) => {
    if (favorite) {
      addFavorite(article);
    } else {
      deleteFavorite(article);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">
          <span className="colored">My</span>News
        </h1>
        <div className="search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div className="pageContent">
        <CategorieMenu
          category={category}
          onCategoryChange={handleCategoryChange}
        />
        <Articles
          articles={vbisibleArticles}
          onFavoriteChange={handleFavoriteChange}
        />
      </div>
    </>
  );
}

export default ArticlesPage;
