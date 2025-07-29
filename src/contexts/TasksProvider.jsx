import { useReducer, useEffect } from "react"
import { TasksContext, TasksDispatchContext } from "./TasksContext.js"
import { initialTasks, initialNextId } from "../data/initialData.js"

function arrayMove(arr, fromIndex, toIndex) {
  const newArr = [...arr]
  const [removed] = newArr.splice(fromIndex, 1)
  newArr.splice(toIndex, 0, removed)
  return newArr
}

let nextId = initialNextId

function tasksInitializer() {
  const savedTasks = localStorage.getItem("tasks")
  if (savedTasks) {
    return JSON.parse(savedTasks)
  }
  return initialTasks
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: nextId++,
          text: action.payload.text,
          status: "todo",
          done: false,
        },
      ]
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.payload.taskId)
    }
    case "changed": {
      return tasks.map((t) =>
        t.id === action.payload.task.id ? action.payload.task : t
      )
    }
    case "moved": {
      const { active, over } = action.payload
      if (!over) return tasks
      const activeId = active.id
      const overId = over.id
      if (activeId === overId) return tasks
      //  find active task
      const activeTask = tasks.find((t) => t.id === activeId)
      if (!activeTask) return tasks
      // find source and destination columns
      const overContainer = over.data.current?.sortable?.containerId || over.id
      const activeContainer =
        active.data.current?.sortable?.containerId || activeTask.status

      if (activeContainer === overContainer) {
        const overIndex = tasks.findIndex((t) => t.id === overId)
        if (overIndex === -1) return tasks
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        return arrayMove(tasks, activeIndex, overIndex)
      } else {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        tasks[activeIndex].status = overContainer
        return [...tasks]
      }
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`)
    }
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks,
    tasksInitializer
  )
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}
