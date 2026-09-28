import type { ReactElement } from "react";
import Button from "./Button";
import { useHabits } from "../context/useHabits";
import { format, isToday } from "date-fns";

type HeaderProps = {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
};

function Header({ visibleDates, onNext, onPrev }: HeaderProps): ReactElement {
  const { habits } = useHabits();

  const doneToday = habits.filter((item) =>
    item.completions.some((c) => isToday(c)),
  );
  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <div className="text-zinc-400 text-sm">
          {doneToday.length} / {habits.length} done today
        </div>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <div className="text-zinc-400 text-sm">
          {format(visibleDates[0], "MMM d")} -{" "}
          {format(visibleDates[visibleDates.length - 1], "MMM d")}
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => onPrev()}>Prev</Button>
          <Button onClick={() => onNext()} disabled={visibleDates.some(d=>isToday(d))}>Next</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
