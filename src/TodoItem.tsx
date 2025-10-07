import { useState } from "react";
import editImg from "./assets/editImg.svg";
import deleteImg from "./assets/deleteImg.svg";
import doneImg from "./assets/doneImg.svg";
import style from "./TodoItem.module.css";

type TodoItemProps = {
  task: {
    id: string;
    body: string;
    is_active: boolean;
  };
  editTask: (id: string, body: string) => void;
  deleteTask: (id: string) => void;
  isActive: (id: string) => void;
};

export const TodoItem = ({
  task,
  editTask,
  deleteTask,
  isActive,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.body);

  return (
    <>
      {isEditing ? (
        <form className={style.editRow}>
          <input
            className={style.editInput}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />
          <button
            className={style.iconButton}
            onClick={() => {
              if (!draft.trim()) return;
              editTask(task.id, draft);
              setIsEditing(false);
            }}
          >
            <img src={doneImg} alt="edit img" className={style.icon} />
          </button>
        </form>
      ) : (
        <div className={style.viewRow}>
          <input
            type="checkbox"
            className={style.checkbox}
            onClick={() => isActive(task.id)}
            defaultChecked={!task.is_active}
          />
          <span
            className={`${style.text} ${!task.is_active ? style.textDone : ""}`}
          >
            {task.body}
          </span>

          <div className={style.actions}>
            <button
              className={style.iconButton}
              onClick={() => setIsEditing(true)}
            >
              <img src={editImg} alt="edit img" className={style.icon} />
            </button>
            <button
              className={`${style.iconButton} ${style.iconButtonGap}`}
              onClick={() => deleteTask(task.id)}
            >
              <img src={deleteImg} alt="delete img" className={style.icon} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
