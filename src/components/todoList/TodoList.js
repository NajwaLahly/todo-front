import Todo from "../todo/Todo"

export default function TodoList({todos, handleEdit, handleDestroy, handleCheck}) {
    return(
        <ul className="todo-list">
            {console.log(todos)}
            {todos.map((todo) => <Todo key={todo.id} todo={todo} handleEdit={handleEdit} handleDestroy={handleDestroy} handleCheck={handleCheck}/>)}
        </ul>
    )
}