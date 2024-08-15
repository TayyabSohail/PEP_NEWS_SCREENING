import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Checkbox, Card, Tag } from "antd";
import type { CheckboxProps } from "antd";

import { queryClient } from "../../utils/react-query.service";
import { endpoints } from "../../utils/api.service";

import {
  DatasetItem,
  ResponseData,
  ResponseEvent,
  ResponseItem,
} from "../../api/result.api";

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

export const EnglishNewsEvents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const personData: DatasetItem = location.state;
  const [dataSource, setDataSource] = useState<NewsEvent[]>([]);
  const [loading] = useState<boolean>(true);

  const keywords: string = personData.Keywords;
  const keywordsArray: string[] = keywords.split(",");

  const determineCategory = (sentiment: string): NEWS_CATEGORY_TYPE => {
    switch (sentiment) {
      case "negative":
        return "Critical";
      case "neutral":
      case "positive":
        return "Non Critical";
      default:
        return "Non Critical";
    }
  };

  function formatDate(dateObject: { $date: string }): string {
    const dateString = dateObject.$date;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }
    const day: string = String(date.getUTCDate()).padStart(2, "0");
    const month: string = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year: string = String(date.getUTCFullYear());
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const cachedData: ResponseData | undefined = queryClient.getQueryData(
      endpoints.result.cacheKey
    );
    const ScanData: ResponseItem = cachedData?.data ?? {};
    const events: ResponseEvent[] = ScanData[personData.englishName];

    if (events) {
      const mappedData: NewsEvent[] = events.map((event: ResponseEvent) => ({
        title: event.Event,
        details: event.Description[0],
        date: formatDate(event.StartDate),
        category: determineCategory(event.Sentiment_Prediction),
      }));
      setDataSource(mappedData);
      setFilteredNewsEvents(mappedData);
    }
  }, [personData]);

  const handleCardClick = (news: NewsEvent) => {
    const requestData = {
      eventDate: news.date,
      Event: news.title,
    };

    navigate("/summary", {
      state: {
        requestData,
        personData,
      },
    });
  };

  const [checkedList, setCheckedList] = useState<NEWS_CATEGORY_TYPE[]>([
    ...NEWS_CATEGORIES,
  ]);
  const [filteredNewsEvents, setFilteredNewsEvents] =
    useState<NewsEvent[]>(dataSource);

  const checkAll = NEWS_CATEGORIES.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < NEWS_CATEGORIES.length;

  const filterNewsEvents = (list: NEWS_CATEGORY_TYPE[]) => {
    return dataSource.filter((news) => {
      const matchesCategory = list.includes(news.category);
      const matchesKeywords = list.includes("Keywords")
        ? keywordsArray.some((keyword) => news.details.includes(keyword))
        : true;
      return matchesCategory && matchesKeywords;
    });
  };

  // useEffect(() => {
  //   setFilteredNewsEvents(filterNewsEvents(checkedList));
  // }, [dataSource, checkedList]);

  const onChange = (list: NEWS_CATEGORY_TYPE[]) => {
    setCheckedList(list);
    setFilteredNewsEvents(filterNewsEvents(list));
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    const newCheckedList = e.target.checked ? Array.from(NEWS_CATEGORIES) : [];
    setCheckedList(newCheckedList);
    setFilteredNewsEvents(filterNewsEvents(newCheckedList));
  };

  return (
    <div className="flex flex-col gap-10">
      {loading}
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
            onClick={() => handleCardClick(news)}
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
