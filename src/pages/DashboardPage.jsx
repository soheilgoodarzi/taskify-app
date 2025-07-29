import { useState, useContext } from "react";
import { TasksContext, TasksDispatchContext } from "../contexts/TasksContext";
import AddTask from "../components/AddTask";
import Column from "../components/Column";
import TaskCard from "../components/TaskCard";
import { DndContext, PointerSensor, useSensor, useSensors, closestCorners, DragOverlay } from "@dnd-kit/core";

export default function DashboardPage() {
  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch({
        type: "moved",
        payload: { active, over },
      });
    }
    setActiveTask(null);
  };

  const columnsData = {
    todo: { title: "To Do", tasks: tasks.filter(t => t.status === 'todo') },
    inprogress: { title: "In Progress", tasks: tasks.filter(t => t.status === 'inprogress') },
    done: { title: "Done", tasks: tasks.filter(t => t.status === 'done') },
  };

  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/main-Background.webp')" }}
      ></div>
      <div className="relative z-10 p-8">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
          <h1 className="text-4xl font-stretch-200%  mb-4 text-milky text-center ">
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
                className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg"
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}