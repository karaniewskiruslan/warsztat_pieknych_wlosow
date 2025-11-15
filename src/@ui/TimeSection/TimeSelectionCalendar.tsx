import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/shared/types.js";

type Props = {
  onClick: (e: Value) => void;
  currentChoice: Date;
};

const TimeSelectionCalendar = ({ onClick, currentChoice }: Props) => {
  return (
    <>
      <Calendar onChange={(e) => onClick(e)} value={currentChoice} />
    </>
  );
};

export default TimeSelectionCalendar;
