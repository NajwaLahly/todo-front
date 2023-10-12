import "todomvc-app-css/index.css";
import "todomvc-common/base.css";
import { useState } from "react";
import * as Api from "../../api/fetchers.js";
import { useTodos } from "../../contexts/TodosContextProvider";


export default function TodoInput() {
  const [inputText, setInputText] = useState("");
  const { addTodo } = useTodos();

  const add = async (newTodo) => {
    try {
      Api.add(newTodo)
        .then((data) => addTodo(data))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
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
      value={inputText}
    ></input>
  );
}
