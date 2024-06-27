import { createContext } from "react";

import type { FormInstance } from "antd";

import { Form } from "antd";

export const EditableContext = createContext<FormInstance | null>(null);

interface EditableRowProps {
  index: number;
  children: React.ReactNode;
}

export const EditableRow = (props: EditableRowProps) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
