import FilterList from "./FilterList.js";
import * as Api from "../../api/fetchers.js";


export default function Footer({ itemLeftCount, completed, destroyTodo }) {

  const destroy = (id) => {
    Api.destroy(id)
      .then(destroyTodo(id))
      .catch(e => console.log(e));
  };

  const clearCompleted = () => {
    completed.forEach(todo => destroy(todo.id));
  };

  return (
    <footer className="footer">
      <span className="todo-count"><strong style={{ "fontWeight": "bold" }}>{itemLeftCount}</strong> {(itemLeftCount === 0 || itemLeftCount > 1) ? 'items' : 'item'} left</span>
      <FilterList />
      {completed.length > 0 && <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>}
    </footer>
  );
}
