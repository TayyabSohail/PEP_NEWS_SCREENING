import { Card } from "antd";
import {
  FileTextOutlined,
  ReadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import { styles } from "../../assets/styles";

const newsData = [
  {
    icon: <FileTextOutlined className="text-5xl" />,
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    title: "DAWN NEWS",
    date: "15/07/2022",
  },
  {
    icon: <ReadOutlined className="text-5xl" />,
    news: "A minister of Pakistan ditched offshore plans due to concerns over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    title: "ARY NEWS",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    title: "Samaa TV",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    news: "A minister of Pakistan ditched offshore plans due to concerns over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    title: "Geo NEWS",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    title: "BOL NEWS",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    title: "BOL NEWS",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    title: "BOL NEWS",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authorityPakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    title: "BOL NEWS",
    date: "15/07/2022",
  },
];

export const NewsDetails = () => {
  return (
    <div className="w-2/3 flex flex-col gap-5 overflow-y-auto max-h-[390px] pr-2">
      {newsData.map((item, index) => (
        <Card key={index} className="border border-light_gray">
          <div className="flex items-center gap-5 p-2">
            {item.icon}
            <div className="line-clamp-1 flex flex-col gap-1">
              <h6 className={`line-clamp-1 ${styles.heading6}`}>{item.news}</h6>
              <p className="font-semibold">{item.title}</p>
              <p>{item.date}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
