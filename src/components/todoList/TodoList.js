import Todo from "../todo/Todo";
import { useTodos } from "../../contexts/TodosContextProvider";

export default function TodoList() {

  const { todos } = useTodos(); 

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
}
