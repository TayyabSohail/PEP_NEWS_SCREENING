import { DownloadOutlined } from "@ant-design/icons";
import { SecondaryButton, LinkButton } from "../../components/Button";
import { PEPDetailsCard } from "./pepDetails";
import { NewsComponent } from "./Sources";

import { styles } from "../../assets/styles";

export const Summary = () => {
  return (
    <section className={`!gap-2 ${styles.section} flex flex-col h-full`}>
      <p>
        <span className={styles.label}>Date Range: </span>
        05/07/2020 - 05/07/2022
      </p>

      <div className="flex items-center justify-between mb-4">
        <h2 className={styles.heading2}>
          Pakistan minister ditched offshore plans amid ‘concerns’ over tax
          authority
        </h2>
        <LinkButton
          icon={<DownloadOutlined />}
          className="text-primary font-bold"
        >
          Download
        </LinkButton>
      </div>

      <p className={styles.label}>Imran Khan Niazi</p>
      <p className="font-semibold text-black">Primary PEP</p>

      <div className="border-t border-slate_gray my-4"></div>

      <div className="flex flex-row h-2/3">
        <NewsComponent />
        <PEPDetailsCard />
      </div>

      <div className="flex">
        {/* Additional content or components can be added here */}
      </div>

      <SecondaryButton>Back</SecondaryButton>
    </section>
  );
};
