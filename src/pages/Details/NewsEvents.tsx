import { useState } from "react";

import { Checkbox, Card, Tag } from "antd";
import type { CheckboxProps } from "antd";

import { styles } from "../../assets/styles";

const CheckboxGroup = Checkbox.Group;

const NEWS_CATEGORIES = ["Keywords", "Critical", "Non Critical"] as const;

type NEWS_CATEGORY_TYPE = (typeof NEWS_CATEGORIES)[number];

const TAG_COLORS = {
  Keywords: "bg-pink",
  Critical: "bg-red",
  "Non Critical": "bg-green",
};

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

export const NewsEvents = () => {
  const [checkedList, setCheckedList] = useState<NEWS_CATEGORY_TYPE[]>([
    "Keywords",
  ]);

  const checkAll = NEWS_CATEGORIES.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < NEWS_CATEGORIES.length;

  const onChange = (list: NEWS_CATEGORY_TYPE[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? Array.from(NEWS_CATEGORIES) : []);
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
          <Checkbox
            value="Keywords"
            className={`${styles.label} ${
              !checkedList.includes("Keywords") &&
              "!font-normal !text-text_color"
            }`}
          >
            Keywords <Tag className={`bg-pink ${styles.filtertags}`}>05</Tag>
          </Checkbox>
          <Checkbox
            value="Critical"
            className={`${styles.label} ${
              !checkedList.includes("Critical") &&
              "!font-normal !text-text_color"
            }`}
          >
            Critical <Tag className={`bg-red ${styles.filtertags}`}>05</Tag>
          </Checkbox>
          <Checkbox
            value="Non Critical"
            className={`${styles.label} ${
              !checkedList.includes("Non Critical") &&
              "!font-normal !text-text_color"
            }`}
          >
            Non Critical{" "}
            <Tag className={`bg-green ${styles.filtertags}`}>05</Tag>
          </Checkbox>
        </CheckboxGroup>
      </div>

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
