import { Card, Tag } from "antd";

import { styles } from "../../../assets/styles";

interface cardDetails {
  title: string;
  details: string;
  date: string;
  tag: string;
}

export const EventCard = ({ title, details, date, tag }: cardDetails) => {
  return (
    <div className="flex flex-row items-start">
      {tag === "Keywords" && (
        <Tag className={` bg-pink ${styles.cardTags}`}></Tag>
      )}
      {tag === "Critical" && (
        <Tag className={` bg-red ${styles.cardTags}`}></Tag>
      )}
      {tag === "Non Critical" && (
        <Tag className={` bg-green ${styles.cardTags}`}></Tag>
      )}
      <Card bordered={false} size="default" hoverable className="w-full">
        <h2 className={styles.cardTitle}>{title}</h2>
        <h3 className={styles.cardContent}>{details}</h3>
        <h4 className={styles.date}> {date}</h4>
      </Card>
    </div>
  );
};
