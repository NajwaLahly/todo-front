import Todo from "../todo/Todo"

export default function TodoList({todos}) {
    return(
        <ul>
            {todos.map((todo) => <li><Todo todo={todo} /></li>)}
        </ul>
    )
}