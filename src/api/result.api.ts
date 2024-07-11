import { AxiosError } from "axios";

import { useAppProps } from "antd/es/app/context";
import { endpoints, POST } from "../utils/api.service";

export interface RequestData {
  startDate: string;
  endDate: string;
  dataSet: {
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
[];

type EVENTS_TYPE = "urduEvents" | "engEvents";

interface Events {
  item: {
    sources: string[];
    urls: string[];
    descriptions: string[];
    _id: string;
    eventName: string;
    dte: string;
    sentiments: string;
  }[];

  record: {
    negativeSentiments: number;
    positiveSentiments: number;
    neturalsentSentiments: number;
    Events: number;
  }[];

  OriginalKeyword: string;
}
[];
export interface ResponseData {
  success: boolean;
  message: string;
  data: Record<EVENTS_TYPE, Events>;
}
[];

interface ResultProps extends RequestData {
  notification: useAppProps;
}

export const result = async ({
  startDate,
  endDate,
  dataSet,
  notification,
}: ResultProps) => {
  console.log({ startDate, endDate, dataSet });
  POST<RequestData, ResponseData>(endpoints.result, {
    startDate,
    endDate,
    dataSet,
  })
    .then(({ data }) => {
      notification?.notification.success({
        message: "Record Found",
      });
      console.log(data.success);
    })
    .catch((error: AxiosError) => {
      console.error("Error occurred:", error);
      notification?.notification.error({
        message: "Record not Found",
      });

      return error.response?.data;
    });
};
