import FilterList from "./FilterList.js";

export default function Footer({ itemLeftCount, displayAll, displayActive, displayCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count"><strong style={{ "fontWeight": "bold" }}>{itemLeftCount}</strong> {(itemLeftCount === 0 || itemLeftCount > 1) ? 'items' : 'item'} left</span>
      <FilterList displayAll={displayAll} displayActive={displayActive} displayCompleted={displayCompleted} />
    </footer>
  );
}
