import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

import { AppContext } from "../../contexts/AppContext";

import { DatasetItem } from "../../api/result.api";

import { ROUTES } from "../../constants/routes";

import { styles } from "../../assets/styles";
import { DetailsResponse, fetchDetails } from "../../api/details.api";

interface ResultTableData {
  key: number;
  englishName: string;
  designation: string;
  organization: string;
  newsEvents: number;
  keywords: number;
  critical: number;
  nonCritical: number;
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
    dataIndex: "englishName",
    key: "englishName",
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
    dataIndex: "keywords",
    key: "keywords",
    align: "center",
    render: (keywords: number) => (
      <Tag key={keywords} className={`bg-pink border-none ${styles.tableTags}`}>
        {keywords}
      </Tag>
    ),
  },
  {
    title: "Critical",
    dataIndex: "critical",
    key: "critical",
    align: "center",
    render: (critical: number) => (
      <Tag key={critical} className={`bg-red border-none ${styles.tableTags}`}>
        {critical}
      </Tag>
    ),
  },
  {
    title: "Non-Critical",
    dataIndex: "nonCritical",
    key: "nonCritical",
    align: "center",
    render: (nonCritical: number) => (
      <Tag
        key={nonCritical}
        className={`bg-green border-none ${styles.tableTags}`}
      >
        {nonCritical}
      </Tag>
    ),
  },
];

const dataSource: ResultTableData[] = [
  {
    key: 1,
    englishName: "Shah Mehmood Qureshi",
    designation: "Prime Minister",
    organization: "PTI",
    newsEvents: 25,
    keywords: 25,
    critical: 25,
    nonCritical: 25,
  },
];
export const ResultTable = () => {
  const navigate = useNavigate();
  const { startDate, endDate, dataset } = useContext(AppContext);
  //const [dataSource, setDataSource] = useState<ResultTableData[]>([]);

  // const cachedData: ResponseData | undefined = queryClient.getQueryData(
  //   endpoints.result.cacheKey
  // );
  // const resultdata = cachedData?.data.urduEvents;

  // useEffect(() => {
  //   if (resultdata) {
  //     const transformedData = resultdata.map((item: Events, index: number) => ({
  //       key: index + 1,
  //       englishName: item.OriginalKeyword,
  //       designation: "",
  //       organization: "",
  //       newsEvents: item.record.Events,
  //       critical: item.record.negativeSentiments,
  //       nonCritical: item.record.postiveSentiments,
  //       keywords: item.record.neturalsentSentiments,
  //     }));
  //     setDataSource(transformedData);
  //   }
  // }, [resultdata]);

  const handleRowClick = async (record: ResultTableData) => {
    const name = record.englishName;
    const result: DatasetItem = dataset.find(
      (item) => item.englishName === name
    );
    const resultArray: DatasetItem[] = [result];

    const response: DetailsResponse = await fetchDetails({
      startDate,
      endDate,
      dataset: resultArray,
    });

    navigate(ROUTES.details, {
      state: result,
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
      rowClassName="cursor-pointer"
    />
  );
};
