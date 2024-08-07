import { useContext } from "react";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { AppContext } from "../../contexts/AppContext";

import { SecondaryButton, LinkButton } from "../../components/Button";

import { PEPDetails } from "./PEPDetails";
import { NewsDetails } from "./NewsDetails";
import { NewsSummary } from "./NewsSummary";
import { ROUTES } from "../../constants/routes";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { NewsDetailItem } from "../../api/details.api";

import { useNavigate } from "react-router-dom";
import { endpoints } from "../../utils/api.service";
import { queryClient } from "../../utils/react-query.service";
import { styles } from "../../assets/styles";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Event Summary",
    children: <NewsSummary />,
  },
  {
    key: "2",
    label: "NEWS Event",
    children: <NewsSummary />,
  },
];

export const Summary = () => {
  const navigate = useNavigate();
  // Get the context values
  const { startDate, endDate } = useContext(AppContext);

  const location = useLocation();
  const personData = location.state;

  const cachedData: NewsDetailItem[] | undefined = queryClient.getQueryData<
    NewsDetailItem[]
  >(endpoints.details.cacheKey);
  console.log("API data", cachedData);

  useEffect(() => {}, [personData]);

  return (
    <section className={`${styles.section}`}>
      <h2 className={styles.heading2}>
        Pakistan minister ditched offshore plans amid `concerns` over tax
        authority
      </h2>

      <p className={styles.label}>
        {personData.englishName} - {personData.primarySecondary}
      </p>

      <div className="flex justify-between">
        <p>
          <span className={styles.label}>Date Range: </span>
          {startDate} - {endDate}
        </p>

        <LinkButton
          icon={<DownloadOutlined />}
          className="text-primary font-bold"
        >
          Download
        </LinkButton>
      </div>

      <span className={styles.line} />

      <div className="flex flex-row gap-10">
        <NewsDetails />
        <PEPDetails />
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        className="p-5 rounded-lg bg-light_blue"
      />
      <SecondaryButton onClick={() => navigate(ROUTES.preview)}>
        Back
      </SecondaryButton>
    </section>
  );
};
