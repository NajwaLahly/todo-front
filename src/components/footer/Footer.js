import FilterList from "./FilterList.js";

export default function Footer({itemLeftCount}) {
  return (
    <footer className="footer">
      <span className="todo-count"><strong style={{"font-weight": "bold"}}>{itemLeftCount}</strong> {(itemLeftCount === 0 || itemLeftCount > 1) ? 'items' : 'item'} left</span>
      <FilterList />
    </footer>
  )
}
