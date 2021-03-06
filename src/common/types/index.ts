export interface NewsItem {
  id: number;
  category: NewsCategory;
  datetime: number;
  headline: string;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

enum NewsCategory {
  COMPANY = 'company',
}
