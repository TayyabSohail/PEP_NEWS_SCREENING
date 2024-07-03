import { useState } from "react";

import { Checkbox, Card, Tag } from "antd";
import type { CheckboxProps } from "antd";

import { styles } from "../../assets/styles";

const CheckboxGroup = Checkbox.Group;

const NEWS_CATEGORIES = ["Keywords", "Critical", "Non Critical"] as const;

type NEWS_CATEGORY_TYPE = (typeof NEWS_CATEGORIES)[number];

const TAG_COLORS: Record<NEWS_CATEGORY_TYPE, string> = {
  Keywords: "bg-pink",
  Critical: "bg-red",
  "Non Critical": "bg-green",
};

interface NewsEvent {
  title: string;
  details: string;
  date: string;
  category: NEWS_CATEGORY_TYPE;
}

const newsEvents: NewsEvent[] = [
  {
    title:
      "Pakistan minister ditched offshore plans amid concerns over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP).",
    date: "06/12/2021",
    category: "Keywords",
  },
  {
    title:
      "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP).",
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

export const NewsEvents = () => {
  const [checkedList, setCheckedList] = useState<NEWS_CATEGORY_TYPE[]>([
    "Keywords",
  ]);
  const [filteredNewsEvents, setFilteredNewsEvents] = useState<NewsEvent[]>(
    newsEvents.filter((news) => checkedList.includes(news.category))
  );

  // Determine if all checkboxes are checked or some are checked
  const checkAll = NEWS_CATEGORIES.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < NEWS_CATEGORIES.length;

  // Handle checkbox group change
  const onChange = (list: NEWS_CATEGORY_TYPE[]) => {
    setCheckedList(list);
    setFilteredNewsEvents(
      newsEvents.filter((news) => list.includes(news.category))
    );
  };

  // Handle "Check All" checkbox change
  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? Array.from(NEWS_CATEGORIES) : []);
    setFilteredNewsEvents(e.target.checked ? newsEvents : []);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-5">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
          className={`${styles.label} ${
            !checkAll && "!font-normal !text-text_color"
          }`}
        >
          All Events <Tag className={`bg-blue ${styles.filtertags}`}>25</Tag>
        </Checkbox>

        <CheckboxGroup
          className="flex gap-5"
          value={checkedList}
          onChange={onChange}
        >
          {NEWS_CATEGORIES.map((category) => (
            <Checkbox
              key={category}
              value={category}
              className={`${styles.label} ${
                !checkedList.includes(category) &&
                "!font-normal !text-text_color"
              }`}
            >
              {category}{" "}
              <Tag className={`${TAG_COLORS[category]} ${styles.filtertags}`}>
                05
              </Tag>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>

      <div className="flex flex-col gap-10">
        {filteredNewsEvents.map((news, index) => (
          <Card
            key={index}
            bordered={false}
            className="!border-none !shadow-none cursor-pointer"
          >
            <div className="flex gap-5">
              <Tag
                className={`${TAG_COLORS[news.category]} ${styles.cardTags}`}
              />
              <div className="w-full flex flex-col gap-1">
                <h5 className={`${styles.heading5} !text-black`}>
                  {news.title}
                </h5>
                <p className="line-clamp-2">{news.details}</p>
                <p>{news.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
