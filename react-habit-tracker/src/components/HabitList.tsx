import type { ReactElement } from "react";
import HabitItem from "./HabitItem";
import { useHabits } from "../context/useHabits";

type HabitListProps = {
  visibleDates: Date[];
};

function HabitList({ visibleDates }:HabitListProps): ReactElement {
  const { habits } = useHabits();
  if (habits.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500">
        No habits yet. Add one above to get started!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {habits.map((habit) => (
        <li key={habit.id}>
          <HabitItem habit={habit} visibleDates={visibleDates} />
        </li>
      ))}
    </ul>
  );
}

export default HabitList;
