import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DownloadOutlined } from "@ant-design/icons";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { notification } from "antd";

import { AppContext } from "../../contexts/AppContext";
import { LinkButton, SecondaryButton } from "../../components/Button";
import { ResultTable } from "./ResultTable";
import { ROUTES } from "../../constants/routes";
import { styles } from "../../assets/styles";

export const Result = () => {
  const { startDate, endDate } = useContext(AppContext);
  const navigate = useNavigate();

  const handleExitButton = () => {
    navigate(ROUTES.home);
  };

  const exportToPDF = async () => {
    const input = document.getElementById("resultTable");
    if (!input) {
      notification.error({
        message: "Error",
        description: "Result table not found",
      });
      return;
    }
    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("PEP-result-data.pdf");
      notification.success({
        message: "Success",
        description: "PDF saved successfully",
      });
    } catch (error) {
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

      {/* Result Table */}
      <ResultTable />
      <div className="flex items-center gap-5">
        <SecondaryButton onClick={handleExitButton}>Exit</SecondaryButton>
      </div>
    </section>
  );
};
