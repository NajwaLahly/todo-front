import Todo from "../todo/Todo"

export default function TodoList({todos}) {
    return(
        <ul className="todo-list">
            {todos.map((todo) => <Todo value={todo.value} id={todo.id}/>)}
        </ul>
    )
}