import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Card, Tag } from "antd";
import type { CheckboxProps } from "antd";

import { queryClient } from "../../utils/react-query.service";
import { endpoints } from "../../utils/api.service";

import { styles } from "../../assets/styles";
import {
  DatasetItem,
  ResponseData,
  ResponseEvent,
  ResponseItem,
} from "../../api/result.api";

import { useLocation } from "react-router-dom";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    const month: string = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const year: string = String(date.getUTCFullYear());
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cachedData: ResponseData | undefined = queryClient.getQueryData(
          endpoints.result.cacheKey
        );

        if (cachedData) {
          const ScanData: ResponseItem[] = cachedData.data ?? [];
          const events: ResponseEvent[] = ScanData[personData.englishName];

          if (events) {
            const mappedData: NewsEvent[] = events.map(
              (event: ResponseEvent) => ({
                title: event.Event,
                details: event.Description[0],
                date: formatDate(event.StartDate),
                category: determineCategory(event.Sentiment_Prediction),
              })
            );

            setDataSource(mappedData);
          }
        }
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [personData]);

  const handleCardClick = (news: NewsEvent) => {
    const requestData = {
      eventDate: news.date,
      Event: news.title,
    };

    console.log(requestData);

    navigate("/summary", {
      state: {
        requestData,
        personData,
      },
    });
  };

  const [checkedList, setCheckedList] = useState<NEWS_CATEGORY_TYPE[]>([
    "Keywords",
  ]);
  const [filteredNewsEvents, setFilteredNewsEvents] = useState<NewsEvent[]>(
    dataSource.filter((news) => checkedList.includes(news.category))
  );

  const checkAll = NEWS_CATEGORIES.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < NEWS_CATEGORIES.length;

  const onChange = (list: NEWS_CATEGORY_TYPE[]) => {
    setCheckedList(list);
    setFilteredNewsEvents(
      dataSource.filter((news) => list.includes(news.category))
    );
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? Array.from(NEWS_CATEGORIES) : []);
    setFilteredNewsEvents(e.target.checked ? dataSource : []);
  };

  return (
    <div className="flex flex-col gap-10">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
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
