import { useContext } from "react";

import { Tabs } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";

import { DateRangeContext } from "../../contexts/DateRangeContext";

import { SecondaryButton, LinkButton } from "../../components/Button";

import { PEPDetails } from "./PEPDetails";
import { NewsEvents } from "./NewsEvents";
import { Sources } from "./Sources";

import { styles } from "../../assets/styles";

export const Details = () => {
  const { startDate, endDate } = useContext(DateRangeContext);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "English NEWS",
      children: (
        <div className="mt-5 flex gap-10">
          <div className="w-2/3">
            <NewsEvents />
          </div>
          <div className="w-1/3 flex flex-col gap-10">
            <PEPDetails />
            <Sources />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Urdu NEWS",
      children: (
        <div className="mt-5  flex flex-row gap-10">
          <div className="w-2/3">
            <NewsEvents />
          </div>
          <div className="w-1/3 flex flex-col gap-10">
            <PEPDetails />
            <Sources />
          </div>
        </div>
      ),
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
          {startDate} - {endDate}
        </p>

        <LinkButton
          icon={<DownloadOutlined />}
          className="text-primary font-bold"
        >
          Download
        </LinkButton>
      </div>

      <span className={styles.line} />

      {/* English and Urdu News */}
      <Tabs defaultActiveKey="1" items={items} />

      <SecondaryButton>Back</SecondaryButton>
    </section>
  );
};
