import { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { Tabs, notification } from "antd";
import type { TabsProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";

import { AppContext } from "../../contexts/AppContext";
import {
  SecondaryButton,
  LinkButton,
  PrimaryButton,
} from "../../components/Button";
import { PEPDetails } from "./PEPDetails";
import { NewsDetails } from "./NewsDetails";
import { EventSummary } from "./EventSummary";
import { NewsSummary } from "./NewsSummary";

import { ROUTES } from "../../constants/routes";

import { styles } from "../../assets/styles";

import {
  fetchDetails,
  DetailsRequest,
  DetailsResponseItem,
} from "../../api/details.api";

import {
  fetchNewsDetails,
  NewsDetailRequest,
  NewsDetailResponse,
} from "../../api/news.api";

export const Summary = () => {
  const navigate = useNavigate();
  const { startDate, endDate } = useContext(AppContext);
  const location = useLocation();
  const { requestData, personData } = location.state;

  const [details, setDetails] = useState<DetailsResponseItem | undefined>();
  const [summary, setSummary] = useState<string>("");
  const [selectedNews, setSelectedNews] = useState<NewsDetailRequest | null>(
    null
  );
  const [setNewsDetails] = useState<NewsDetailResponse | undefined>(undefined);

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
      children: <EventSummary summary={summary} />,
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
            data.data[0].Event_Summary[personData.englishName] ?? "";

          setSummary(allSummaries);
          console.log(allSummaries);

          if (data.data[0]?.Headlines.length > 0) {
            const initialNews: NewsDetailRequest = {
              newsDate: formatDate(data.data[0]?.StartDate),
              Headline: data.data[0]?.Headlines[0],
              englishName: personData.englishName,
            };

            setSelectedNews(initialNews);

            const newsData = await fetchNewsDetails(initialNews);
            if (newsData?.success) {
              setNewsDetails(newsData.data);
            }
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

    try {
      const data = await fetchNewsDetails(requestData);
      console.log(data);
      setSelectedNews(requestData);
      if (data?.success) {
        setNewsDetails(data.data);
      }
    } catch (error) {
      console.error("Error fetching news details:", error);
    }
  };

  const exportToPDF = () => {
    try {
      if (!details || !personData) return;

      const pdf = new jsPDF();
      const linkColor = [0, 0, 255];
      const lineHeight = 10;
      const margin = 15;
      const headerHeight = 20;
      const footerHeight = 20;
      const contentWidth = pdf.internal.pageSize.width - 2 * margin;
      const contentHeight =
        pdf.internal.pageSize.height - headerHeight - footerHeight;
      const pageWidth = pdf.internal.pageSize.width;

      const addParagraph = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        maxHeight: number,
        justify: boolean = false
      ) => {
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
          if (y + lineHeight > maxHeight) {
            pdf.addPage();
            y = margin + headerHeight;
          }
          if (justify) {
            const words = line.split(" ");
            let lineContent = "";
            words.forEach((word: string) => {
              const testLine = lineContent + word + " ";
              const textWidth = pdf.getTextWidth(testLine);
              if (textWidth > maxWidth) {
                pdf.text(lineContent.trim(), x, y);
                lineContent = word + " ";
                y += lineHeight;
              } else {
                lineContent = testLine;
              }
            });
            pdf.text(lineContent.trim(), x, y);
          } else {
            pdf.text(line, x, y);
          }
          y += lineHeight;
        });
        return y;
      };

      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);

      // Center personData.englishName
      const textWidth = pdf.getTextWidth(personData.englishName);
      const xPos = (pageWidth - textWidth) / 2;
      pdf.text(personData.englishName, xPos, margin + headerHeight);

      pdf.setLineWidth(0.5);
      pdf.line(
        margin,
        margin + headerHeight + 2,
        pdf.internal.pageSize.width - margin,
        margin + headerHeight + 2
      );

      let yOffset = margin + headerHeight + lineHeight;

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "normal");

      // Bold Event
      pdf.setFont("helvetica", "bold");
      yOffset = addParagraph(
        `Event: ${details.Event}`,
        margin,
        yOffset,
        contentWidth,
        contentHeight
      );

      pdf.setFont("helvetica", "normal");
      yOffset = addParagraph(
        `Date: ${formatDate(details.StartDate)}`,
        margin,
        yOffset,
        contentWidth,
        contentHeight
      );

      const Organization = Array.isArray(personData.organizations)
        ? personData.organizations.join(", ")
        : personData.organizations || "N/A";
      yOffset = addParagraph(
        `Organization: ${Organization}`,
        margin,
        yOffset,
        contentWidth,
        contentHeight
      );

      const Designation = Array.isArray(personData.designations)
        ? personData.designations.join(", ")
        : personData.designations || "N/A";
      yOffset = addParagraph(
        `Designations: ${Designation}`,
        margin,
        yOffset,
        contentWidth,
        contentHeight
      );

      const Keywords = Array.isArray(personData.Keywords)
        ? personData.Keywords.join(", ")
        : personData.Keywords || "N/A";
      yOffset = addParagraph(
        `Keywords: ${Keywords}`,
        margin,
        yOffset,
        contentWidth,
        contentHeight
      );

      if (details.Headlines.length > 0) {
        const headline = details.Headlines[0];
        yOffset = addParagraph(
          `Headline: ${headline}`,
          margin,
          yOffset,
          contentWidth,
          contentHeight
        );

        // URL
        if (details.Urls.length > 0) {
          const url = details.Urls[0];
          pdf.setTextColor(...linkColor);
          yOffset = addParagraph(
            `URL: ${url}`,
            margin,
            yOffset,
            contentWidth,
            contentHeight
          );
          pdf.setTextColor(0, 0, 0);
        }

        // Description
        if (details.Description.length > 0) {
          const description = details.Description[0];
          yOffset = addParagraph(
            `Description: ${description}`,
            margin,
            yOffset,
            contentWidth,
            contentHeight,
            true
          );
        }
      }

      // Highlight and Bold Sources
      if (details.Sources.length > 0) {
        pdf.setFont("helvetica", "bold");
        yOffset = addParagraph(
          `Sources: ${details.Sources.join(", ")}`,
          margin,
          yOffset,
          contentWidth,
          contentHeight
        );
        pdf.setFont("helvetica", "normal");
      }

      yOffset = addParagraph(
        `Summary: ${summary}`,
        margin,
        yOffset,
        contentWidth,
        contentHeight
      );

      pdf.save("PEP-result-data.pdf");
      notification.success({
        message: "Success",
        description: "PDF saved successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      notification.error({
        message: "Error",
        description: "Error generating PDF",
      });
    }
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
              onClick={exportToPDF}
            >
              Download
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </section>
  );
};
