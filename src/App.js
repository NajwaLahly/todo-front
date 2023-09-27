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
    const nextValue = inputText.trim();
    if (e.key === "Enter" && nextValue !== "") {
      const id = uuidv4();
      add({id:id, value:nextValue})
      setInputText("");
    }
  };

  const handleEdit = (nextTodo) => {
    const nextValue = nextTodo.value.trim();
    console.log(nextValue);
    if (nextValue === "") {
      return destroy(nextTodo);
    }
    edit(nextTodo);
  };

  const add = (newTodo) => {
    setTodos((prevTodos)=> [...prevTodos, { id: newTodo.id, value: newTodo.value }])
  }

  const destroy = (todoTodestroy) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== todoTodestroy.id)
    );
  };

  const edit = (newTodo) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (newTodo.id === todo.id) {
          return { ...todo, value: newTodo.value };
        }
        return todo;
      });
    });
  }

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
      <TodoList todos={todos} handleEdit={handleEdit} />
    </section>
  );
}

export default App;
