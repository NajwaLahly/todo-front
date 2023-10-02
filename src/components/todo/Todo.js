import { useState } from "react";

export default function Todo({ todo, handleEdit, handleDestroy, handleCheck }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(todo.value);

  const handleDoubleClick = () => {
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleEdit({ id: todo.id, value: inputText });
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
          handleDestroy={handleDestroy}
          handleCheck={handleCheck}
        />
      )}
    </>
  );
}

export function TodoNormalDisplay({
  handleDoubleClick,
  todo,
  handleDestroy,
  handleCheck
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
        <label htmlFor="toggle" onDoubleClick={handleDoubleClick}>{todo.value}</label>
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
