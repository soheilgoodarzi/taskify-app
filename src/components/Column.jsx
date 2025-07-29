import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

// پراپ className را اضافه می‌کنیم
export default function Column({ id, title, tasks, className }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={className}> {/* از className استفاده می‌کنیم */}
      <div className="flex flex-row gap-2 mb-4 justify-center text-xl font-semibold text-white">
        <h2>{title}</h2>
        <span>({tasks.length})</span>
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
  );
}