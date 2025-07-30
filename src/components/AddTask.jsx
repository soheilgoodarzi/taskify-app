import { useState, useContext } from "react"
import { TasksDispatchContext } from "../contexts/TasksContext"

export default function AddTask() {
  const [text, setText] = useState("")
  const dispatch = useContext(TasksDispatchContext)

  const handleAddTask = () => {
    if (text.trim() === "") return
    dispatch({
      type: "added",
      payload: { text: text },
    })
    setText("")
  }

  return (
    <div className="flex gap-2 lg:mb-4 bg-black/25 backdrop-blur-xl rounded-xl xs:p-2 lg:p-4 shadow-lg border border-white/20">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add New Task..."
        className="flex-1 xs:p-1 lg:p-2 bg-transparent xs:border-b-[1px] lg:border-b-2 xs:text-xs md:text-base lg:text-lg 2xl:text-xl border-white/50 focus:border-white transition-colors duration-300 text-white placeholder:text-gray-300 outline-none"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white font-bold lg:px-6 lg:py-2 xs:px-4 xs:py-2 sm:py-2 sm:px-5 2xl:py-5 2xl:rounded-full 2xl:px-8 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 cursor-pointer xs:text-xs md:text-base lg:text-lg 2xl:text-2xl"
      >
        Add
      </button>
    </div>
  )
}
