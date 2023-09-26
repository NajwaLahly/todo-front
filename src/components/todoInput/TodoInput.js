import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

export default function TodoInput(props) {
  return (
    <input
      placeholder="What needs to be done?"
      className="new-todo"
      onChange={props.handleChange}
      onKeyDown={props.handleEnterPress}
      autoFocus
      value={props.inputText}></input>
  );
}
