import { useState, useEffect } from "react";
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
  Designation: string;
  Relationship: string;
  PrimarySecondary: string;
}

export type DataType = Item;

export const PreviewTable = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    //table data in json format is fetched from home page
    setDataSource(data);
  }, []);

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
      title: "AKA (English)",
      dataIndex: "Alias_English",
      key: "Alias_English",
      align: "center",
      editable: true,
    },
    {
      title: "AKA (Urdu)",
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
    {
      title: "Designation",
      dataIndex: "Designation",
      key: "Designation",
      align: "center",
      editable: true,
    },
    {
      title: "Relationship",
      dataIndex: "Relationship",
      key: "Relationship",
      align: "center",
      editable: true,
    },
    {
      title: "Primary/Secondary",
      dataIndex: "PrimarySecondary",
      key: "PrimarySecondary",
      align: "center",
      editable: true,
    },
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, {
      ...newData[index],
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => ({
    ...col,
    onCell: (record: DataType) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave,
    }),
  }));

  return (
    <Table
      components={components}
      size="middle"
      dataSource={dataSource}
      columns={columns as ColumnTypes}
    />
  );
};
