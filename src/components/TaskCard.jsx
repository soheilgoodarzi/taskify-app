import { useState, useContext } from "react";
import { TasksDispatchContext } from "../contexts/TasksContext";
import { Pencil, Trash2, GripVertical, Save } from 'lucide-react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task }) {
  if (!task) return null;

  const dispatch = useContext(TasksDispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSaveClick = () => {
    dispatch({ type: "changed", payload: { task: { ...task, text: editText } } });
    setIsEditing(false);
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="bg-slate-500/50 p-4 rounded-xl h-[62px] border border-slate-400"></div>;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-black/20 backdrop-blur-lg p-3 rounded-xl shadow-md flex items-center group transition-all hover:bg-black/30 text-white"
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => dispatch({ type: "changed", payload: { task: { ...task, done: e.target.checked } } })}
        className="mr-3 h-5 w-5 rounded-full bg-white/30 border-none text-blue-500 focus:ring-blue-400 cursor-pointer"
      />
      
      <button {...listeners} className="text-gray-300 cursor-grab touch-none mr-2 drop-shadow-md">
        <GripVertical className="w-5 h-5" />
      </button>

      <div className="flex-grow flex items-center">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-grow p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-black/30"
            />
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white p-1.5 rounded-md ml-2 hover:bg-green-600"
            >
              <Save className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            {/* ۷. بهبود خوانایی متن خط خورده */}
            <p className={`flex-grow drop-shadow-sm ${task.done ? "line-through text-gray-400" : ""}`}>
              {task.text}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-300 hover:text-yellow-400 ml-2 invisible group-hover:visible transition-opacity"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => dispatch({ type: "deleted", payload: { taskId: task.id } })}
              className="text-gray-300 hover:text-red-500 ml-2 invisible group-hover:visible transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}