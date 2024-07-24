import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DownloadOutlined } from "@ant-design/icons";

import { AppContext } from "../../contexts/AppContext";

import { LinkButton, SecondaryButton } from "../../components/Button";
import { ResultTable } from "./ResultTable";

import { ROUTES } from "../../constants/routes";

import { styles } from "../../assets/styles";

export const Result = () => {
  // Get the context values
  const { startDate, endDate } = useContext(AppContext);

  const navigate = useNavigate();

  const handleExitButton = () => {
    navigate(ROUTES.home);
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
