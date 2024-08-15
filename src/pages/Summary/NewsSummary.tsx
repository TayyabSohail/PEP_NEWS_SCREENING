import { useEffect, useState } from "react";
import { styles } from "../../assets/styles";
import {
  fetchNewsDetails,
  NewsDetailItem,
  NewsDetailRequest,
} from "../../api/news.api";
interface NewsSummaryProps {
  selectedNews: NewsDetailRequest | null;
}

export const NewsSummary: React.FC<NewsSummaryProps> = ({ selectedNews }) => {
  const [newsDetails, setNewsDetails] = useState<NewsDetailItem | null>(null);

  useEffect(() => {
    if (selectedNews) {
      const fetchNews = async () => {
        const data = await fetchNewsDetails(selectedNews);
        setNewsDetails(data.data[0]);
      };

      fetchNews();
    }
  }, [selectedNews]);

  function formatDate(dateObject: { $date: string } | undefined): string {
    if (dateObject && dateObject.$date) {
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
    return "";
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className={`!text-black ${styles.heading3}`}>
          {newsDetails?.Headline}
        </h3>
        <a className="text-primary" href={newsDetails?.Url}>
          {newsDetails?.Url}
        </a>
        <p>{formatDate(newsDetails?.DateTime)}</p>
      </div>
      <p className="flex flex-col gap-5">{newsDetails?.News}</p>
    </div>
  );
};
