import { useContext, useEffect, useState } from "react";
import { Checkbox, CheckboxProps, Modal, Tabs, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { notification } from "antd";

import { AppContext } from "../../contexts/AppContext";
import { SecondaryButton, LinkButton } from "../../components/Button";
import { PEPDetails } from "./PEPDetails";
import { UrduNewsEvents } from "./UrduNewsEvents";
import { EnglishNewsEvents } from "./EnglishNewsEvents";
import { Sources } from "./Sources";
import { styles } from "../../assets/styles";
import { ROUTES } from "../../constants/routes";

import {
  ResponseData,
  ResponseEvent,
  ResponseItem,
} from "../../api/result.api";

import { queryClient } from "../../utils/react-query.service";
import { endpoints } from "../../utils/api.service";

type Dataset = Record<
  string,
  {
    details: {
      englishName: string;
      akaEnglish: string;
      organizations: string;
      designations: string;
    };
    events: ResponseEvent[];
  }
>;

export const Details = () => {
  const navigate = useNavigate();

  const CheckboxGroup = Checkbox.Group;
  const { startDate, endDate, dataset: rawDataset } = useContext(AppContext);
  const location = useLocation();
  const { personData, criticalEvents, nonCriticalEvents } = location.state;
  const plainOptions = ["Keywords", "Critical", "Non Critical"];
  const defaultCheckedList = ["Critical", "Non Critical"];

  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const NEWS_CATEGORIES = ["Keywords", "Critical", "Non Critical"] as const;

  type NEWS_CATEGORY_TYPE = (typeof NEWS_CATEGORIES)[number];
  const keywords: string = personData.Keywords;
  const keywordsArray: string[] = keywords.split(",");

  const TAG_COLORS: Record<NEWS_CATEGORY_TYPE, string> = {
    Keywords: "bg-pink",
    Critical: "bg-red",
    "Non Critical": "bg-green",
  };

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const cachedData: ResponseData | undefined = queryClient.getQueryData(
    endpoints.result.cacheKey
  );

  const ScanData: ResponseItem = cachedData?.data ?? {};

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

  const typedDataset: Dataset = rawDataset.reduce((acc: Dataset, item) => {
    const key = item.englishName;

    if (!acc[key]) {
      acc[key] = {
        details: {
          englishName: item.englishName,
          akaEnglish: item.akaEnglish,
          organizations: item.organizations,
          designations: item.designations,
        },
        events: [],
      };
    }

    if (ScanData[key]) {
      acc[key].events.push(...ScanData[key]);
    }

    return acc;
  }, {} as Dataset);

  useEffect(() => {}, [personData]);

  const exportToPDF = async () => {
    try {
      const pdf = new jsPDF();
      const linkColor = [0, 0, 255];
      const lineHeight = 10;
      const margin = 15;
      const headerHeight = 20;
      const footerHeight = 20;
      const contentWidth = pdf.internal.pageSize.width - 2 * margin;
      const contentHeight =
        pdf.internal.pageSize.height - headerHeight - footerHeight;

      const addJustifiedText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number
      ) => {
        const words = text.split(" ");
        let line = "";
        let currentY = y;

        words.forEach((word) => {
          const testLine = line + word + " ";
          const textWidth = pdf.getTextWidth(testLine);
          if (textWidth > maxWidth) {
            const lineWidth = pdf.getTextWidth(line.trim());
            const spaces = line.split(" ").length - 1;
            const spaceWidth = spaces > 0 ? (maxWidth - lineWidth) / spaces : 0;

            let xOffset = x;
            line.split(" ").forEach((word, index) => {
              if (index > 0) {
                xOffset += spaceWidth;
              }
              pdf.text(word, xOffset, currentY);
              xOffset += pdf.getTextWidth(word);
            });

            line = word + " ";
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        });
        pdf.text(line.trim(), x, currentY);
        return currentY + lineHeight;
      };

      const addParagraph = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        maxHeight: number,
        justify: boolean = false
      ) => {
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line) => {
          if (y + lineHeight > maxHeight) {
            pdf.addPage();
            y = margin + headerHeight;
          }
          if (justify) {
            y = addJustifiedText(line, x, y, maxWidth);
          } else {
            pdf.text(line, x, y);
            y += lineHeight;
          }
        });
        return y;
      };

      const selectedPersonName = personData?.englishName;
      if (!selectedPersonName) {
        notification.error({
          message: "Error",
          description: "No person selected.",
        });
        return;
      }

      // Use personData directly
      const selectedPersonData = typedDataset[selectedPersonName];
      if (!selectedPersonData) {
        notification.error({
          message: "Error",
          description: `Data for ${selectedPersonName} not found.`,
        });
        return;
      }

      let yOffset = margin + headerHeight;

      // Render the person's name and other details
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);

      const nameWidth = pdf.getTextWidth(
        selectedPersonData.details.englishName
      );
      const nameX = (pdf.internal.pageSize.width - nameWidth) / 2;
      pdf.text(selectedPersonData.details.englishName, nameX, yOffset);
      pdf.setLineWidth(0.5);
      pdf.line(
        margin,
        yOffset + 2,
        pdf.internal.pageSize.width - margin,
        yOffset + 2
      );
      yOffset += lineHeight + 4; // Slightly increase spacing after name

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "normal");

      yOffset = addParagraph(
        `AKA English: ${selectedPersonData.details.akaEnglish}`,
        margin,
        yOffset,
        contentWidth,
        contentHeight
      );

      yOffset = addParagraph(
        `Organizations: ${selectedPersonData.details.organizations}`,
        margin,
        yOffset,
        contentWidth,
        contentHeight
      );

      yOffset = addParagraph(
        `Designation: ${selectedPersonData.details.designations}`,
        margin,
        yOffset,
        contentWidth,
        contentHeight
      );

      if (selectedPersonData.events.length === 0) {
        yOffset = addParagraph(
          "No events available.",
          margin,
          yOffset,
          contentWidth,
          contentHeight
        );
      } else {
        selectedPersonData.events.forEach((event, eventIndex) => {
          if (eventIndex > 0) {
            pdf.addPage();
            yOffset = margin + headerHeight;
          }

          pdf.setFontSize(16);
          pdf.setFont("helvetica", "bold");
          yOffset = addParagraph(
            `Event: ${event.Event}`,
            margin,
            yOffset,
            contentWidth,
            contentHeight
          );

          pdf.setFontSize(14);
          pdf.setFont("helvetica", "normal");
          yOffset = addParagraph(
            `Date: ${new Date(event.StartDate.$date).toLocaleDateString()}`,
            margin,
            yOffset,
            contentWidth,
            contentHeight
          );
          yOffset = addParagraph(
            `Keywords: ${event.keywords.join(", ")}`,
            margin,
            yOffset,
            contentWidth,
            contentHeight
          );

          yOffset = addParagraph(
            `AML: ${Object.keys(event.AML)
              .filter((key) => event.AML[key].length > 0)
              .join(", ")}`,
            margin,
            yOffset,
            contentWidth,
            contentHeight
          );

          event.Headlines.forEach((headline, index) => {
            if (yOffset > contentHeight - margin) {
              pdf.addPage();
              yOffset = margin + headerHeight;
            }

            pdf.setFont("helvetica", "bold");
            yOffset = addParagraph(
              `Headline: ${headline}`,
              margin,
              yOffset,
              contentWidth,
              contentHeight
            );

            if (index < event.Urls.length) {
              pdf.setFont("helvetica", "normal");
              pdf.setTextColor(...linkColor);
              yOffset = addParagraph(
                event.Urls[index],
                margin,
                yOffset,
                contentWidth,
                contentHeight - margin
              );
              pdf.setTextColor(0, 0, 0);
            }

            if (index < event.Description.length) {
              yOffset = addParagraph(
                event.Description[index],
                margin,
                yOffset,
                contentWidth,
                contentHeight - margin,
                true
              );
            }

            yOffset += 4; // Add a small space after each paragraph

            if (event.Headlines.length > 0) {
              pdf.setFont("helvetica", "normal");

              yOffset = addParagraph(
                `Additional Headlines: ${event.Headlines.slice(1).join(", ")}`,
                margin,
                yOffset,
                contentWidth,
                contentHeight - margin
              );
            }

            pdf.setFont("helvetica", "bold");
            yOffset = addParagraph(
              `Sources: ${event.Sources.join(", ")}`,
              margin,
              yOffset,
              contentWidth,
              contentHeight - margin
            );
          });
        });
      }

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "italic");

      pdf.save("PEP-result-data.pdf");
      notification.success({
        message: "Success",
        description: "PDF saved successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      notification.error({
        message: "Error",
        description: `Error generating PDF: ${error.message}`,
      });
    }
  };

  const items = [
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
        <div className="mt-5 flex flex-row gap-10">
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
      <Modal
        title={
          <div className="w-full bg-modal_bg flex justify-center items-center p-2 rounded-t-lg">
            <span className="text-primary">Are you sure?</span>
            <div className="flex flex-col gap-5">
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                className={`${styles.label} ${
                  !checkAll && "!font-normal !text-text_color"
                }`}
              >
                All Events{" "}
                <Tag className={`bg-blue ${styles.filtertags}`}>
                  {criticalEvents + nonCriticalEvents}
                </Tag>
              </Checkbox>

              <CheckboxGroup
                className="flex gap-5"
                value={checkedList}
                onChange={onChange}
              >
                {NEWS_CATEGORIES.map((category) => (
                  <Checkbox
                    key={category}
                    value={category}
                    className={`${styles.label} ${
                      !checkedList.includes(category) &&
                      "!font-normal !text-text_color"
                    }`}
                  >
                    {category}{" "}
                    <Tag
                      className={`${TAG_COLORS[category]} ${styles.filtertags}`}
                    >
                      {category === "Critical"
                        ? criticalEvents
                        : category === "Non Critical"
                        ? nonCriticalEvents
                        : category === "Keywords"
                        ? keywordsArray.length
                        : 0}
                    </Tag>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={330}
        footer={null}
      ></Modal>
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
          onClick={showModal}
        >
          Download
        </LinkButton>
      </div>

      <span className={styles.line} />

      <Tabs defaultActiveKey="1" items={items} />

      <SecondaryButton onClick={() => navigate(ROUTES.result)}>
        Back
      </SecondaryButton>
    </section>
  );
};
