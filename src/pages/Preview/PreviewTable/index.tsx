import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Table } from "antd";

import { EditableRow } from "./EditableRow";
import { EditableCell } from "./EditableCell";

export interface Item {
  key: string;
  ID: number;
  englishName: string;
  urduName: string;
  akaEnglish: string;
  akaUrdu: string;
  organizations: string;
  designations: string;
  relationships: string;
  primarySecondary: string;
}

export type DataType = Item;

export type EditableTableProps = Parameters<typeof Table>[0];
export type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const PreviewTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const location = useLocation();
  const { dataSet } = location.state as { dataSet: DataType[] };

  useEffect(() => {
    if (dataSet) {
      const transformedData = dataSet.map((item, index) => ({
        ...item,
        key: (index + 1).toString(),
        Serial: (index + 1).toString(),
      }));
      setDataSource(transformedData);
    }
  }, [dataSet]);

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
      dataIndex: "englishName",
      key: "English Name",
      align: "center",
      editable: true,
    },
    {
      title: "Urdu Name",
      dataIndex: "urduName",
      key: "Urdu Name",
      align: "center",
      editable: true,
    },
    {
      title: "AKA (English)",
      dataIndex: "akaEnglish",
      key: "AKA (English)",
      align: "center",
      editable: true,
    },
    {
      title: "AKA (Urdu)",
      dataIndex: "akaUrdu",
      key: "AKA (Urdu)",
      align: "center",
      editable: true,
    },
    {
      title: "Organization",
      dataIndex: "organizations",
      key: "Organization",
      align: "center",
      editable: true,
    },
    {
      title: "Designation",
      dataIndex: "designations",
      key: "Designation",
      align: "center",
      editable: true,
    },
    {
      title: "Relationship",
      dataIndex: "relationships",
      key: "Relationship",
      align: "center",
      editable: true,
    },
    {
      title: "Primary/Secondary",
      dataIndex: "primarySecondary",
      key: "Primary/Secondary",
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
