import { Card } from "antd";

import { useLocation } from "react-router-dom";

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

import { queryClient } from "../../utils/react-query.service";
import { endpoints } from "../../utils/api.service";

import { DetailsResponseItem } from "../../api/details.api";
import { fetchNewsDetails, NewsDetailRequest } from "../../api/news.api";

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

const extractSourceFromUrl = (url: string): NewspaperNames | null => {
  if (url.includes("tribune.com.pk")) return "Tribune";
  if (url.includes("dawn.com")) return "Dawn";
  if (url.includes("jang.com.pk")) return "Jang";
  if (url.includes("nawaiwaqt.com.pk")) return "Nawaiwaqt";
  if (url.includes("dunya.com.pk")) return "Dunya";
  if (url.includes("bbc.com")) return "BBC";
  if (url.includes("pakistantoday.com.pk")) return "Pakistan Today";
  if (url.includes("brecorder.com")) return "Business Recorder";
  if (url.includes("dailytimes.com.pk")) return "Daily Times";
  return null;
};

export const NewsDetails = () => {
  const location = useLocation();
  const { personData } = location.state;
  const cachedData: DetailsResponseItem | undefined = queryClient.getQueryData(
    endpoints.details.cacheKey
  );

  const headlines = cachedData?.Headlines || [];
  const urls = cachedData?.Urls || [];
  const startDate = cachedData?.StartDate?.$date || "";

  const handleNewsDetails = async (headline: string, date: string) => {
    const requestData: NewsDetailRequest = {
      newsDate: date,
      Headline: headline,
      englishName: personData.englishName,
    };
    const data = await fetchNewsDetails(requestData);
    console.log(data);
  };

  return (
    <div className="w-2/3 flex flex-col gap-5 overflow-y-auto max-h-[390px] pr-2">
      {headlines.map((headline, index) => {
        const source = extractSourceFromUrl(urls[index]);
        return (
          <Card
            key={index}
            className="border border-light_gray cursor-pointer"
            onClick={() =>
              handleNewsDetails(
                headline,
                new Date(startDate).toLocaleDateString()
              )
            }
          >
            <div className="flex items-center gap-5 p-2">
              {source ? (
                newspaperIcons[source]
              ) : (
                <FileTextOutlined className="text-5xl" />
              )}
              <div className="line-clamp-1 flex flex-col gap-1">
                <h6 className={`line-clamp-1 ${styles.heading6}`}>
                  {headline}
                </h6>
                <p className="font-semibold">{source || "Unknown Source"}</p>
                <p>{new Date(startDate).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
