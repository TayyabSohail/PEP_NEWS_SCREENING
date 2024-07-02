import { Cards } from "./cards";

export const NewsComponent = () => {
  const newsData = [
    {
      title: "DAWN NEWS",
      news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
      date: "15/07/2022",
    },
    {
      title: "ARY NEWS",
      news: "A minister of Pakistan ditched offshore plans dues to some concerns over tax authority",
      date: "15/07/2022",
    },
    {
      title: "Samaa TV",
      news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
      date: "15/07/2022",
    },
    {
      title: "Geo NEWS",
      news: "A minister of Pakistan ditched offshore plans dues to some concerns over tax authority",
      date: "15/07/2022",
    },
    {
      title: "BOL NEWS",
      news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
      date: "15/07/2022",
    },
    {
      title: "BOL NEWS",
      news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
      date: "15/07/2022",
    },
    {
      title: "BOL NEWS",
      news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
      date: "15/07/2022",
    },
    {
      title: "BOL NEWS",
      news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
      date: "15/07/2022",
    },
  ];

  return (
    <div className="news-container">
      {newsData.map((item, index) => (
        <Cards
          key={index}
          title={item.title}
          news={item.news}
          date={item.date}
        />
      ))}
    </div>
  );
};
