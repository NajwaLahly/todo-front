export default function TodoCompleteToggle({todos, completed, editTodo}) {

    const todosApiUrl = "http://localhost:8081/todos";

    const markAllAsComplete = () => {
        if (todos.length > completed.length) {
          todos.forEach((todo) => {
            fetch(`${todosApiUrl}/${todo.id}`, {
              method: "PUT",
              body: JSON.stringify({ ...todo, completed: true }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => editTodo(data));
          });
        } else {
          todos.forEach((todo) => {
            fetch(`${todosApiUrl}/${todo.id}`, {
              method: "PUT",
              body: JSON.stringify({ ...todo, completed: false }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => editTodo(data));
          });
        }
      };

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onClick={markAllAsComplete}
      ></input>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}
