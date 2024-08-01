import { useEffect, useState } from "react";

import { Checkbox, Card, Tag } from "antd";
import type { CheckboxProps } from "antd";

import { NewsDetailItem } from "../../api/details.api";

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
  title: string[];
  details: string[];
  date: string;
  category: NEWS_CATEGORY_TYPE;
}

export const EnglishNewsEvents = () => {
  const [dataSource, setDataSource] = useState<NewsEvent[]>([]);

  // function to randomly assign categories to each news
  function getRandomValueFromArray<T>(array: readonly T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function formatDate(dateObject: { $date: string }): string {
    // Extract the date string
    const dateString = dateObject.$date;

    // Convert the ISO string to a Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }

    // Format the date components
    const day: string = String(date.getUTCDate()).padStart(2, "0");
    const month: string = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const year: string = String(date.getUTCFullYear());

    // Return the formatted date as DD/MM/YYYY
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    // Get cached data from query client
    const cachedData: NewsDetailItem[] | undefined = queryClient.getQueryData<
      NewsDetailItem[]
    >(endpoints.details.cacheKey);

    if (cachedData) {
      // Map cached data to the required format
      const mappedData: NewsEvent[] = cachedData.map(
        (event: NewsDetailItem) => ({
          title: event.Headline,
          details: event.News,
          date: formatDate(event.DateTime),
          category: getRandomValueFromArray(NEWS_CATEGORIES),
        })
      );

      // Update the data source
      setDataSource(mappedData);
    }
  }, []);

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
