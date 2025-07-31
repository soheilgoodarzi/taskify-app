import { useState, useContext } from "react";
import { TasksDispatchContext } from "../contexts/TasksContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useContext(TasksDispatchContext);

  const handleAddTask = () => {
    if (text.trim() === "") return;
    dispatch({ type: "added", payload: { text: text } });
    setText("");
  };

  return (
    <div className="flex gap-2 p-3 md:p-4 mb-4 bg-black/25 backdrop-blur-xl rounded-xl shadow-lg border border-white/20">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add New Task..."
        className="flex-1 p-2 bg-transparent text-sm md:text-base border-b-2 border-white/50 focus:border-white transition-colors duration-300 text-white placeholder:text-gray-300 outline-none"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white font-bold px-4 py-2 md:px-6 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 cursor-pointer text-sm md:text-base"
      >
        Add
      </button>
    </div>
  );
}