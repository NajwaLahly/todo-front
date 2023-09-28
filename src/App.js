import TodoInput from "./components/todoInput/TodoInput.js";
import TodoList from "./components/todoList/TodoList.js";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Footer from "./components/footer/Footer.js";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [displayMode, setDisplayMode] = useState("Active");

  const itemLeftCount = todos.filter((todo) => todo.completed === false).length;

  const active = todos.filter((todo) => todo.completed === false);

  const completed = todos.filter((todo) => todo.completed === true);
  

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnterPress = (e) => {
    const nextValue = inputText.trim();
    if (e.key === "Enter" && nextValue !== "") {
      const id = uuidv4();
      add({ id: id, value: nextValue });
      setInputText("");
    }
  };

  const handleEdit = (nextTodo) => {
    const nextValue = nextTodo.value.trim();
    if (nextValue === "") {
      return destroy(nextTodo.id);
    }
    edit(nextTodo);
  };

  const add = (newTodo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: newTodo.id, value: newTodo.value, completed: false },
    ]);
  };

  const destroy = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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
  };

  const check = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  };


  const filteredTodos = () => {
    switch (displayMode) {
      case "Active":
        return active;
      case "All":
        return todos;
      case "Completed":
        return completed;
      default:
        return active;
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
      </header>
      <section className="main">
        <TodoList
          todos={filteredTodos()}
          handleEdit={handleEdit}
          handleDestroy={destroy}
          handleCheck={check}
        />
      </section>
      <Footer
        displayActive={() => {setDisplayMode("Active")}}
        displayAll={() => setDisplayMode("All")}
        displayCompleted={() => setDisplayMode("Completed")}
        itemLeftCount={itemLeftCount}
        clearCompleted={() => setTodos(active)}
        completed={completed.length}
      />
    </section>
  );
}

export default App;
