import { Cards } from "./Cards";
import { styles } from "../../../assets/styles";

const sourcesData = [
  {
    title: "Dawn NEWS",
    url: "https://www.dawn.com/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "ARY NEWS",
    url: "https://www.dawn.com/news/1697598/firs-against-tv-anchor",
  },
  {
    title: "GEO NEWS",
    url: "https://www.dawn.com/news/1697598/firs-against-tv-anchor",
  },
];

export const Sources = () => {
  return (
    <div className=" border border-light_gray rounded-lg bg-white p-4">
      <div className="flex flex-col gap-3 mb-2">
        <h2 className={` ${styles.heading5}`}>Sources</h2>
        <h3 className={` ${styles.label}`}>
          Pakistan minister ditched offshore plans amid ‘concerns’ over tax
          authority
        </h3>
      </div>
      {sourcesData.map((source, index) => (
        <Cards key={index} title={source.title} url={source.url} />
      ))}
    </div>
  );
};
