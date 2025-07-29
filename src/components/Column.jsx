import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import TaskCard from "./TaskCard"

export default function Column({ id, title, tasks, style }) {
  //convert the column to a droppable area
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className={`${style} p-4 rounded-lg`}>
      <div className="flex flex-row gap-1 mb-4 justify-center text-xl font-semibold">
        <h2 className="text-milky">{title}</h2>
        <span className="text-milky">({tasks.length})</span>
      </div>
      <SortableContext
        id={id}
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4 min-h-[100px]">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
