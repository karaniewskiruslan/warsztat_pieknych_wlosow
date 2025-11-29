import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/shared/types.js";

type Props = {
  onClick: (e: Value) => void;
  currentChoice: Date;
};

const TimeSelectionCalendar = ({ onClick, currentChoice }: Props) => {
  return (
    <Calendar
      tileDisabled={({ date, view }) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);

        if (view === "month") {
          return checkDate < today;
        }
        return false;
      }}
      onChange={(e) => onClick(e)}
      value={currentChoice}
    />
  );
};

export default TimeSelectionCalendar;
