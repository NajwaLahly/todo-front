import Todo from "../todo/Todo"

export default function TodoList({todos}) {
    return(
        <ul className="todo-list">
            {todos.map((todo) => <Todo todo={todo} />)}
        </ul>
    )
}