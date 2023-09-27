import Todo from "../todo/Todo"

export default function TodoList({todos, handleEdit, handleDestroy}) {
    return(
        <ul className="todo-list">
            {todos.map((todo) => <Todo key={todo.id} value={todo.value} id={todo.id} handleEdit={handleEdit} handleDestroy={handleDestroy}/>)}
        </ul>
    )
}