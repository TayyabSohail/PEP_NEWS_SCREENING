import { AxiosError } from "axios";

import { useAppProps } from "antd/es/app/context";
import { endpoints, POST } from "../utils/api.service";

import { ROUTES } from "../constants/routes";

export interface RequestData {
  startDate: string;
  endDate: string;
  dataSet: [
    {
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
  ];
}

export interface ResponseData {}

export const result = async ({ startDate, endDate, dataSet }: RequestData) => {
  POST<RequestData, ResponseData>(endpoints.result, {
    startDate,
    endDate,
    dataSet,
  })
    .then(({}) => {})
    .catch((error: AxiosError) => {});
};
