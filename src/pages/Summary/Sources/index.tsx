import { Cards } from "./cards";

export const NewsComponent = () => {
  const newsData = [
    {
      title: "DAWN NEWS",
      url: "https://example.com/dawn-news",
      news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    },
    {
      title: "ARY NEWS",
      url: "https://example.com/ary-news",
      news: "A minister of Pakistan ditched offshore plans dues to some concerns over tax authority",
    },
    {
      title: "Samaa TV",
      url: "https://example.com/samaa-tv",
      news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    },
    {
      title: "Geo NEWS",
      url: "https://example.com/geo-news",
      news: "A minister of Pakistan ditched offshore plans dues to some concerns over tax authority",
    },
    {
      title: "BOL NEWS",
      url: "https://example.com/bol-news",
      news: "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    },
  ];

  return (
    <div className="overflow-y-auto max-h-full pr-4" style={{ flex: "2" }}>
      {newsData.map((item, index) => (
        <Cards key={index} title={item.title} url={item.url} news={item.news} />
      ))}
    </div>
  );
};
