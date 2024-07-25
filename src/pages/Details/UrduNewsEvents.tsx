import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Checkbox, Card, Tag } from "antd";
import type { CheckboxProps } from "antd";

import { Events, ItemDetails, ResponseData } from "../../api/result.api";

import { queryClient } from "../../utils/react-query.service";
import { endpoints } from "../../utils/api.service";

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
  details: string[];
  date: string;
  category: NEWS_CATEGORY_TYPE;
}

export const UrduNewsEvents = () => {
  const location = useLocation();
  const name = location.state;
  const [dataSource, setDataSource] = useState<NewsEvent[]>([]);
  console.log(name);
  // function to randomly assign categories to each news
  function getRandomValueFromArray<T>(array: readonly T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  // formatting the date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const cachedData: ResponseData | undefined = queryClient.getQueryData(
      endpoints.result.cacheKey
    );
    const resultdata = cachedData?.data.urduEvents;
    const news: Events[] =
      resultdata?.filter((event: Events) => event.OriginalKeyword === name) ||
      [];
    const mappedData: NewsEvent[] = news.flatMap(
      (event) =>
        event.item?.map((record: ItemDetails) => ({
          title: record.eventName,
          details: record.descriptions,
          date: formatDate(record.dte),
          category: getRandomValueFromArray(NEWS_CATEGORIES),
        })) || []
    );
    setDataSource(mappedData);
  }, [name]);
  console.log(dataSource);

  const [checkedList, setCheckedList] = useState<NEWS_CATEGORY_TYPE[]>([
    "Keywords",
  ]);
  const [filteredNewsEvents, setFilteredNewsEvents] = useState<NewsEvent[]>(
    dataSource.filter((news) => checkedList.includes(news.category))
  );

  // Determine if all checkboxes are checked or some are checked
  const checkAll = NEWS_CATEGORIES.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < NEWS_CATEGORIES.length;

  // Handle checkbox group change
  const onChange = (list: NEWS_CATEGORY_TYPE[]) => {
    setCheckedList(list);
    setFilteredNewsEvents(
      dataSource.filter((news) => list.includes(news.category))
    );
  };

  // Handle "Check All" checkbox change
  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? Array.from(NEWS_CATEGORIES) : []);
    setFilteredNewsEvents(e.target.checked ? dataSource : []);
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
            <div className="flex gap-5 flex-row-reverse">
              <Tag
                className={`${TAG_COLORS[news.category]} ${styles.cardTags}`}
              />
              <div className="w-full flex flex-col gap-1 text-right">
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
