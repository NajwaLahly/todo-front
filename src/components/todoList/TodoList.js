import Todo from "../todo/Todo"

export default function TodoList({todos, setTodos}) {
    return(
        <ul className="todo-list">
            {todos.map((todo,idx) => <Todo todo={todo} todos={todos} setTodos={setTodos} key={idx}/>)}
        </ul>
    )
}