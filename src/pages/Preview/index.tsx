// Preview.tsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DownloadOutlined,
  CloseOutlined,
  SaveOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { AppContext } from "../../contexts/AppContext";
import { useAntdUseApp } from "../../hooks/useAntdUseApp";
import { LinkButton, PrimaryButton } from "../../components/Button";
import { PreviewTable } from "./PreviewTable";
import { ROUTES } from "../../constants/routes";
import { styles } from "../../assets/styles";
import { useMutation } from "@tanstack/react-query";
import { RequestData, ResponseData, result } from "../../api/result.api";
import { Spin } from "antd";

export const Preview = () => {
  const { startDate, endDate, dataset } = useContext(AppContext);
  const notification = useAntdUseApp();

  const [changesMade, setChangesMade] = useState(false);
  useAntdUseApp();
  const navigate = useNavigate();

  const ScanMutation = useMutation(
    result({
      notification: notification,
    })
  );

  const handleScanClick = async () => {
    const formData: RequestData = {
      startDate,
      endDate,
      dataset,
    };

    const response: ResponseData = await ScanMutation.mutateAsync(formData);
    if (response.success) {
      console.log(response.data);
      navigate(ROUTES.result);
    }
  };

  if (ScanMutation.isPending) {
    return (
      <div className="min-h-[90vh] flex flex-col justify-center gap-5 text-center">
        <h5 className="!text-black">
          Please wait while the system processes your file
        </h5>
        <p>It may take a few minutes</p>
        <Spin indicator={<LoadingOutlined className="text-[50px]" spin />} />
      </div>
    );
  }

  const handleCancelClick = () => {
    navigate(ROUTES.home);
  };

  const handleDownloadClick = () => {
    const exportButton = document.querySelector("#export-button");
    if (exportButton) {
      (exportButton as HTMLButtonElement).click();
    }
  };

  const handleDiscardClick = () => {
    const discardButton = document.querySelector("#discard-button");
    if (discardButton) {
      (discardButton as HTMLButtonElement).click();
    }
  };

  const handleSaveClick = () => {
    const saveButton = document.querySelector("#save-button");
    if (saveButton) {
      (saveButton as HTMLButtonElement).click();
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading2}>Preview List</h2>
      <div className="flex justify-between">
        <p>
          <span className={styles.label}>Date Range: </span>
          {startDate} - {endDate}
        </p>
        <div className="flex gap-5">
          <LinkButton
            icon={<CloseOutlined />}
            onClick={handleDiscardClick}
            disabled={!changesMade}
          >
            Discard Changes
          </LinkButton>
          <LinkButton
            icon={<SaveOutlined />}
            className="text-primary"
            onClick={handleSaveClick}
            disabled={!changesMade}
          >
            Save Changes
          </LinkButton>
          <div className="flex gap-5">
            <LinkButton
              icon={<DownloadOutlined />}
              className="text-primary font-bold"
              onClick={handleDownloadClick}
            >
              Download
            </LinkButton>
          </div>
        </div>
      </div>
      <PreviewTable setChangesMade={setChangesMade} />
      <div className="flex items-center gap-5">
        <LinkButton onClick={handleCancelClick}>Cancel</LinkButton>
        <PrimaryButton onClick={handleScanClick}>Scan</PrimaryButton>
      </div>
      <button id="export-button" style={{ display: "none" }} />
      <button id="discard-button" style={{ display: "none" }} />
      <button id="save-button" style={{ display: "none" }} />
    </section>
  );
};
