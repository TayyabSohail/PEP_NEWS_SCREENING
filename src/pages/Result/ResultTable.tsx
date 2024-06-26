import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

import { styles } from "../../assets/styles";

interface ResultTable {
  Serial_Number: number;
  English_Name: string;
  Designation: string;
  Organization: string;
  NEWS_Events: number;
  Keywords: number;
  Critical: number;
  Non_Critical: number;
}

const data: ResultTable[] = [
  {
    Serial_Number: 1,
    English_Name: "John Doe",
    Designation: "Software Engineer",
    Organization: "ABC Inc.",
    NEWS_Events: 3,
    Keywords: 10,
    Critical: 5,
    Non_Critical: 5,
  },
  {
    Serial_Number: 2,
    English_Name: "Jane Smith",
    Designation: "Product Manager",
    Organization: "XYZ Corp.",
    NEWS_Events: 5,
    Keywords: 8,
    Critical: 3,
    Non_Critical: 5,
  },
  {
    Serial_Number: 3,
    English_Name: "Jane Smith",
    Designation: "Product Manager",
    Organization: "XYZ Corp.",
    NEWS_Events: 5,
    Keywords: 8,
    Critical: 3,
    Non_Critical: 5,
  },
];

const columns: ColumnsType = [
  {
    title: "Serial Number",
    dataIndex: "Serial_Number",
    key: "Serial_Number",
    width: 130,
    align: "center",
  },
  {
    title: "English Name",
    dataIndex: "English_Name",
    key: "English_Name",
    align: "center",
  },
  {
    title: "Designation",
    dataIndex: "Designation",
    key: "Designation",
    align: "center",
  },
  {
    title: "Organization",
    dataIndex: "Organization",
    key: "Organization",
    align: "center",
  },
  {
    title: "NEWS Events",
    dataIndex: "NEWS_Events",
    key: "NEWS_Events",
    align: "center",
    render: (NEWS_Events: number) => (
      <Tag
        key={NEWS_Events}
        className={`bg-blue border-none ${styles.tableTags}`}
      >
        {NEWS_Events}
      </Tag>
    ),
  },
  {
    title: "Keywords",
    dataIndex: "Keywords",
    key: "Keywords",
    align: "center",
    render: (keywords: number) => (
      <Tag key={keywords} className={`bg-pink border-none ${styles.tableTags}`}>
        {keywords}
      </Tag>
    ),
  },
  {
    title: "Critical",
    dataIndex: "Critical",
    key: "Critical",
    align: "center",
    render: (Critical: number) => (
      <Tag key={Critical} className={`bg-red border-none ${styles.tableTags}`}>
        {Critical}
      </Tag>
    ),
  },
  {
    title: "Non-Critical",
    dataIndex: "Non_Critical",
    key: "Non_Critical",
    align: "center",
    render: (Non_Critical: number) => (
      <Tag
        key={Non_Critical}
        className={`bg-green border-none ${styles.tableTags}`}
      >
        {Non_Critical}
      </Tag>
    ),
  },
];

export const ResultTable = () => {
  return <Table size="middle" columns={columns} dataSource={data} />;
};
