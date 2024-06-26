import {
  DownloadOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { LinkButton, PrimaryButton } from "../../components/Button";

import { styles } from "../../assets/styles";
import { PreviewTable } from "./PreviewTable";

export const Preview = () => {
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
        <PrimaryButton>Scan</PrimaryButton>
      </div>
    </section>
  );
};
