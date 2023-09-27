import TodoInput from "./components/todoInput/TodoInput.js";
import TodoList from "./components/todoList/TodoList.js";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && inputText !== "") {
      const nextTodos = todos.slice();
      const formattedInput = inputText.trim();
      const id = uuidv4();
      setTodos([...nextTodos, { id: id, value: formattedInput }]);
      setInputText("");
    }
  };

  const handleEdit = (nextTodo) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (nextTodo.id === todo.id) {
          return { ...todo, value: nextTodo.value };
        }
        return todo;
      });
    });
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
      </header>
      <TodoList todos={todos} handleEdit={handleEdit}/>
    </section>
  );
}

export default App;
