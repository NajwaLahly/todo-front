import { useState } from "react";

export default function Todo({ todo }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(todo);

  const doubleClickHandler = () => {
    setIsEditing(!isEditing);
  };

  //   useEffect(() => {
  //     console.log('edit ' + isEditing)
  //     console.log('click ' + isClicked)
  //     const handleClickOutside = (e) => {
  //       if (
  //         inputRef.current &&
  //         !inputRef.current.contains(e.target)
  //       ) {
  //         // setIsClicked(true);
  //         alert('here')
  //       }
  //     };
  //     document.addEventListener("click", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   }, [isEditing]);

  return (
    <li
      key=""
      className={`${isChecked && "completed"} ${isEditing && "editing"}`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => setIsChecked(!isChecked)}
        ></input>
        <label onDoubleClick={doubleClickHandler} >{todo}</label>
        <button className="destroy"></button>
      </div>
      {isEditing && (
        <input
          className="edit"
          value={inputText}
          onBlur={() => setIsEditing(false)}
          onChange={(e) => setInputText(e.target.value)}
          autoFocus
        ></input>
      )}
    </li>
  );
}
