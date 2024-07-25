export interface SummaryRequest {
  Headline: string;
  englishName: string;
  startDate: string;
  endDate: string;
}

export interface SummaryResponse {
  Headline: string;
  DateTime: Date; //CHECK the datatype whether it is DATE or STRING
  Source: string;
  keywords: string[];
  summary: string;
  context_summary: string;
}
