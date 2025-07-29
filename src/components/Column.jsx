import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({ id, title, tasks, className }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    // ۲. افزایش پدینگ داخلی از p-4 به p-6
    <div ref={setNodeRef} className={`${className} p-6`}>
      <div className="flex flex-row gap-2 mb-4 justify-center text-xl text-white">
        {/* ۳. برجسته‌تر کردن عنوان و اضافه کردن سایه */}
        <h2 className="font-bold drop-shadow-md">{title}</h2>
        <span className="drop-shadow-md">({tasks.length})</span>
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