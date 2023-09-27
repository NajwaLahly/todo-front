import { useState } from "react";

export default function Todo({ todo , handleEdit, handleDestroy}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(todo.value);

  const doubleClickHandler = () => {
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleEdit({id:todo.id, value: inputText})
  };

  const handleKeyPress = (e) => {
    if(e.key === "Enter") {
      handleBlur();
    } 
    if(e.key === "Escape") {
      setIsEditing(false);
    }
  }


  return (
    <li
      className={`${isChecked && "completed"} ${isEditing && "editing"}`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => setIsChecked(!isChecked)}
        ></input>
        <label onDoubleClick={doubleClickHandler} >{todo.value}</label>
        <button className="destroy" onClick={() => handleDestroy(todo.id)}></button>
      </div>
      {isEditing && (
        <input
          className="edit"
          value={inputText}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          onChange={(e) => setInputText(e.target.value)}
          autoFocus
        ></input>
      )}
    </li>
  );
}
