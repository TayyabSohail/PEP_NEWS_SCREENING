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
import { fetchNewsDetails, NewsDetailRequest } from "../../api/news.api";
import { EventSummary } from "./EventSummary";

export const Summary = () => {
  const navigate = useNavigate();
  const { startDate, endDate } = useContext(AppContext);
  const location = useLocation();
  const { requestData, personData } = location.state;

  const [details, setDetails] = useState<DetailsResponseItem>();
  const [Summary, setSummary] = useState<string>("");
  const [selectedNews, setSelectedNews] = useState<NewsDetailRequest | null>(
    null
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Event Summary",
      children: <EventSummary summary={Summary} />,
    },
    {
      key: "2",
      label: "NEWS",
      children: <NewsSummary selectedNews={selectedNews} />,
    },
  ];

  function formatDate(dateObject: { $date: string } | undefined): string {
    if (!dateObject || !dateObject.$date) {
      throw new Error("Invalid Date Object");
    }

    const dateString = dateObject.$date;
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }

    const day: string = String(date.getUTCDate()).padStart(2, "0");
    const month: string = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year: string = String(date.getUTCFullYear());

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDetails(requestData as DetailsRequest);
        if (data?.success) {
          setDetails(data.data[0]);

          const allSummaries: string =
            data.data[0].Event_Summary[personData.englishName] ?? {};

          setSummary(allSummaries);
          console.log(allSummaries);

          if (data.data[0]?.Headlines.length > 0) {
            const initialNews: NewsDetailRequest = {
              newsDate: formatDate(data.data[0]?.StartDate),
              Headline: data.data[0]?.Headlines[0],
              englishName: personData.englishName,
            };

            setSelectedNews(initialNews);
          }
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    if (requestData) {
      fetchData();
    }
  }, [personData.englishName, requestData]);

  const handleNewsDetails = async (headline: string, date: string) => {
    const requestData: NewsDetailRequest = {
      newsDate: date,
      Headline: headline,
      englishName: personData.englishName,
    };

    const data = await fetchNewsDetails(requestData);
    console.log(data);
    setSelectedNews(requestData);
  };
  if (!details) {
    return <div>Loading...</div>;
  }

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

      <div className="flex gap-10">
        <div className="w-2/3">
          <NewsDetails
            headlines={details?.Headlines}
            sources={details?.Sources}
            startDate={formatDate(details?.StartDate)}
            handleNewsDetails={handleNewsDetails}
          />
        </div>
        <div className="w-1/3">
          <PEPDetails />
        </div>
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
