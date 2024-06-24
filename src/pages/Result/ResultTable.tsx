import { Table, Tag } from "antd";

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
];

export const ResultTable = () => {
  const columns = [
    {
      title: "Serial Number",
      dataIndex: "Serial_Number",
      key: "Serial_Number",
    },
    {
      title: "English Name",
      dataIndex: "English_Name",
      key: "English_Name",
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
    },
    {
      title: "NEWS Events",
      dataIndex: "NEWS_Events",
      key: "NEWS_Events",
      render: (NEWS_Events: number) => (
        <Tag color="blue" key={NEWS_Events}>
          {NEWS_Events}
        </Tag>
      ),
    },
    {
      title: "Keywords",
      dataIndex: "Keywords",
      key: "Keywords",
      render: (keywords: number) => (
        <Tag color="pink" key={keywords}>
          {keywords}
        </Tag>
      ),
    },
    {
      title: "Critical",
      dataIndex: "Critical",
      key: "Critical",
      render: (Critical: number) => (
        <Tag color="red" key={Critical}>
          {Critical}
        </Tag>
      ),
    },
    {
      title: "Non-Critical",
      dataIndex: "Non_Critical",
      key: "Non_Critical",
      render: (Non_Critical: number) => (
        <Tag color="green" key={Non_Critical}>
          {Non_Critical}
        </Tag>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};
