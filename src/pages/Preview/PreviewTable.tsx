import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  Serial: string;
  English_Name: string;
  Urdu_Name: string;
  Alias_English: string;
  Alias_Urdu: string;
  Organization: string;
}

const columns: ColumnsType = [
  {
    title: "Serial Number",
    dataIndex: "Serial",
    key: "Serial",
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
    title: "Urdu Name",
    dataIndex: "Urdu_Name",
    key: "Urdu_Name",
    align: "center",
  },
  {
    title: "AKA(English)",
    dataIndex: "Alias_English",
    key: "Alias_English",
    align: "center",
  },
  {
    title: "AKA(Urdu)",
    dataIndex: "Alias_Urdu",
    key: "Alias_Urdu",
    align: "center",
  },

  {
    title: "Organization",
    dataIndex: "Organization",
    key: "Organization",
    align: "center",
  },
];

const data: DataType[] = [
  {
    Serial: "1",
    English_Name: "John smith",
    Urdu_Name: "john",
    Alias_English: "jhonny",
    Alias_Urdu: "jonn",
    Organization: "PTI",
  },
  {
    Serial: "2",
    English_Name: "Imran Khan",
    Urdu_Name: "niazi",
    Alias_English: "Immmy",
    Alias_Urdu: "Khan",
    Organization: "PTI",
  },
  {
    Serial: "3",
    English_Name: "Bilawal Bhutto",
    Urdu_Name: "Bhutto",
    Alias_English: "BB",
    Alias_Urdu: "Bilalwal",
    Organization: "PPP",
  },
];

export const PreviewTable = () => {
  return <Table size="middle" columns={columns} dataSource={data} />;
};
