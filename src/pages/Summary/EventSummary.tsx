interface EventSummaryProps {
  summary: string | null;
}
export const EventSummary: React.FC<EventSummaryProps> = ({ summary }) => {
  return (
    <div className="flex flex-col gap-5">
      <p>{summary}</p>
    </div>
  );
};
