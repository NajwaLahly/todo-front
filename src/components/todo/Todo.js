import { useState } from "react";

export default function Todo({ todo, handleEdit, handleDestroy }) {
  const [isChecked, setIsChecked] = useState(false);
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
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          handleDoubleClick={handleDoubleClick}
          todo={todo}
          handleDestroy={handleDestroy}
        />
      )}
    </>
  );
}

function TodoNormalDisplay({
  isChecked,
  setIsChecked,
  handleDoubleClick,
  todo,
  handleDestroy,
}) {
  return (
    <li className={`${isChecked && "completed"}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => setIsChecked(!isChecked)}
        ></input>
        <label onDoubleClick={handleDoubleClick}>{todo.value}</label>
        <button
          className="destroy"
          onClick={() => handleDestroy(todo.id)}
        ></button>
      </div>
    </li>
  );
}

function TodoEditDisplay({
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
        autoFocus
      ></input>
    </li>
  );
}
