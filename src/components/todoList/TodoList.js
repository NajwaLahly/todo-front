import Todo from "../todo/Todo"

export default function TodoList({todos, handleEdit, handleDestroy}) {
    return(
        <ul className="todo-list">
            {todos.map((todo) => <Todo key={todo.id} todo={todo} handleEdit={handleEdit} handleDestroy={handleDestroy}/>)}
        </ul>
    )
}