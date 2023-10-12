import { NavLink } from "react-router-dom";

export default function FilterList() {
  const selected = ({ isActive }) => (isActive ? "selected" : "");
  return (
    <ul className="filters">
      <li>
        <NavLink to={"/"} className={selected}>
          All
        </NavLink>
      </li>
      <li>
        <NavLink to={"/active"} className={selected}>
          Active
        </NavLink>
      </li>
      <li>
        <NavLink to={"/completed"} className={selected}>
          Completed
        </NavLink>
      </li>
    </ul>
  );
}
