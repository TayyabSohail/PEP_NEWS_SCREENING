import React from "react";
import { Card as AntCard } from "antd";
import {
  FileTextOutlined,
  ReadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import { styles } from "../../assets/styles";

const newsData = [
  {
    icon: <FileTextOutlined className="text-5xl" />,
    title: "DAWN NEWS",
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    date: "15/07/2022",
  },
  {
    icon: <ReadOutlined className="text-5xl" />,
    title: "ARY NEWS",
    news: "A minister of Pakistan ditched offshore plans due to concerns over tax authority",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    title: "Samaa TV",
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    title: "Geo NEWS",
    news: "A minister of Pakistan ditched offshore plans due to concerns over tax authority",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    title: "BOL NEWS",
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    title: "BOL NEWS",
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    title: "BOL NEWS",
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    date: "15/07/2022",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    title: "BOL NEWS",
    news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    date: "15/07/2022",
  },
];

export const NewsComponent: React.FC = () => {
  return (
    <div className="news-container ">
      {newsData.map((item, index) => (
        <AntCard key={index} className="mb-2 border border-light_gray">
          <div className="flex items-center gap-5">
            {item.icon}
            <div className="flex flex-col gap-2">
              <p className={styles.label}>{item.title}</p>
              <p>{item.news}</p>
              <p>{item.date}</p>
            </div>
          </div>
        </AntCard>
      ))}
    </div>
  );
};
