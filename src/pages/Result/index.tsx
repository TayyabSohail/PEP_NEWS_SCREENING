import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DownloadOutlined } from "@ant-design/icons";

import jsPDF from "jspdf";

import { notification } from "antd";

import { AppContext } from "../../contexts/AppContext";

import { LinkButton, SecondaryButton } from "../../components/Button";
import { ResultTable } from "./ResultTable";
import { ROUTES } from "../../constants/routes";
import { styles } from "../../assets/styles";

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

export const Result = () => {
  const { startDate, endDate, dataset: rawDataset } = useContext(AppContext);
  const navigate = useNavigate();

  const cachedData: ResponseData | undefined = queryClient.getQueryData(
    endpoints.result.cacheKey
  );

  const ScanData: ResponseItem = cachedData?.data ?? {};

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

  const handleExitButton = () => {
    navigate(ROUTES.home);
  };

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
            const spaceWidth = (maxWidth - lineWidth) / spaces;

            let xOffset = x;
            line.split(" ").forEach((word, index) => {
              if (index > 0) {
                xOffset += spaceWidth;
              }
              pdf.text(word, xOffset, currentY);
              xOffset += pdf.getTextWidth(word) + spaceWidth;
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

      Object.entries(typedDataset).forEach(
        ([personKey, personData], personIndex) => {
          if (personIndex > 0) {
            pdf.addPage();
          }

          let yOffset = margin + headerHeight;

          // Title and Details
          pdf.setFontSize(18);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(0, 0, 0);

          const nameWidth = pdf.getTextWidth(personData.details.englishName);
          const nameX = (pdf.internal.pageSize.width - nameWidth) / 2;
          pdf.text(personData.details.englishName, nameX, yOffset);
          pdf.setLineWidth(0.5);
          pdf.line(
            margin,
            yOffset + 2,
            pdf.internal.pageSize.width - margin,
            yOffset + 2
          );
          yOffset += lineHeight;

          pdf.setFontSize(14);
          pdf.setFont("helvetica", "normal");

          yOffset = addParagraph(
            `AKA English: ${personData.details.akaEnglish}`,
            margin,
            yOffset,
            contentWidth,
            contentHeight,
            false
          );

          yOffset = addParagraph(
            `Organizations: ${personData.details.organizations}`,
            margin,
            yOffset,
            contentWidth,
            contentHeight,
            false
          );

          yOffset = addParagraph(
            `Designation: ${personData.details.designations}`,
            margin,
            yOffset,
            contentWidth,
            contentHeight,
            false
          );

          if (personData.events.length === 0) {
            yOffset = addParagraph(
              "No events available.",
              margin,
              yOffset,
              contentWidth,
              contentHeight,
              false
            );
          } else {
            personData.events.forEach((event, eventIndex) => {
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
                contentHeight,
                false
              );

              pdf.setFontSize(14);
              pdf.setFont("helvetica", "normal");
              yOffset = addParagraph(
                `Date: ${new Date(event.StartDate.$date).toLocaleDateString()}`,
                margin,
                yOffset,
                contentWidth,
                contentHeight,
                false
              );
              yOffset = addParagraph(
                `Keywords: ${event.keywords.join(", ")}`,
                margin,
                yOffset,
                contentWidth,
                contentHeight,
                false
              );

              yOffset = addParagraph(
                `AML: ${Object.keys(event.AML)
                  .filter((key) => event.AML[key].length > 0)
                  .join(", ")}`,
                margin,
                yOffset,
                contentWidth,
                contentHeight,
                false
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
                  contentHeight,
                  false
                );

                if (index < event.Urls.length) {
                  pdf.setFont("helvetica", "normal");
                  pdf.setTextColor(...linkColor);
                  yOffset = addParagraph(
                    event.Urls[index],
                    margin,
                    yOffset,
                    contentWidth,
                    contentHeight - margin,
                    false
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
                    true // Apply justification for description
                  );
                }
              });

              if (event.Headlines.length > 0) {
                pdf.setFont("helvetica", "normal");

                yOffset = addParagraph(
                  `Additional Headlines: ${event.Headlines.slice(1).join(
                    ", "
                  )}`,
                  margin,
                  yOffset,
                  contentWidth,
                  contentHeight - margin,
                  false
                );

                pdf.setTextColor(...linkColor);
                yOffset = addParagraph(
                  `Additional URLs: ${event.Urls.slice(1).join(", ")}`,
                  margin,
                  yOffset,
                  contentWidth,
                  contentHeight - margin,
                  false
                );
                pdf.setTextColor(0, 0, 0);

                yOffset = addParagraph(
                  `Additional Descriptions: ${event.Description.slice(1).join(
                    ", "
                  )}`,
                  margin,
                  yOffset,
                  contentWidth,
                  contentHeight - margin,
                  false
                );
              }

              pdf.setFont("helvetica", "bold");
              yOffset = addParagraph(
                `Sources: ${event.Sources.join(", ")}`,
                margin,
                yOffset,
                contentWidth,
                contentHeight - margin,
                false
              );
            });
          }

          pdf.setFontSize(10);
          pdf.setFont("helvetica", "italic");
        }
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

  return (
    <section className={styles.section}>
      <h2 className={styles.heading2}>Result</h2>
      <div className="flex justify-between">
        <p>
          <span className={styles.label}>Date Range: </span>
          {startDate} - {endDate}
        </p>
        <div className="flex gap-5">
          <LinkButton
            icon={<DownloadOutlined />}
            className="text-primary font-bold"
            onClick={exportToPDF}
          >
            Download
          </LinkButton>
        </div>
      </div>

      <ResultTable />

      <div className="flex items-center gap-5">
        <SecondaryButton onClick={handleExitButton}>Exit</SecondaryButton>
      </div>
    </section>
  );
};
