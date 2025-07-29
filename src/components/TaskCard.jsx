import { useState, useContext } from "react"
import { TasksDispatchContext } from "../contexts/TasksContext"
import { Pencil, Trash2 } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function TaskCard({ task }) {
  const dispatch = useContext(TasksDispatchContext)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    //this property says whether the card is being dragged or not
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: isDragging ? "2px dashed #3498db" : undefined,
  }

  const handleSaveClick = () => {
    dispatch({
      type: "changed",
      payload: { task: { ...task, text: editText } },
    })
    setIsEditing(false)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-300 p-4 rounded-lg shadow-sm h-[72px]"
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-pencil-tip-100 p-4 rounded-lg shadow-sm flex justify-between items-center"
    >
      <div className="flex-grow flex items-center">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-grow p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-sheen-100"
            />
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-green-600"
            >
              ذخیره
            </button>
          </>
        ) : (
          <>
            <p className="flex-grow">{task.text}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 ml-2"
            >
              <Pencil className="w-4 h-4 cursor-pointer" />
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => {
          dispatch({
            type: "deleted",
            payload: { taskId: task.id },
          })
        }}
        className="text-red-500 hover:text-red-700 ml-4 flex-shrink-0"
      >
        <Trash2 className="w-4 h-4 cursor-pointer" />
      </button>
    </div>
  )
}
