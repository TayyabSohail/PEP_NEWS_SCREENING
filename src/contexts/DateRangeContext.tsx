import { createContext, useState, ReactNode } from "react";

export interface ItemData {
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

interface DateRangeData {
  startDate: string;
  endDate: string;
  data: ItemData[];
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  DataSet: (data: ItemData[]) => void;
}

export const DateRangeContext = createContext<DateRangeData>({
  startDate: "",
  endDate: "",
  data: [],
  setStartDate: () => {},
  setEndDate: () => {},
  DataSet: () => {},
});

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [data, setDataSet] = useState<ItemData[]>([]);

  const DataSet = (data: ItemData[]) => {
    setDataSet(data);
  };

  return (
    <DateRangeContext.Provider
      value={{
        startDate,
        endDate,
        data,
        setStartDate,
        setEndDate,
        DataSet,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};
