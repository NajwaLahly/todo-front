import { edit } from "../../api/fetchers.js";
import { useTodos } from "../../contexts/TodosContextProvider";

export default function TodoCompleteToggle() {
  const { todos, editTodo, completed } = useTodos();

  const markAllAsComplete = () => {
    if (todos.length > completed.length) {
      todos.forEach((todo) => {
        edit({ ...todo, completed: true })
          .then((data) => editTodo(data))
          .catch((e) => console.log(e));
      });
    } else {
      todos.forEach((todo) => {
        edit({ ...todo, completed: false })
          .then((data) => editTodo(data))
          .catch((e) => console.log(e));
      });
    }
  };

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onClick={markAllAsComplete}
      ></input>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}
