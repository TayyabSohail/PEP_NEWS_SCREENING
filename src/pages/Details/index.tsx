import { Tabs } from "antd";
import type { TabsProps } from "antd";

import { DownloadOutlined } from "@ant-design/icons";
import { SecondaryButton, LinkButton } from "../../components/Button";

import { PEPDetailsCard } from "./PEPDetails";
import { Events } from "./Events";
import { Sources } from "./Sources";

import { styles } from "../../assets/styles";

export const Details = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "English NEWS",
    },
    {
      key: "2",
      label: "Urdu NEWS",
    },
  ];

  return (
    <section className={`${styles.section}`}>
      <div className="flex flex-row gap-10">
        <h2 className={styles.heading2}>01 Imran Khan Niazi</h2>
        <h2 className={styles.heading2}>عمران خان نیازی</h2>
      </div>
      <div className="flex justify-between">
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

      <span className={styles.line} />

      {/* Add language filter */}
      <Tabs defaultActiveKey="1" items={items} />
      <div className="flex flex-row gap-10">
        <div className="w-2/3">
          <Events />
        </div>
        <div className="w-1/3 flex flex-col gap-10">
          <PEPDetailsCard />
          <Sources />
        </div>
      </div>

      {/* add sections */}

      <SecondaryButton>Back</SecondaryButton>
    </section>
  );
};
