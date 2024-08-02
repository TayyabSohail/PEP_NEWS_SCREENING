import { useContext } from "react";

import { Tabs } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";

import { AppContext } from "../../contexts/AppContext";

import { SecondaryButton, LinkButton } from "../../components/Button";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { NewsDetailItem } from "../../api/details.api";

import { PEPDetails } from "./PEPDetails";
import { UrduNewsEvents } from "./UrduNewsEvents";
import { EnglishNewsEvents } from "./EnglishNewsEvents";
import { Sources } from "./Sources";
import { endpoints } from "../../utils/api.service";
import { queryClient } from "../../utils/react-query.service";

import { styles } from "../../assets/styles";

export const Details = () => {
  // retrieving the data corresponding to the name
  const { startDate, endDate } = useContext(AppContext);
  const location = useLocation();
  const personData = location.state;

  const cachedData: NewsDetailItem[] | undefined = queryClient.getQueryData<
    NewsDetailItem[]
  >(endpoints.details.cacheKey);
  console.log("API data", cachedData);

  useEffect(() => {
    console.log("person data in useEffect", personData);
  }, [personData]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "English NEWS",
      children: (
        <div className="mt-5 flex gap-10">
          <div className="w-2/3">
            <EnglishNewsEvents />
          </div>
          <div className="w-1/3 flex flex-col gap-10">
            <PEPDetails />
            <Sources />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Urdu NEWS",
      children: (
        <div className="mt-5  flex flex-row gap-10">
          <div className="w-2/3">
            <UrduNewsEvents />
          </div>
          <div className="w-1/3 flex flex-col gap-10">
            <PEPDetails />
            <Sources />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className={`${styles.section}`}>
      <div className="flex flex-row gap-10">
        <h2 className={styles.heading2}>
          {personData.ID} {personData.englishName}
        </h2>
        <h2 className={styles.heading2}> {personData.urduName} </h2>
      </div>
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

      {/* English and Urdu News */}
      <Tabs defaultActiveKey="1" items={items} />

      <SecondaryButton>Back</SecondaryButton>
    </section>
  );
};
