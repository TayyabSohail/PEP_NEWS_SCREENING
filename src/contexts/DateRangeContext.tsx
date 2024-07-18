import { createContext, useState, ReactNode } from "react";

export const DateRangeContext = createContext<{
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}>({
  startDate: "",
  endDate: "",
  setStartDate: () => {},
  setEndDate: () => {},
});

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <DateRangeContext.Provider
      value={{
        startDate,
        endDate,
        setStartDate,
        setEndDate,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};
