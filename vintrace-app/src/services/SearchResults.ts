export interface SearchResult {
  lotCode: string;
  description: string;
  tank: string;
  volume: number;
};

export interface SearchResults {
  results: SearchResult[];
};
