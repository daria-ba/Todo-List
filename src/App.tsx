import { useState, useEffect } from "react";
import { TodoList } from "./TodoList";
import { TodoForm } from "./TodoForm";
import style from "./App.module.css";

export type Task = {
  id: string;
  body: string;
  is_active: boolean;
};

function loadTasksfromLocalStorage() {
  const raw = localStorage.getItem("todos");
  let listOfTasks: unknown = [];
  try {
    listOfTasks = raw ? JSON.parse(raw) : [];
  } catch {
    listOfTasks = [];
  }
  if (Array.isArray(listOfTasks)) {
    return listOfTasks as Task[];
  }
  if (
    typeof listOfTasks === "object" &&
    listOfTasks !== null &&
    "tasks" in listOfTasks &&
    Array.isArray((listOfTasks as Record<string, unknown>).tasks)
  ) {
    return (listOfTasks as { tasks: Task[] }).tasks;
  }
  return [];
}

function getDeclension(
  task: Task[],
  first: string,
  second: string,
  fifth: string,
) {
  let numberOfTasks = Math.abs(task.length);
  numberOfTasks %= 100;
  if (numberOfTasks >= 5 && numberOfTasks <= 20) {
    return fifth;
  }
  numberOfTasks %= 10;
  if (numberOfTasks === 1) {
    return first;
  }
  if (numberOfTasks >= 2 && numberOfTasks <= 4) {
    return second;
  }
  return fifth;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksfromLocalStorage());
  const [status, setStatus] = useState<"all" | "active" | "done">("all");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) =>
    status === "all"
      ? true
      : status === "active"
        ? task.is_active
        : !task.is_active,
  );

  const addTask = (value: string) =>
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        body: value,
        is_active: true,
      },
    ]);
  const editTask = (id: string, body: string) => {
    return setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, body } : task)),
    );
  };

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  const isActive = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, is_active: !task.is_active } : task,
      ),
    );
  };
  return (
    <div className="container">
      <div className="header">
        <h1>ToDo</h1>
      </div>
      <div className="main">
        <div className={style.form}>
          <TodoForm addTask={addTask} />
        </div>
        <div>
          <button className={style.filter} onClick={() => setStatus("all")}>
            Все
          </button>
          <button className={style.filter} onClick={() => setStatus("active")}>
            Активные
          </button>
          <button className={style.filter} onClick={() => setStatus("done")}>
            Выполненные
          </button>
          <span>
            ✨{" "}
            {getDeclension(
              tasks.filter((task) => task.is_active === true),
              "Осталась",
              "Осталось",
              "Осталось",
            )}{" "}
            {tasks.filter((task) => task.is_active === true).length}{" "}
            {getDeclension(
              tasks.filter((task) => task.is_active === true),
              "задача",
              "задачи",
              "задач",
            )}{" "}
            ✨
          </span>
        </div>
        <div className={style.list}>
          <TodoList
            listOfTasks={filteredTasks}
            editTask={editTask}
            deleteTask={deleteTask}
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
