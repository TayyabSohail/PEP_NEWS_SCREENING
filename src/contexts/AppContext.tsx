import { createContext, useState, ReactNode } from "react";

import { DatasetItem } from "../api/result.api";

export const AppContext = createContext(
  {} as {
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    dataset: DatasetItem[];
    setDataset: React.Dispatch<React.SetStateAction<DatasetItem[]>>;
  }
);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dataset, setDataset] = useState<DatasetItem[]>([]);

  return (
    <AppContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        dataset,
        setDataset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
