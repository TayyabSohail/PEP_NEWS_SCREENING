import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Card } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import BR from "../../assets/icons/BR.png";
import DT from "../../assets/icons/DT.jpg";
import Dawn from "../../assets/icons/Dawn.jpg";
import Pak_Today from "../../assets/icons/Paksitan_Today.png";
import Tribune from "../../assets/icons/Tribune.png";
import bbc_urdu from "../../assets/icons/bbc_urdu.png";
import Dunya from "../../assets/icons/dunya.png";
import Jang from "../../assets/icons/jang.png";
import Nawaiwaqt from "../../assets/icons/nawaiwaqt.png";

import {
  DatasetItem,
  ResponseData,
  ResponseEvent,
  ResponseItem,
} from "../../api/result.api";
import { endpoints } from "../../utils/api.service";
import { queryClient } from "../../utils/react-query.service";

import { styles } from "../../assets/styles";

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

interface SourceDetails {
  title: string;
  url: string;
}
const sourcesData = [
  {
    title: "Dawn",
    url: "https://www.dawn.com",
  },
  {
    title: "Jang",
    url: "https://jang.com.pk",
  },
  {
    title: "BBC",
    url: "https://www.bbc.com",
  },
  {
    title: "Nawaiwaqt",
    url: "https://www.nawaiwaqt.com.pk",
  },
  {
    title: "Dunya",
    url: "https://dunyanews.tv",
  },
  {
    title: "Tribune",
    url: "https://tribune.com.pk",
  },
  {
    title: "Pakistan Today",
    url: "https://www.pakistantoday.com.pk",
  },
  {
    title: "Business Recorder",
    url: "https://www.brecorder.com",
  },
  {
    title: "Daily Times",
    url: "https://dailytimes.com.pk",
  },
];

export const Sources = () => {
  const location = useLocation();
  const personData: DatasetItem = location.state;
  const [dataSource, setDataSource] = useState<SourceDetails[]>([]);

  useEffect(() => {
    const cachedData: ResponseData | undefined = queryClient.getQueryData(
      endpoints.result.cacheKey
    );
    const ScanData: ResponseItem = cachedData?.data ?? {};
    const events: ResponseEvent[] = ScanData[personData.englishName];

    if (events) {
      const sourceUrlMap = new Map<string, string>();

      events.forEach((event: ResponseEvent) => {
        event.Sources.forEach((source) => {
          const matchedSource = sourcesData.find((src) => src.title === source);
          if (matchedSource && !sourceUrlMap.has(source)) {
            sourceUrlMap.set(source, matchedSource.url);
          }
        });
      });

      const mappedData: SourceDetails[] = Array.from(
        sourceUrlMap.entries()
      ).map(([title, url]) => ({ title, url }));

      setDataSource(mappedData);
    }
  }, [personData]);

  return (
    <div className={styles.box}>
      <h3 className={styles.heading3}>Sources</h3>

      {dataSource.map((source: SourceDetails, index: number) => (
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
