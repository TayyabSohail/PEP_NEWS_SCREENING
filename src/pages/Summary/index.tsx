import { DownloadOutlined } from "@ant-design/icons";
import { SecondaryButton, LinkButton } from "../../components/Button";
import { PEPDetailsCard } from "./PEPDetails";
import { NewsComponent } from "./Sources";

import { EventTab } from "./eventTab";
import { SummaryCard } from "./summaryCard";

import { styles } from "../../assets/styles";

export const Summary = () => {
  return (
    <section className={`!gap-2 ${styles.section}`}>
      <p>
        <span className={styles.label}>Date Range: </span>
        05/07/2020 - 05/07/2022
      </p>

      <div className="!m-0 !p-0 flex flex-row gap-10">
        <h3 className={styles.heading3}>
          Pakistan minister ditched offshore plans amid ‘concerns’ over tax
          authority
        </h3>
      </div>
      <p className={styles.label}>Imran Khan Niazi</p>
      <div className=" !m-0 !p-0 flex justify-between">
        <p className="font-semibold text-black">Primary PEP</p>
        <LinkButton
          icon={<DownloadOutlined />}
          className="text-primary font-bold"
        >
          Download
        </LinkButton>
      </div>

      <span className={styles.line} />

      <div className="flex flex-row gap-5">
        <div className=" w-2/3">
          <NewsComponent />
        </div>

        <div className="w-1/3">
          <PEPDetailsCard />
        </div>
      </div>

      <div className="flex">
        {/* Additional content or components can be added here */}
      </div>
      <div className=" mt-5 mb-5 p-7 rounded-md shadow-md bg-light_blue ">
        <EventTab />
        <SummaryCard />
      </div>

      <SecondaryButton>Back</SecondaryButton>
    </section>
  );
};
