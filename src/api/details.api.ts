export interface DetailsRequest {
  startDate: string;
  endDate: string;
  englishName: string;
}

export interface DetailsResponse {
  Headline: string;
  DateTime: Date;
  Url: string;
  Source: string;
  Category: string;
  News: string;
  keywords: string[];
  sentiment: string;
  context_keywords: string[];
}
[];
