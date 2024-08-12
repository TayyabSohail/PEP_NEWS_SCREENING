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
import { queryClient } from "../../utils/react-query.service";
import { endpoints } from "../../utils/api.service";
import { DetailsResponseItem } from "../../api/details.api";

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

export const NewsDetails = () => {
  const cachedData: DetailsResponseItem | undefined = queryClient.getQueryData(
    endpoints.details.cacheKey
  );
  const headlines = cachedData?.Headlines || [];
  const sources = cachedData?.Sources || [];
  const startDate = cachedData?.StartDate?.$date || "";

  return (
    <div className="w-2/3 flex flex-col gap-5 overflow-y-auto max-h-[390px] pr-2">
      {headlines.map((headline, index) => (
        <Card key={index} className="border border-light_gray">
          <div className="flex items-center gap-5 p-2">
            {newspaperIcons[sources[index] as NewspaperNames] || (
              <FileTextOutlined className="text-5xl" />
            )}
            <div className="line-clamp-1 flex flex-col gap-1">
              <h6 className={`line-clamp-1 ${styles.heading6}`}>{headline}</h6>
              <p className="font-semibold">
                {sources[index] || "Unknown Source"}
              </p>
              <p>{new Date(startDate).toLocaleDateString()}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
