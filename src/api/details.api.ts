import { endpoints, POST } from "../utils/api.service";
import { queryClient } from "../utils/react-query.service";

export interface DetailsRequest {
  eventDate: string;
  Event: string;
}

export interface DetailsResponse {
  message: string;
  success: boolean;
  data: {
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
    Articles: number;
    Categories: string[];
    Description: string[];
    EndDate: { $date: string };
    Event: string;
    Headlines: string[];
    LOC: string[];
    Major_Cat: string;
    ORG: string[];
    PER: string[];
    Sentiment_Prediction: string;
    Similarity_Scores: number[];
    Sources: string[];
    StartDate: { $date: string };
    Summary: string[];
    Urls: string[];
    _id: { $oid: string };
    keywords: string[];
  };
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
