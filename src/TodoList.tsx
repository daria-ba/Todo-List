import {} from "react";
import { TodoItem } from "./TodoItem";
import style from "./TodoList.module.css";

type TodoItemType = {
  id: string;
  body: string;
  is_active: boolean;
};

type TodoListProps = {
  listOfTasks: TodoItemType[];
  editTask: (id: string, body: string) => void;
  deleteTask: (id: string) => void;
  isActive: (id: string) => void;
};

export const TodoList = ({
  listOfTasks,
  editTask,
  deleteTask,
  isActive,
}: TodoListProps) => {
  if (!listOfTasks || listOfTasks?.length === 0)
    return <div>Список пуст — добавьте задачу ✨</div>;
  return (
    <>
      <ul className={style.ul}>
        {listOfTasks.map((task) => (
          <li className={style.li} key={task.id}>
            <TodoItem
              task={task}
              editTask={editTask}
              deleteTask={deleteTask}
              isActive={isActive}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
