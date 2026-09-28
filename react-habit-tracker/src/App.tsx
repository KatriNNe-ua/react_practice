import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Header from "./components/Header";

import HabitProvider from "./context/HabitProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

function App() {
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const week = addWeeks(new Date(), weekOffset);

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  return (
    <HabitProvider>
      <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
        <Header
          visibleDates={visibleDates}
          onNext={() => setWeekOffset((prev) => prev + 1)}
          onPrev={() => setWeekOffset((prev) => prev - 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </div>
    </HabitProvider>
  );
}

export default App;
