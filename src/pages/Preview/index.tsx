import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Spin } from "antd";
import {
  DownloadOutlined,
  CloseOutlined,
  SaveOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { LinkButton, PrimaryButton } from "../../components/Button";
import { PreviewTable } from "./PreviewTable";

import { styles } from "../../assets/styles";

import { ROUTES } from "../../constants/routes";

export const Preview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const performScreening = () => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      navigate(ROUTES.result);
    }, 5000);

    return () => clearTimeout(timer);
  };

  if (loading) {
    return (
      <div className="min-h-[90vh] flex flex-col justify-center gap-5 text-center">
        <h5 className={`!text-black ${styles.heading5}`}>
          Please wait while the system processes your file
        </h5>
        <p>It may take few minutes</p>
        <Spin indicator={<LoadingOutlined className="text-[50px]" spin />} />
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading2}>Preview List</h2>
      <div className="flex justify-between">
        <p>
          <span className={styles.label}>Date Range: </span>
          05/07/2020 - 05/07/2022
        </p>
        <div className="flex gap-5">
          <LinkButton icon={<CloseOutlined />}>Discard Changes</LinkButton>
          <LinkButton icon={<SaveOutlined />} className="text-primary">
            Save Changes
          </LinkButton>
          <div className="flex gap-5">
            <LinkButton
              icon={<DownloadOutlined />}
              className="text-primary font-bold"
            >
              Download
            </LinkButton>
          </div>
        </div>
      </div>

      {/* Preview Table */}
      <PreviewTable />
      <div className="flex items-center gap-5">
        <LinkButton>Cancel</LinkButton>
        <PrimaryButton onClick={performScreening}>Scan</PrimaryButton>
      </div>
    </section>
  );
};
