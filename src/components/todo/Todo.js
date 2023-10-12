import { useState } from "react";

export default function Todo({ todo, checkTodo, editTodo, destroyTodo, findTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(todo.title);

  const todosApiUrl = "http://localhost:8081/todos";

  const handleDoubleClick = () => {
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleEdit({ id: todo.id, title: inputText });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleChange = (e) => setInputText(e.target.value);

  const handleEdit = (nextTodo) => {
    const nextTitle = nextTodo.title.trim();
    if (!nextTitle) {
      return destroy(nextTodo.id);
    }
    edit(nextTodo);
  };

  const edit = (newTodo) => {
    const id = newTodo.id;
    fetch(`${todosApiUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => editTodo(data))
      .catch((error) => console.log(error));
  };

  const destroy = (id) => {
    fetch(`${todosApiUrl}/${id}`, { method: "DELETE" })
      .then(destroyTodo(id))
      .catch((error) => console.log(error));
  };

  const check = (id) => {
    var updatedTodo = findTodo(id);
    console.log(updatedTodo)
    updatedTodo = { ...updatedTodo, completed: !updatedTodo.completed };
    fetch(`${todosApiUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkTodo(id))
      .catch((error) => console.log(error));
  };

  return (
    <>
      {isEditing ? (
        <TodoEditDisplay
          inputText={inputText}
          handleBlur={handleBlur}
          handleKeyPress={handleKeyPress}
          handleChange={handleChange}
        />
      ) : (
        <TodoNormalDisplay
          handleDoubleClick={handleDoubleClick}
          todo={todo}
          handleDestroy={destroy}
          handleCheck={check}
        />
      )}
    </>
  );
}

export function TodoNormalDisplay({
  handleDoubleClick,
  todo,
  handleDestroy,
  handleCheck,
}) {
  return (
    <li className={`${todo.completed && "completed"}`}>
      <div className="view">
        <input
          id="toggle"
          className="toggle"
          type="checkbox"
          onChange={() => handleCheck(todo.id)}
          checked={todo.completed}
        ></input>
        <label htmlFor="toggle" onDoubleClick={handleDoubleClick}>
          {todo.title}
        </label>
        <button
          className="destroy"
          onClick={() => handleDestroy(todo.id)}
        ></button>
      </div>
    </li>
  );
}

export function TodoEditDisplay({
  inputText,
  handleBlur,
  handleKeyPress,
  handleChange,
}) {
  return (
    <li className="editing">
      <input
        className="edit"
        value={inputText}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        data-testid="todo-edit"
        autoFocus
      ></input>
    </li>
  );
}
