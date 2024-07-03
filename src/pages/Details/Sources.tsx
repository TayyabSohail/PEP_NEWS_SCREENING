import { Card } from "antd";
import {
  FileTextOutlined,
  ReadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import { styles } from "../../assets/styles";

const sourcesData = [
  {
    icon: <FileTextOutlined className="text-5xl" />,
    title: "Dawn NEWS",
    url: "https://www.dawn.com/news/1697598/firs-against-tv-anchorhttps://www.dawn.com/news/1697598/firs-against-tv-anchorhttps://www.dawn.com/news/1697598/firs-against-tv-anchorhttps://www.dawn.com/news/1697598/firs-against-tv-anchor",
  },
  {
    icon: <ReadOutlined className="text-5xl" />,
    title: "ARY NEWS",
    url: "https://www.dawn.com/news/1697598/firs-against-tv-anchorhttps: //www.dawn.com/news/1 697598/firs- against-tv-anchorhttps://www.dawn.com/news/1697598/firs-against-tv-anchorhttps://www.dawn.com/news/1697598/firs-against-tv-anchor",
  },
  {
    icon: <GlobalOutlined className="text-5xl" />,
    title: "GEO NEWS",
    url: "https://www.dawn.com/news/1697598/firs-against-tv-anchorhttps: //www.dawn.com/news/ 1697598/firs-ag ainst-tv-anchorhttps://www.dawn.com/news/1697598/firs-against-tv-anchorhttps://www.dawn.com/news/1697598/firs- against-tv-anchor",
  },
];

export const Sources = () => {
  return (
    <div className={styles.box}>
      <h3 className={styles.heading3}>Sources</h3>

      <p className={styles.label}>
        Pakistan minister ditched offshore plans amid `concerns` over tax
        authority
      </p>

      {sourcesData.map((source, index) => (
        <Card key={index} className="border-none shadow-none">
          <div className="flex items-center gap-5">
            <>{source.icon}</>
            <div className="w-full flex flex-col gap-2">
              <p className={styles.label}>{source.title}</p>
              <a href={source.url} className="line-clamp-1">
                {source.url}
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
