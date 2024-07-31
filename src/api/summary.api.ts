export interface SummaryRequest {
  newsdate: string;
  Headline: string;
  englishName: string;
}

export interface SummaryResponse {
  Headline: string;
  DateTime: Date; //CHECK the datatype whether it is DATE or STRING
  Source: string;
  keywords: string[];
  summary: string;
  context_summary: string;
}
