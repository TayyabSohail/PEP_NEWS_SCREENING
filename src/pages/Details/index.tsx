import { DownloadOutlined } from "@ant-design/icons";
import { SecondaryButton, LinkButton } from "../../components/Button";

import { styles } from "../../assets/styles";
import { PEPDetailsCard } from "./PEPDetails";

export const Details = () => {
  return (
    <section className={styles.section}>
      <div className="flex flex-row gap-10">
        <h2 className={styles.heading2}>01 Imran Khan Niazi</h2>
        <h2 className={styles.heading2}>عمران خان نیازی</h2>
      </div>
      <div className="flex justify-between">
        <p>
          <span className={styles.label}>Date Range: </span>
          05/07/2020 - 05/07/2022
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

      <PEPDetailsCard />
      {/* add sections */}
      <div className="flex items-center gap-5">
        <SecondaryButton>Back</SecondaryButton>
      </div>
    </section>
  );
};
