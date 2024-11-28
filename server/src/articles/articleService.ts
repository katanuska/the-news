import { Article } from './model/article';
import {
  ArticleResponse,
  NewsApiTopHeadlinesResponse,
  NewsApiSourcesResponse,
  SourceResponse,
} from './model/newsApiDTO';

// News API top headlines documentation: https://newsapi.org/docs/endpoints/top-headlines

const NEWS_API = 'https://newsapi.org/v2';
const TOP_HEADLINES_API = '/top-headlines';
const SOURCES_API = '/sources';

const API_KEY_PARAM = 'apiKey';
const COUNTRY_PARAM = 'country';
const CATEGORY_PARAM = 'category';
const SEARCH_PARAM = 'q';

const SORTY_BY_PARAM = 'sortBy';
const COUNTRY = 'us'; // TODO: put to environment if more than one country should be supported
const SORT_BY = 'publishedAt';

const OK_STATUS = 'ok';

//TODO: cache sources
let newsApiSources: SourceResponse[] = [];

const getValidArticles = (articlesResponse: ArticleResponse[]): Article[] => {
  const articles: Article[] = [];
  articlesResponse.forEach((article) => {
    if (
      article.url != undefined &&
      article.source?.id != undefined &&
      article.title != undefined &&
      article.urlToImage != undefined &&
      article.publishedAt != undefined
    ) {
      articles.push({
        url: article.url as string,
        sourceId: article.source.id as string,
        author: article.author,
        publishedAt: article.publishedAt,
        title: article.title,
        urlToImage: article.urlToImage,
      });
    }
  });
  return articles;
};

const callNewsApiSources = async () => {
  if (!process.env.NEWS_API_KEY) {
    throw new Error('API_KEY for fetching data from NewsAPI is missing');
  }

  const searchParams: Record<string, any> = new URLSearchParams();
  searchParams.append(API_KEY_PARAM, process.env.NEWS_API_KEY);
  searchParams.append(COUNTRY_PARAM, COUNTRY);

  const baseUrl = new URL(NEWS_API + SOURCES_API);
  baseUrl.search = searchParams.toString();

  const response = await fetch(baseUrl);
  const sourceResponse: NewsApiSourcesResponse = await response.json();

  if (sourceResponse.status != OK_STATUS) {
    throw new Error('Error fetching from news API: ' + sourceResponse.message);
  }

  return sourceResponse.sources;
};

const callNewsApiTopHeadlines = async (
  category: string | undefined,
  search: string | undefined
): Promise<ArticleResponse[]> => {
  if (!process.env.NEWS_API_KEY) {
    throw new Error('API_KEY for fetching data from NewsAPI is missing');
  }

  const searchParams: Record<string, any> = new URLSearchParams();
  searchParams.append(API_KEY_PARAM, process.env.NEWS_API_KEY);
  searchParams.append(COUNTRY_PARAM, COUNTRY);
  searchParams.append(SORTY_BY_PARAM, SORT_BY);
  if (category) {
    searchParams.append(CATEGORY_PARAM, category);
  }
  if (search) {
    searchParams.append(SEARCH_PARAM, search);
  }

  const baseUrl = new URL(NEWS_API + TOP_HEADLINES_API);
  baseUrl.search = searchParams.toString();

  const response = await fetch(baseUrl);
  const articlesResponse: NewsApiTopHeadlinesResponse = await response.json();

  if (articlesResponse.status != OK_STATUS) {
    throw new Error(
      'Error fetching from news API: ' + articlesResponse.message
    );
  }

  return articlesResponse.articles;
};

export const loadArticles = async (
  category: string | undefined,
  search: string | undefined
): Promise<Article[]> => {
  const articlesResponse = await callNewsApiTopHeadlines(category, search);
  let articles = getValidArticles(articlesResponse);

  if (category) {
    articles = articles.map((article) => ({ ...article, category }));
  } else {
    if (!newsApiSources.length) {
      newsApiSources = await callNewsApiSources();
    }
    articles = articles.map((article) => {
      const articleSource = newsApiSources.find(
        (source) => source.id === article.sourceId
      );
      return { ...article, category: articleSource?.category };
    });
  }

  return articles;
};
