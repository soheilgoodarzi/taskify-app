import { useState, useContext } from "react"
import { TasksDispatchContext } from "../contexts/TasksContext"

export default function AddTask() {
  const [text, setText] = useState("")
  const dispatch = useContext(TasksDispatchContext)

  const handleAddTask = () => {
    if (text.trim() === "") return

    dispatch({
      type: "added",
      payload: {
        text: text,
      },
    })
    setText("")
  }

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add New Task..."
        className="flex-1 p-2 border rounded-full lg:pl-4 placeholder:text-gray-400 outline-none hover:shadow-lg shadow-gray-300"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 w-20 sm:w-28 lg:w-28 cursor-pointer"
      >
        Add
      </button>
    </div>
  )
}
