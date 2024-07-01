import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Event Summary",
  },
  {
    key: "2",
    label: "NEWS Event",
  },
];

export const EventTab = () => {
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
