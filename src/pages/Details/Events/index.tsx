import { EventFilters } from "./EventFilters";
import { EventCard } from "./EventCard";

interface cardDetails {
  title: string;
  details: string;
  date: string;
  tag: string;
}

const newsevents: cardDetails[] = [
  {
    title:
      "Pakistan minister ditched offshore plans amid concerns over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP),...",
    date: "06/12/2021",
    tag: "Keywords",
  },
  {
    title:
      "Pakistan minister ditched offshore plans amid ‘concerns’ over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP),...",
    date: "06/12/2021",
    tag: "Critical",
  },

  {
    title:
      "Pakistan minister ditched offshore plans amid concerns over tax authority",
    details:
      "A minister in Imran Khan's Pakistan government pulled out of making ... as a prominent politician – a “politically exposed person” (PEP),...",
    date: "06/12/2021",
    tag: "Non Critical",
  },
];

export const Events = () => {
  return (
    <div>
      <EventFilters />
      <div className="flex flex-col gap-5">
        {newsevents.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            details={event.details}
            date={event.date}
            tag={event.tag}
          />
        ))}
      </div>
    </div>
  );
};
