import { type ReactElement, type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";
import { isSameDay } from "date-fns";
import useLocalStorage from "../hooks/useLocalStorage";

type HabitProviderProps={
	children: ReactNode
}

function HabitProvider({children}:HabitProviderProps): ReactElement {

 const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []);

 function addHabit(name: string) {
   setHabits((prev: Habit[]) => [
     ...prev,
     { id: new Date().getTime(), name, completions: [] },
   ]);
 }

 function deleteHabit(id: number) {
   setHabits((prev: Habit[]) => prev.filter((item) => item.id !== id));
 }

 function toggleHabit(id: number, date: Date) {
   setHabits((prev: Habit[]) =>
     prev.map((item) => {
       if (item.id !== id) return item;
       const alreadyDone = item.completions.some((c) => isSameDay(c, date));
       const completions = alreadyDone
         ? item.completions.filter((c) => !isSameDay(c, date))
         : [...item.completions, date];
       return { ...item, completions };
     }),
   );
 }

 return <HabitContext value={{habits, toggleHabit, addHabit, deleteHabit}}>{children}</HabitContext>;
}

export default HabitProvider;