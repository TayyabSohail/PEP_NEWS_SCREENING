import { useState } from "react";

import { Table } from "antd";

import { EditableRow } from "./EditableRow";
import { EditableCell } from "./EditableCell";

export interface Item {
  key: string;
  Serial: string;
  English_Name: string;
  Urdu_Name: string;
  Alias_English: string;
  Alias_Urdu: string;
  Organization: string;
}

export type DataType = Item;

export type EditableTableProps = Parameters<typeof Table>[0];

export type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const PreviewTable = () => {
  // TODO: add data from API
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      Serial: "1",
      English_Name: "John smith",
      Urdu_Name: "john",
      Alias_English: "jhonny",
      Alias_Urdu: "jonn",
      Organization: "PTI",
    },
    {
      key: "1",
      Serial: "2",
      English_Name: "Imran Khan",
      Urdu_Name: "niazi",
      Alias_English: "Immmy",
      Alias_Urdu: "Khan",
      Organization: "PTI",
    },
    {
      key: "2",
      Serial: "3",
      English_Name: "Bilawal Bhutto",
      Urdu_Name: "Bhutto",
      Alias_English: "BB",
      Alias_Urdu: "Bilalwal",
      Organization: "PPP",
    },
  ]);

  // defaultColumns
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
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
      editable: true,
    },
    {
      title: "Urdu Name",
      dataIndex: "Urdu_Name",
      key: "Urdu_Name",
      align: "center",
      editable: true,
    },
    {
      title: "AKA(English)",
      dataIndex: "Alias_English",
      key: "Alias_English",
      align: "center",
      editable: true,
    },
    {
      title: "AKA(Urdu)",
      dataIndex: "Alias_Urdu",
      key: "Alias_Urdu",
      align: "center",
      editable: true,
    },
    {
      title: "Organization",
      dataIndex: "Organization",
      key: "Organization",
      align: "center",
      editable: true,
    },
  ];

  // handleSave function
  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  // components for editable table
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // transform columns to editable columns
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <Table
      components={components}
      size="middle"
      dataSource={dataSource}
      columns={columns as ColumnTypes}
    />
  );
};
