export interface Article {
  url: string;
  sourceId: string;
  title: string;
  urlToImage: string;
  publishedAt: Date;
  category?: string;
  author?: string;
}
