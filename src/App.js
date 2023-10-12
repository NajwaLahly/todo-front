import TodoInput from "./components/todoInput/TodoInput.js";
import TodoList from "./components/todoList/TodoList.js";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useState, useEffect, useMemo } from "react";
import Footer from "./components/footer/Footer.js";
import TodoCompleteToggle from "./components/todoInput/TodoCompleteToggle.js";

function App() {
  const [todos, setTodos] = useState([]);

  const todosApiUrl = "http://localhost:8081/todos";

  useEffect(() => {
    fetch(todosApiUrl, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }, []);

  const completed = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );
  const active = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );

  const itemLeftCount = active.length;

  const add = (todo) => {
    setTodos((prevTodos) => [todo, ...prevTodos]);
  };

  const destroy = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const edit = (targetTodo) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (targetTodo.id === todo.id) {
          return targetTodo;
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

  const find = (id) => {
    return todos.find((todo) => todo.id === id);
  };

  return (
    <BrowserRouter>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoInput addTodo={add} />
        </header>
        <section className="main">
          <TodoCompleteToggle
            todos={todos}
            completed={completed}
            editTodo={edit}
          />
          <Routes>
            <Route
              path="/active"
              element={
                <TodoList
                  todos={active}
                  checkTodo={check}
                  editTodo={edit}
                  destroyTodo={destroy}
                  findTodo={find}
                />
              }
            />

            <Route
              path="/completed"
              element={
                <TodoList
                  todos={completed}
                  checkTodo={check}
                  editTodo={edit}
                  destroyTodo={destroy}
                  findTodo={find}
                />
              }
            />

            <Route
              path="/"
              element={
                <TodoList
                  todos={todos}
                  checkTodo={check}
                  editTodo={edit}
                  destroyTodo={destroy}
                  findTodo={find}
                />
              }
            />
          </Routes>
        </section>
        <Footer
          itemLeftCount={itemLeftCount}
          destroyTodo={destroy}
          completed={completed.length}
        />
      </section>
    </BrowserRouter>
  );
}

export default App;
