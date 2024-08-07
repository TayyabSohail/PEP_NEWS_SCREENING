import { AxiosError } from "axios";
import { UseMutationOptions } from "@tanstack/react-query";

import { useAppProps } from "antd/es/app/context";

import { endpoints, POST } from "../utils/api.service";
import { queryClient } from "../utils/react-query.service";

export interface DatasetItem {
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
}
export interface RequestData {
  startDate: string;
  endDate: string;
  dataset: DatasetItem[];
}

export interface ResponseItem {
  string: {
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
  }[];
}

export interface ResponseData {
  data: ResponseItem[];
  success: boolean;
  message: string;
}

export const result = ({
  notification,
}: {
  notification?: useAppProps;
}): UseMutationOptions<ResponseData, AxiosError, RequestData> => {
  return {
    mutationFn: async (requestData) => {
      try {
        const { data } = await POST<RequestData, ResponseData>(
          endpoints.result.url,
          requestData
        );

        if (data.success) {
          notification?.notification?.success({
            message: "Record Found",
          });
        } else {
          notification?.notification?.error({
            message: "Record not Found",
          });
        }

        return data;
      } catch (error) {
        console.error("Error occurred:", error);
        notification?.notification?.error({
          message: "Error fetching data",
        });

        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.setQueryData(endpoints.result.cacheKey, data);
      }
    },
  };
};
