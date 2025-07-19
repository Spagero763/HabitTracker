// Day 16 - Smart Habit Tracker
// SmartHabitTracker.jsx

import { useState, useEffect } from "react";
import { FaCheckCircle, FaPlus, FaTrash } from "react-icons/fa";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SmartHabitTracker() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habit-data");
    return saved ? JSON.parse(saved) : [];
  });
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    localStorage.setItem("habit-data", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!newHabit.trim()) return;
    const habit = {
      id: Date.now(),
      name: newHabit.trim(),
      completions: Array(7).fill(false),
    };
    setHabits([habit, ...habits]);
    setNewHabit("");
  };

  const toggleCompletion = (habitId, dayIndex) => {
    const updated = habits.map((habit) => {
      if (habit.id === habitId) {
        const newCompletions = [...habit.completions];
        newCompletions[dayIndex] = !newCompletions[dayIndex];
        return { ...habit, completions: newCompletions };
      }
      return habit;
    });
    setHabits(updated);
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter((h) => h.id !== habitId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">🧠 Smart Habit Tracker</h1>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Enter a new habit..."
            className="flex-1 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-800"
          />
          <button
            onClick={addHabit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-1"
          >
            <FaPlus /> Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-2 text-left">Habit</th>
                {days.map((day) => (
                  <th key={day} className="p-2 text-center">{day}</th>
                ))}
                <th className="p-2 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit.id} className="border-t dark:border-gray-700">
                  <td className="p-2 font-medium">{habit.name}</td>
                  {habit.completions.map((done, index) => (
                    <td
                      key={index}
                      className="p-2 text-center cursor-pointer"
                      onClick={() => toggleCompletion(habit.id, index)}
                    >
                      {done ? <FaCheckCircle className="text-green-500 mx-auto" /> : "-"}
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
