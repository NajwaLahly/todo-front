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
      data-testid="todo-input"
      value={props.inputText}></input>
  );
}
