export interface Article {
  url: string;
  title: string;
  description?: string;
  urlToImage: string;
  category: string;
  publishedAt: string;
  author?: string;
  isFavorite?: boolean;
}
