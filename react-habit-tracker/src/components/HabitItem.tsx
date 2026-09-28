import type { ReactElement } from "react";
import {
  format,
  isFuture,
  isSameDay,
  subDays,
} from "date-fns";
import Button from "./Button";
import { useHabits, type Habit } from "../context/useHabits";

type HabitItemProps = {
  habit: Habit;
  visibleDates: Date[];
};



function HabitItem({ habit, visibleDates }: HabitItemProps): ReactElement {
  const { toggleHabit, deleteHabit } = useHabits();

  const streak = getStreak(habit.completions);

  return (
    <div className="bg-zinc-800 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-3 items-center">
          <h2 className="font-medium">{habit.name}</h2>
          {streak > 0 && (
            <div className="text-sm text-amber-400">🔥 {streak}</div>
          )}
        </div>
        <Button
          variant="ghost-destructive"
          className="text-xs"
          onClick={() => deleteHabit(habit.id)}
        >
          Delete
        </Button>
      </div>
      <div className="flex items-center justify-between gap-1.5">
        {visibleDates.map((date) => (
          <Button
            className="flex flex-col flex-1 items-center gap-0.5 rounded-lg text-xs"
            key={date.toISOString()}
            disabled={isFuture(date)}
            variant={
              habit.completions.some((d) => isSameDay(date, d))
                ? "primary"
                : "secondary"
            }
            onClick={() => toggleHabit(habit.id, date)}
          >
            <div className="font-medium">{format(date, "EEE")}</div>
            <div>{format(date, "d")}</div>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default HabitItem;

function getStreak(completions: Date[]) {
  let streak = 0;
  let date = new Date();
  while (completions.some((c) => isSameDay(c, date))) {
    streak++;
    date = subDays(date, 1);
  }
  return streak;
}
