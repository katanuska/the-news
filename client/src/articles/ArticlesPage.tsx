import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../api';
import { Article } from './model/Article';
import Articles from './components/Articles';
import SearchBar from './components/SearchBar';
import CategorieMenu, { Categorie } from './components/CategoryMenu';
import './ArticlePage.scss';
import FavoriteApi from './favorite/FavoriteApi';

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Categorie>('home');

  //TODO: load latest news
  //TODO: error handling when error fetching articles

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
    },
    []
  );

  const loadFavoriteArticles = useCallback(async () => {
    const articles = await FavoriteApi.getFavorite();
    setArticles(articles || []);
  }, []);

  useEffect(() => {
    if (category === 'favorites') {
      loadFavoriteArticles();
    } else {
      loadArticles(category);
    }
  }, [category, loadFavoriteArticles, loadArticles]);

  const handleSearch = (searchQuery: string) => {
    loadArticles(category, searchQuery);
  };

  const handleCategoryChange = (category: Categorie) => {
    setCategory(category);
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
          articles={articles}
          canAddToFavorite={category != 'favorites'}
        />
      </div>
    </>
  );
};

export default ArticlesPage;
