import { useContext, useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { AppContext } from "../../contexts/AppContext";
import { SecondaryButton, LinkButton } from "../../components/Button";
import { PEPDetails } from "./PEPDetails";
import { NewsDetails } from "./NewsDetails";
import { NewsSummary } from "./NewsSummary";
import { ROUTES } from "../../constants/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { styles } from "../../assets/styles";
import {
  fetchDetails,
  DetailsRequest,
  DetailsResponseItem,
} from "../../api/details.api";

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
  const { startDate, endDate } = useContext(AppContext);
  const location = useLocation();
  const { requestData, personData } = location.state;

  const [details, setDetails] = useState<DetailsResponseItem>();

  useEffect(() => {
    if (requestData) {
      const fetchData = async () => {
        try {
          const data = await fetchDetails(requestData as DetailsRequest);
          if (data?.success) {
            setDetails(data.data[0]);
          }
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };

      fetchData();
    }
  }, [requestData]);

  return (
    <section className={`${styles.section}`}>
      <h2 className={styles.heading2}>{details?.Event}</h2>
      <p className={styles.label}>
        {personData?.englishName} - {personData?.primarySecondary}
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
