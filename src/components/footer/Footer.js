import FilterList from "./FilterList.js";

export default function Footer({ itemLeftCount, clearCompleted, completed }) {
  return (
    <footer className="footer">
      <span className="todo-count"><strong style={{ "fontWeight": "bold" }}>{itemLeftCount}</strong> {(itemLeftCount === 0 || itemLeftCount > 1) ? 'items' : 'item'} left</span>
      <FilterList />
      {completed > 0 && <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>}
    </footer>
  );
}
