import "todomvc-app-css/index.css";
import "todomvc-common/base.css";
import { useState } from "react";

export default function TodoInput(props) {

  const [inputText, setInputText] = useState("");
  const todosApiUrl = "http://localhost:8081/todos";


  const add = (newTodo) => {
    fetch(todosApiUrl, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => props.addTodo(data))
      .catch((error) => console.log(error));
  };

  
  const handleEnterPress = (e) => {
    const nextTitle = inputText.trim();
    if (e.key === "Enter" && nextTitle) {
      add({ title: nextTitle });
      setInputText("");
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <input
      placeholder="What needs to be done?"
      className="new-todo"
      onChange={handleChange}
      onKeyDown={handleEnterPress}
      autoFocus
      data-testid="todo-input"
      value={inputText}></input>
  );
}
