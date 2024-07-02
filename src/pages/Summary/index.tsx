import { DownloadOutlined } from "@ant-design/icons";
import { SecondaryButton, LinkButton } from "../../components/Button";

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
        <h2 className={styles.heading2}>
          Pakistan minister ditched offshore plans amid ‘concerns’ over tax
          authority
        </h2>
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

      <div className="border-t border-slate_gray my-0 py-0"></div>

      {/* add sections */}
      <div className="flex flex-row gap-5 h-1/3 ">
        {/* add sources wala daba */}
        {/* add pep details wala daba */}
      </div>
      <div className=" p-7 rounded-md shadow-md bg-light_blue ">
        <EventTab />
        <SummaryCard />
      </div>

      <SecondaryButton>Back</SecondaryButton>
    </section>
  );
};
