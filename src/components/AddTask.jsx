import { useState, useContext } from "react"
import { TasksDispatchContext } from "../contexts/TasksContext"

export default function AddTask() {
  const [text, setText] = useState("")
  const dispatch = useContext(TasksDispatchContext)

  const handleAddTask = () => {
    if (text.trim() === "") return;
    dispatch({
      type: "added",
      payload: { text: text },
    });
    setText("");
  };

  return (
    // ۴. تغییر استایل برای تمایز بهتر
    <div className="flex gap-2 mb-4 bg-black/25 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/20">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add New Task..."
        className="flex-1 p-2 bg-transparent border-b-2 border-white/50 focus:border-white transition-colors duration-300 text-white placeholder:text-gray-300 outline-none"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 cursor-pointer"
      >
        Add
      </button>
    </div>
  )
}