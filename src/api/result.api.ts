import { AxiosError } from "axios";
import { UseMutationOptions } from "@tanstack/react-query";

import { useAppProps } from "antd/es/app/context";

import { endpoints, POST } from "../utils/api.service";
import { queryClient } from "../utils/react-query.service";

export interface RequestData {
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

type EVENTS_TYPE = "urduEvents" | "engEvents";
export interface ItemDetails {
  sources: string[];
  urls: string[];
  descriptions: string[];
  _id: string;
  eventName: string;
  dte: string;
  sentiments: string;
}

export interface Events {
  item: ItemDetails[];
  record: {
    negativeSentiments: number;
    postiveSentiments: number;
    neturalsentSentiments: number;
    Events: number;
  };
  OriginalKeyword: string;
}

export interface ResponseData {
  success: boolean;
  message: string;
  data: Record<EVENTS_TYPE, Events[]>;
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
