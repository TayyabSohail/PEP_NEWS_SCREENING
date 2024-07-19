import { useContext } from "react";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { DateRangeContext } from "../../contexts/DateRangeContext";

import { SecondaryButton, LinkButton } from "../../components/Button";

import { PEPDetails } from "./PEPDetails";
import { NewsDetails } from "./NewsDetails";
import { NewsSummary } from "./NewsSummary";

import { styles } from "../../assets/styles";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Event Summary",
    children: <NewsSummary />,
  },
  {
    key: "2",
    label: "NEWS Event",
    children: <NewsSummary />,
  },
];

export const Summary = () => {
  const { startDate, endDate } = useContext(DateRangeContext);

  return (
    <section className={`${styles.section}`}>
      <h2 className={styles.heading2}>
        Pakistan minister ditched offshore plans amid `concerns` over tax
        authority
      </h2>

      <p className={styles.label}>Imran Khan Niazi - Primary PEP</p>

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

      <div className="flex flex-row gap-10">
        <NewsDetails />
        <PEPDetails />
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        className="p-5 rounded-lg bg-light_blue"
      />

      <SecondaryButton>Back</SecondaryButton>
    </section>
  );
};
