import { DownloadOutlined } from "@ant-design/icons";
import { SecondaryButton, LinkButton } from "../../components/Button";

import { LanguageFilter } from "./languageFilter";
import { PEPDetailsCard } from "./PEPDetails";
import { Events } from "./Events";
import { Sources } from "./Sources";

import { styles } from "../../assets/styles";

export const Details = () => {
  return (
    <section className={`!gap-3 ${styles.section}`}>
      <div className="!m-0 !p-0 flex flex-row gap-10">
        <h2 className={styles.heading2}>01 Imran Khan Niazi</h2>
        <h2 className={styles.heading2}>عمران خان نیازی</h2>
      </div>
      <div className=" !m-0 !p-0 flex justify-between">
        <p>
          <span className={styles.label}>Date Range: </span>
          05/07/2020 - 05/07/2022
        </p>

        <LinkButton
          icon={<DownloadOutlined />}
          className="text-primary font-bold"
        >
          Download
        </LinkButton>
      </div>

      <div className="border-t border-slate_gray my-0 py-0"></div>

      {/* Add language filter */}
      <LanguageFilter />
      <div className="flex flex-row gap-10">
        <div className=" w-2/3">
          <Events />
        </div>
        <div className="flex flex-col gap-5">
          <PEPDetailsCard />
          <Sources />
        </div>
      </div>

      {/* add sections */}

      <SecondaryButton>Back</SecondaryButton>
    </section>
  );
};
