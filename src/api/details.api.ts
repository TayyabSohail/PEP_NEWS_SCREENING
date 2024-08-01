import { endpoints, POST } from "../utils/api.service";
import { queryClient } from "../utils/react-query.service";

export interface DetailsRequest {
  startDate: string;
  endDate: string;
  dataset: {
    ID: number;
    englishName: string;
    urduName: string;
    akaEnglish: string;
    akaUrdu: string;
    organizations: string;
    designations: string;
    relationships: string;
    primarySecondary: string;
    keywords1: string;
    keywords2: string;
    keywords3: string;
    keywords4: string;
    keywords5: string;
  }[];
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

export interface DetailsResponse {
  message: string;
  success: boolean;
  data: NewsDetailItem[];
}

export const fetchDetails = async (
  requestData: DetailsRequest
): Promise<DetailsResponse> => {
  try {
    const { data } = await POST<DetailsRequest, DetailsResponse>(
      endpoints.details.url,
      requestData
    );
    if (data?.success) {
      queryClient.setQueryData(endpoints.details.cacheKey, data.data);
    }
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
