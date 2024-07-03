import { Card, Tag } from "antd";

import { NewsFilters } from "./NewsFilters";

import { styles } from "../../../assets/styles";

interface NewsEvent {
  title: string;
  details: string;
  date: string;
  category: string;
}

const newsEvents: NewsEvent[] = [
  {
    title:
      "Pakistan minister ditched offshore plans amid concerns over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP),A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)",
    date: "06/12/2021",
    category: "Keywords",
  },
  {
    title:
      "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP) as a prominent politician – a “politically exposed person” (PEP),A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)",
    date: "06/12/2021",
    category: "Critical",
  },

  {
    title:
      "Pakistan minister ditched offshore plans amid concerns over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP) as a prominent politician – a “politically exposed person” (PEP),A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)",
    date: "06/12/2021",
    category: "Non Critical",
  },
  {
    title:
      "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP),A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)",
    date: "06/12/2021",
    category: "Keywords",
  },
  {
    title:
      "Pakistan minister ditched offshore plans amid concerns over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)",
    date: "06/12/2021",
    category: "Critical",
  },

  {
    title:
      "Pakistan minister ditched offshore plans amid concerns over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)",
    date: "06/12/2021",
    category: "Non Critical",
  },
  {
    title:
      "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP)",
    date: "06/12/2021",
    category: "Keywords",
  },
];

const TAG_COLORS = {
  Keywords: "bg-pink",
  Critical: "bg-red",
  "Non Critical": "bg-green",
};

export const NewsEvents = () => {
  return (
    <div className="flex flex-col gap-10">
      <NewsFilters />
      <div className="flex flex-col gap-10">
        {newsEvents.map((news, index) => (
          <Card
            key={index}
            bordered={false}
            className="!border-none !shadow-none cursor-pointer"
          >
            <div className="flex gap-5">
              <Tag
                className={`${
                  TAG_COLORS[news.category as keyof typeof TAG_COLORS]
                } ${styles.cardTags}`}
              />
              <div className="w-full flex flex-col gap-1">
                <h5 className={`${styles.heading5} !text-black`}>
                  {news.title}
                </h5>
                <p className="line-clamp-2">{news.details}</p>
                <p> {news.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
