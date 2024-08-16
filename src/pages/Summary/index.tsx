import { useContext, useEffect, useState } from "react";
import { Modal, Tabs } from "antd";
import type { TabsProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { AppContext } from "../../contexts/AppContext";
import {
  SecondaryButton,
  LinkButton,
  PrimaryButton,
} from "../../components/Button";
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          onClick={showModal}
        >
          Download
        </LinkButton>
      </div>

      <span className={styles.line} />

      <div className="flex gap-10">
        <div className="w-2/3">
          <NewsDetails
            headlines={details?.Headlines}
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
      <Modal
        title={
          <div className="w-full bg-modal_bg flex justify-center items-center p-2 rounded-t-lg">
            <span className="text-primary">Are you sure?</span>
          </div>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={330}
        footer={null}
        bodyStyle={{ padding: 0 }}
      >
        <div className="bg-white p-6">
          <p className="text-center text-gray-500 mb-4">
            Re you sure you want to download the event of
            <b> "{personData.englishName}"</b>?
          </p>
          <div className="flex justify-center items-center mt-2">
            <PrimaryButton
              icon={<DownloadOutlined />}
              className="text-primary  font-bold"
              onClick={handleOk}
            >
              Download
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </section>
  );
};
