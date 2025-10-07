import { useState } from "react";
import style from "./TodoForm.module.css";

interface TodoFormProps {
  addTask: (task: string) => void;
}

export const TodoForm = ({ addTask }: TodoFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue) return;
    addTask(inputValue);
    setInputValue("");
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.input}
        name="task"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите текст задачи"
      ></input>
      <button className={style.button} type="submit">
        Добавить
      </button>
    </form>
  );
};
