import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "English NEWS",
  },
  {
    key: "2",
    label: "Urdu NEWS",
  },
];

export const LanguageFilter = () => {
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
