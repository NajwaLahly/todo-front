import FilterList from "./FilterList.js";

export default function Footer({ itemLeftCount, completed, destroyTodo }) {

  const todosApiUrl = "http://localhost:8081/todos";

  const destroy = (id) => {
    fetch(`${todosApiUrl}/${id}`, { method: "DELETE" })
      .then(destroyTodo(id))
      .catch((error) => console.log(error));
  };

  const clearCompleted = () => {
    completed.forEach((todo) => {
      destroy(todo.id);
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count"><strong style={{ "fontWeight": "bold" }}>{itemLeftCount}</strong> {(itemLeftCount === 0 || itemLeftCount > 1) ? 'items' : 'item'} left</span>
      <FilterList />
      {completed > 0 && <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>}
    </footer>
  );
}
