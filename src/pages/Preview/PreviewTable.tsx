import { createContext, useContext, useEffect, useRef, useState } from "react";

import type { GetRef, InputRef } from "antd";
import { Form, Input, Table } from "antd";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = createContext<FormInstance<unknown> | null>(null);

interface Item {
  key: string;
  Serial: string;
  English_Name: string;
  Urdu_Name: string;
  Alias_English: string;
  Alias_Urdu: string;
  Organization: string;
}

type EditableRowProps = {
  index: number;
} & React.HTMLAttributes<HTMLTableRowElement>;

const EditableRow = (props: EditableRowProps) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      values && handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        className="m-0"
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input
          className="!w-fit !h-6"
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div onClick={toggleEdit}>{children}</div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  Serial: string;
  English_Name: string;
  Urdu_Name: string;
  Alias_English: string;
  Alias_Urdu: string;
  Organization: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const PreviewTable = () => {
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

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
