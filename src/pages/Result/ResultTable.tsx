import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

import { queryClient } from "../../utils/react-query.service";
import { endpoints } from "../../utils/api.service";
import { Events, ResponseData } from "../../api/result.api";
import { ROUTES } from "../../constants/routes";

import { styles } from "../../assets/styles";

interface ResultTabledata {
  Serial_Number: number;
  English_Name: string;
  Designation: string;
  Organization: string;
  NEWS_Events: number;
  Keywords: number;
  Critical: number;
  Non_Critical: number;
}

const columns: ColumnsType = [
  {
    title: "Serial Number",
    dataIndex: "Serial",
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
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<Events[]>([]);

  const cachedData: ResponseData | undefined = queryClient.getQueryData(
    endpoints.result.cacheKey
  );
  const resultdata = cachedData?.data.urduEvents;

  useEffect(() => {
    if (resultdata) {
      const transformedData = resultdata.map((item: Events, index: number) => ({
        ...item,
        key: (index + 1).toString(),
        Serial: (index + 1).toString(),
        English_Name: item.OriginalKeyword,
        Keywords: item.record.neturalsentSentiments,
        NEWS_Events: item.record.Events,
        Critical: item.record.negativeSentiments,
        Non_Critical: item.record.postiveSentiments,
      }));
      setDataSource(transformedData);
    }
  }, [resultdata]);

  const handleRowClick = (record: ResultTabledata) => {
    navigate(ROUTES.details, {
      state: record.English_Name,
    });
  };

  return (
    <Table
      size="middle"
      columns={columns}
      dataSource={dataSource}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })}
    />
  );
};
