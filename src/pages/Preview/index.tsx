import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { Spin } from "antd";
import {
  DownloadOutlined,
  CloseOutlined,
  SaveOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { AppContext } from "../../contexts/AppContext";

import { RequestData, result, ResponseData } from "../../api/result.api";

import { useAntdUseApp } from "../../hooks/useAntdUseApp";

import { LinkButton, PrimaryButton } from "../../components/Button";
import { PreviewTable } from "./PreviewTable";

import { ROUTES } from "../../constants/routes";

import { styles } from "../../assets/styles";

export const Preview = () => {
  // Get the context values
  const { startDate, endDate, dataset } = useContext(AppContext);

  const notification = useAntdUseApp();

  const navigate = useNavigate();

  // const ScanMutation = useMutation(
  //   result({
  //     notification: notification,
  //   })
  // );

  // const handleScanClick = async () => {
  //   const formData: RequestData = {
  //     startDate,
  //     endDate,
  //     dataset,
  //   };

  //   const response: ResponseData = await ScanMutation.mutateAsync(formData);
  //   if (response.success) {
  //     navigate(ROUTES.result);
  //   }
  // };

  // if (ScanMutation.isPending) {
  //   return (
  //     <div className="min-h-[90vh] flex flex-col justify-center gap-5 text-center">
  //       <h5 className="!text-black">
  //         Please wait while the system processes your file
  //       </h5>
  //       <p>It may take a few minutes</p>
  //       <Spin indicator={<LoadingOutlined className="text-[50px]" spin />} />
  //     </div>
  //   );
  // }

  const handleScanClick = () => {
    navigate(ROUTES.result);
  };
  const handleCancelClick = () => {
    navigate(ROUTES.home);
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
        <LinkButton onClick={handleCancelClick}>Cancel</LinkButton>
        <PrimaryButton onClick={handleScanClick}>Scan</PrimaryButton>
      </div>
    </section>
  );
};
