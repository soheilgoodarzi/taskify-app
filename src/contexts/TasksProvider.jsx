import { useReducer } from "react"
import { TasksContext, TasksDispatchContext } from "./TasksContext.js"
import { initialTasks, initialNextId } from "../data/initialData.js"

function arrayMove(arr, fromIndex, toIndex) {
  const newArr = [...arr]
  const [removed] = newArr.splice(fromIndex, 1)
  newArr.splice(toIndex, 0, removed)
  return newArr
}

let nextId = initialNextId

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

      //  find active task
      const activeTask = tasks.find((t) => t.id === activeId)
      if (!activeTask) return tasks

      // find source and destination columns
      const sourceColumn = activeTask.status
      const overContainer = over.data.current?.sortable?.containerId || over.id
      const destinationColumn = tasks.some((t) => t.id === overId)
        ? tasks.find((t) => t.id === overId).status
        : overContainer

      // if moved within the same column
      if (sourceColumn === destinationColumn) {
        if (activeId === overId) return tasks
        // if dropped on itself
        const oldIndex = tasks.findIndex((t) => t.id === activeId)
        const newIndex = tasks.findIndex((t) => t.id === overId)
        if (oldIndex === -1 || newIndex === -1) return tasks
        return arrayMove(tasks, oldIndex, newIndex)
      }
      // if moved to a different column
      else {
        // 1. Change the task's status to the new column
        const updatedTask = { ...activeTask, status: destinationColumn }

        // 2. Replace the updated task in the array
        const newTasks = tasks.map((t) => (t.id === activeId ? updatedTask : t))

        // 3. Preserve the order of tasks in the overall list (optional but better for UX)
        const oldIndex = tasks.findIndex((t) => t.id === activeId)
        const newIndex = tasks.findIndex((t) => t.id === overId)

        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(
            tasks.map((t) => (t.id === activeId ? updatedTask : t)),
            oldIndex,
            newIndex
          )
        }

        return newTasks
      }
    }
    default: {
      throw new Error("Unknown action: " + action.type)
    }
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}
