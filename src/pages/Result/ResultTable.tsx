import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { AppContext } from "../../contexts/AppContext";
import { DatasetItem, ResponseData } from "../../api/result.api";
import { ROUTES } from "../../constants/routes";
import { styles } from "../../assets/styles";
import { queryClient } from "../../utils/react-query.service";
import { endpoints } from "../../utils/api.service";

export interface ResultTableData {
  key: number;
  name: string;
  designation: string;
  organization: string;
  newsEvents: number;
  uniqueKeywords: number;
  criticalEvents: number;
  nonCriticalEvents: number;
}

const columns: ColumnsType<ResultTableData> = [
  {
    title: "Serial Number",
    dataIndex: "key",
    key: "key",
    width: 130,
    align: "center",
  },
  {
    title: "English Name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    align: "center",
  },
  {
    title: "Organization",
    dataIndex: "organization",
    key: "organization",
    align: "center",
  },
  {
    title: "NEWS Events",
    dataIndex: "newsEvents",
    key: "newsEvents",
    align: "center",
    render: (newsEvents: number) => (
      <Tag
        key={newsEvents}
        className={`bg-blue border-none ${styles.tableTags}`}
      >
        {newsEvents}
      </Tag>
    ),
  },
  {
    title: "Keywords",
    dataIndex: "uniqueKeywords",
    key: "uniqueKeywords",
    align: "center",
    render: (uniqueKeywords: number) => (
      <Tag
        key={uniqueKeywords}
        className={`bg-pink border-none ${styles.tableTags}`}
      >
        {uniqueKeywords}
      </Tag>
    ),
  },
  {
    title: "Critical",
    dataIndex: "criticalEvents",
    key: "criticalEvents",
    align: "center",
    render: (criticalEvents: number) => (
      <Tag
        key={criticalEvents}
        className={`bg-red border-none ${styles.tableTags}`}
      >
        {criticalEvents}
      </Tag>
    ),
  },
  {
    title: "Non-Critical",
    dataIndex: "nonCriticalEvents",
    key: "nonCriticalEvents",
    align: "center",
    render: (nonCriticalEvents: number) => (
      <Tag
        key={nonCriticalEvents}
        className={`bg-green border-none ${styles.tableTags}`}
      >
        {nonCriticalEvents}
      </Tag>
    ),
  },
];

export const ResultTable = () => {
  const navigate = useNavigate();
  const { dataset } = useContext(AppContext);
  const [dataSource, setDataSource] = useState<ResultTableData[]>([]);

  const cachedData: ResponseData | undefined = queryClient.getQueryData(
    endpoints.result.cacheKey
  );
  const ScanData = cachedData?.data;

  useEffect(() => {
    if (ScanData) {
      const nameMap: Record<
        string,
        {
          newsEvents: number;
          keywords: string[];
          criticalEvents: number;
          nonCriticalEvents: number;
          designation: string;
          organization: string;
        }
      > = {};

      Object.entries(ScanData).forEach(([name, events]) => {
        if (Array.isArray(events)) {
          const keywords: string[] = [];
          let criticalEvents = 0;
          let nonCriticalEvents = 0;

          events.forEach((event) => {
            if (Array.isArray(event.keywords)) {
              keywords.push(...event.keywords);
            }

            if (event.Sentiment_Prediction) {
              if (event.Sentiment_Prediction === "negative") {
                criticalEvents++;
              } else {
                nonCriticalEvents++;
              }
            }
          });

          nameMap[name] = {
            newsEvents: events.length,
            keywords: [...new Set(keywords)],
            criticalEvents,
            nonCriticalEvents,
            designation: "",
            organization: "",
          };
        }
      });

      dataset.forEach((item) => {
        if (nameMap[item.englishName]) {
          nameMap[item.englishName].designation = item.designations || "";
          nameMap[item.englishName].organization = item.organizations || "";
        }
      });

      const transformedData = Object.entries(nameMap).map(
        ([name, data], index) => ({
          key: index + 1,
          name,
          designation: data.designation,
          organization: data.organization,
          newsEvents: data.newsEvents,
          uniqueKeywords: data.keywords.length,
          criticalEvents: data.criticalEvents,
          nonCriticalEvents: data.nonCriticalEvents,
        })
      );

      setDataSource(transformedData);
    }
  }, [ScanData, dataset]);

  const handleRowClick = async (record: ResultTableData) => {
    console.log(record.name);
    const result: DatasetItem | undefined = dataset.find(
      (item) => item.englishName === record.name
    );

    navigate(ROUTES.details, {
      state: result,
    });
  };

  return (
    <Table
      id="resultTable"
      size="middle"
      columns={columns}
      dataSource={dataSource}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })}
      rowClassName="cursor-pointer"
    />
  );
};
