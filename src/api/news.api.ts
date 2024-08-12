import { endpoints, POST } from "../utils/api.service";
import { queryClient } from "../utils/react-query.service";

export interface NewsDetailRequest {
  newsDate: string;
  Headline: string;
  englishName: string;
}
export interface NewsDetailItem {
  AML: {
    "Cash Smuggling": string[];
    "Corruption and Bribery": string[];
    "Counterfeiting Currency": string[];
    "Counterfeiting and Piracy of Products": string[];
    "Cyber Crime": string[];
    "Environmental Crimes": string[];
    Extortion: string[];
    "Fraud and Forgery": string[];
    "Illegal MVTS/Hawala/Hundi": string[];
    "Illicit Arms Trafficking": string[];
    "Illicit Trafficking in Narcotic Drugs and Psychotropic Substances": string[];
    "Illicit Trafficking in Stolen and Other Goods": string[];
    "Insider Trading and Market Manipulation": string[];
    "Kidnapping; Illegal Restraint and Hostage-Taking": string[];
    "Maritime Piracy": string[];
    "Murder; Grievous Bodily Injury": string[];
    "Robbery or Theft": string[];
    "Sexual Exploitation; Including Sexual Exploitation of Children": string[];
    Smuggling: string[];
    "Tax Crimes": string[];
    "Trafficking in Human Beings and Migrant Smuggling": string[];
  };
  Category: string;
  Cleaned_description: string[];
  Combined: string[];
  DateTime: { $date: string };
  Headline: string[];
  LOC: string[];
  NER: {
    LOC: string[];
    ORG: string[];
    OTH: string[];
    PER: string[];
  };
  News: string[];
  ORG: string[];
  PER: string[];
  Source: string;
  Url: string;
  _id: string;
  context_keywords: string[];
  context_summary: string[];
  keywords: string[];
  main_cat: string;
  sentiment: string;
  summary: string[];
}

export interface NewsDetailResponse {
  message: string;
  success: boolean;
  data: NewsDetailItem;
}

export const fetchNewsDetails = async (
  requestData: NewsDetailRequest
): Promise<NewsDetailResponse> => {
  try {
    const { data } = await POST<NewsDetailRequest, NewsDetailResponse>(
      endpoints.news.url,
      requestData
    );
    if (data?.success) {
      queryClient.setQueryData(endpoints.news.cacheKey, data);
    }
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};