import { useState } from "react";

export default function Todo({ todo, todos, setTodos, key}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(todo);

  const doubleClickHandler = () => {
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    setIsEditing(false);
    console.log(key);
    
    setTodos(todos.map((todo, index) => index === key ? todo = inputText.trim() : null))
  }

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
    <li key={key}
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
          onBlur={handleBlur}
          onChange={(e) => setInputText(e.target.value)}
          autoFocus
        ></input>
      )}
    </li>
  );
}
