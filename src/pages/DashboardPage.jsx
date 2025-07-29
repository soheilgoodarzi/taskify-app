import { useState, useContext } from "react"
import { TasksContext, TasksDispatchContext } from "../contexts/TasksContext"
import AddTask from "../components/AddTask"
import Column from "../components/Column"
import TaskCard from "../components/TaskCard"
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core"

export default function DashboardPage() {
  const tasks = useContext(TasksContext)
  const dispatch = useContext(TasksDispatchContext)
  // for active task
  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = (event) => {
    const { active } = event
    const task = tasks.find((t) => t.id === active.id)
    setActiveTask(task)
  }

  // ۳. تابع برای پایان کشیدن
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) {
      setActiveTask(null)
      return
    }
    if (active.id !== over.id) {
      dispatch({
        type: "moved",
        payload: { active, over },
      })
    }
    setActiveTask(null)
  }

  const columnsData = {
    todo: {
      title: "To Do",
      tasks: tasks.filter((t) => t.status === "todo"),
      style: "bg-green-sheen-100",
    },
    inprogress: {
      title: "In Progress",
      tasks: tasks.filter((t) => t.status === "inprogress"),
      style: "bg-blue-100",
    },
    done: {
      title: "Done",
      tasks: tasks.filter((t) => t.status === "done"),
      style: "bg-green-100",
    },
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4 text-milky">
          Taskify Dashboard
        </h1>
        <AddTask />
        <div className="grid grid-cols-3 gap-8 mt-4">
          {Object.entries(columnsData).map(([columnId, columnData]) => (
            <Column
              key={columnId}
              id={columnId}
              title={columnData.title}
              tasks={columnData.tasks}
              style={columnData.style}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
