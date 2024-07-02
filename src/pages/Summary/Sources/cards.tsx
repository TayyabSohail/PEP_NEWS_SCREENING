import React from "react";
import { Card as AntCard } from "antd";
import {
  FileTextOutlined,
  ReadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import { styles } from "../../../assets/styles";

interface CardProps {
  title: string;
  news: string;
  date: string;
}

export const Cards: React.FC<CardProps> = ({ title, news, date }) => {
  const iconClass = "text-xl";
  let icon;

  if (title === "DAWN NEWS") {
    icon = <FileTextOutlined className={iconClass} />;
  } else if (title === "ARY NEWS") {
    icon = <ReadOutlined className={iconClass} />;
  } else {
    icon = <GlobalOutlined className={iconClass} />;
  }

  return (
    <AntCard className={`bg-white mb-2 p-1 `}>
      <div className="flex items-center">
        <div className="mr-4">{icon}</div>
        <div>
          <p className={`text-black ${styles.label}`}>{news}</p>
          <h3>{title}</h3>
          <p className="text-gray">{date}</p>
        </div>
      </div>
    </AntCard>
  );
};
