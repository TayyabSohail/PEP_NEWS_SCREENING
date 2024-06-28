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
  url: string;
}

 export const Cards: React.FC<CardProps> = ({ title, url }) => {
  let icon;
  const iconClass = "text-xl";

  if (title === "Dawn NEWS") {
    icon = <FileTextOutlined className={iconClass} />;
  } else if (title === "ARY NEWS") {
    icon = <ReadOutlined className={iconClass} />;
  } else {
    icon = <GlobalOutlined className={iconClass} />;
  }

  return (
    <AntCard className="mb-4 border-none shadow-none bg-white">
      <div className="flex items-center">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className={`mb-2 ${styles.label}`}>{title}</h3>
          <a href={url} className="text-black">
            {url}
          </a>
        </div>
      </div>
    </AntCard>
  );
};

