import Todo from "../todo/Todo";

export default function TodoList({
  todos,
  checkTodo,
  editTodo,
  destroyTodo,
  findTodo

}) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          checkTodo={checkTodo}
          editTodo={editTodo}
          destroyTodo={destroyTodo}
          findTodo={findTodo}
        />
      ))}
    </ul>
  );
}
