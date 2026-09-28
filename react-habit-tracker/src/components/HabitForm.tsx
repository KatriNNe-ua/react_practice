import { useState, type ReactElement } from "react";
import Button from "./Button";
import { useHabits } from "../context/useHabits";

function HabitForm(): ReactElement {
  const [name, setName] = useState<string>("");
  const { addHabit } = useHabits();

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim() !== "") {
      addHabit(name);
      setName("");
    }
  }

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="New habit..."
        className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-violet-500 "
      />
      <Button
        disabled={name.trim() === ""}
        className="rounded-lg px-4 py-2 font-medium"
      >
        Add Habit
      </Button>
    </form>
  );
}

export default HabitForm;
