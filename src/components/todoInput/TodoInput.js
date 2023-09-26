import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css' ;

export default function TodoInput() {
    return (
        <input placeholder="What needs to be done?"  className="new-todo" autofocus></input>
    )
}