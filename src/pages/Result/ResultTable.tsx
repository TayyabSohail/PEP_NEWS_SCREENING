import { Table, Tag } from "antd";

import { styles } from "../../assets/styles";
import { ColumnsType } from "antd/es/table";

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
    width: 120,
    align: "center",
  },
  {
    title: "English Name",
    dataIndex: "English_Name",
    key: "English_Name",
    align: "center",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Designation",
    dataIndex: "Designation",
    key: "Designation",
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
      <Tag color="#DEEFFF" key={NEWS_Events} className={styles.Table_Tag}>
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
      <Tag color="#FBDBFE" key={keywords} className={styles.Table_Tag}>
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
      <Tag color="#FFC9C9" key={Critical} className={styles.Table_Tag}>
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
      <Tag color="#D1FADB" key={Non_Critical} className={styles.Table_Tag}>
        {Non_Critical}
      </Tag>
    ),
  },
];

export const ResultTable = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      className="result-table"
      bordered
    />
  );
};
