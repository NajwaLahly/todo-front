import { useState } from "react";

export default function Todo({ value, id , handleEdit}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(value);

  const doubleClickHandler = () => {
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleEdit({id:id, value: inputText})
  };

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
        <label onDoubleClick={doubleClickHandler} >{inputText}</label>
        <button className="destroy"></button>
      </div>
      {isEditing && (
        <input
          className="edit"
          value={inputText}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          onChange={(e) => setInputText(e.target.value)}
          autoFocus
        ></input>
      )}
    </li>
  );
}
