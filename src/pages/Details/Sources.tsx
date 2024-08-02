import { Card } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import { styles } from "../../assets/styles";
import BR from "../../assets/icons/BR.png";
import DT from "../../assets/icons/DT.jpg";
import Dawn from "../../assets/icons/Dawn.jpg";
import Pak_Today from "../../assets/icons/Paksitan_Today.png";
import Tribune from "../../assets/icons/Tribune.png";
import bbc_urdu from "../../assets/icons/bbc_urdu.png";
import Dunya from "../../assets/icons/dunya.png";
import Jang from "../../assets/icons/jang.png";
import Nawaiwaqt from "../../assets/icons/nawaiwaqt.png";

type NewspaperNames =
  | "Jang"
  | "Nawaiwaqt"
  | "Dunya"
  | "BBC"
  | "Dawn"
  | "Tribune"
  | "Pakistan Today"
  | "Business Recorder"
  | "Daily Times";

// Mapping of newspaper names to their icons
const newspaperIcons: Record<NewspaperNames, JSX.Element> = {
  Jang: <img src={Jang} alt="Jang" className="w-10 h-10" />,
  Nawaiwaqt: <img src={Nawaiwaqt} alt="Nawaiwaqt" className="w-10 h-10" />,
  Dunya: <img src={Dunya} alt="Dunya" className="w-10 h-10" />,
  BBC: <img src={bbc_urdu} alt="BBC" className="w-10 h-10" />,
  Dawn: <img src={Dawn} alt="Dawn" className="w-10 h-10" />,
  Tribune: <img src={Tribune} alt="Tribune" className="w-10 h-10" />,
  "Pakistan Today": (
    <img src={Pak_Today} alt="Pakistan Today" className="w-10 h-10" />
  ),
  "Business Recorder": (
    <img src={BR} alt="Business Recorder" className="w-10 h-10" />
  ),
  "Daily Times": <img src={DT} alt="Daily Times" className="w-10 h-10" />,
};

// Sample data to mimic the received API data
const sourcesData = [
  {
    title: "Dawn",
    url: "https://www.dawn.com/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "Jang",
    url: "https://jang.com/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "BBC",
    url: "https://www.bbc.com/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "Nawaiwaqt",
    url: "https://www.nawaiwaqt.com.pk/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "Dunya",
    url: "https://dunya.com/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "Tribune",
    url: "https://tribune.com/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "Pakistan Today",
    url: "https://www.pakistantoday.com.pk/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "Business Recorder",
    url: "https://www.brecorder.com/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "Daily Times",
    url: "https://dailytimes.com.pk/news/1697598/firs-against-tv-anchor",
  },
];

export const Sources = () => {
  return (
    <div className={styles.box}>
      <h3 className={styles.heading3}>Sources</h3>

      {sourcesData.map((source, index) => (
        <Card key={index} className="border-none shadow-none">
          <div className="flex items-center gap-5">
            {newspaperIcons[source.title as NewspaperNames] || (
              <FileTextOutlined className="text-5xl" />
            )}
            <div className="line-clamp-1 flex flex-col gap-2">
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
