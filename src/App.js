import TodoInput from "./components/todoInput/TodoInput.js";
import TodoList from "./components/todoList/TodoList.js";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

import { useState } from "react";

const data = [
  { id: 1, value: "todo1" },
  { id: 2, value: "todo2" }
];

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState(data);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && inputText !== "") {
      const nextTodos = todos.slice();
      const formattedInput = inputText.trim();
      setTodos([...nextTodos, formattedInput]);
      setInputText("");
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput
          inputText={inputText}
          handleEnterPress={handleEnterPress}
          handleChange={handleChange}
        />
        <TodoList todos={todos} setTodos={setTodos} />
      </header>
    </section>
  );
}

export default App;
