import { useState, useContext } from "react";
import { TasksDispatchContext } from "../contexts/TasksContext";
import { Pencil, Trash2, GripVertical,Save  } from 'lucide-react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task }) {
  if (!task) return null;

  const dispatch = useContext(TasksDispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSaveClick = () => {
    dispatch({
      type: "changed",
      payload: { task: { ...task, text: editText } },
    });
    setIsEditing(false);
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="bg-slate-500/50 p-4 rounded-xl h-[58px] border border-slate-400"></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-white/20 backdrop-blur-lg p-3 rounded-xl shadow-md flex items-center group transition-all hover:shadow-lg text-milky"
    >
      <button {...listeners} className="text-milky cursor-grab touch-none mr-2">
        <GripVertical className="w-5 h-5" />
      </button>

      <div className="flex-grow flex items-center">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-grow p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-milky bg-white/50"
            />
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-green-600 hover:cursor-pointer "
            >
              <Save className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <p className={`flex-grow ${task.done ? "line-through text-gray-500" : ""}`}>
              {task.text}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-milky hover:text-yellow-300 ml-2 invisible group-hover:visible transition-opacity hover:cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "deleted",
                  payload: { taskId: task.id },
                });
              }}
              className="text-milky hover:text-red-600 ml-2 invisible group-hover:visible transition-opacity hover:cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}