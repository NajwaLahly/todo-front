import TodoInput from "./components/todoInput/TodoInput.js";
import TodoList from "./components/todoList/TodoList.js";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useState, useEffect, useMemo } from "react";
import Footer from "./components/footer/Footer.js";

// const useLocalStorage = (storageKey, fallbackState) => {
//   const [value, setValue] = useState(
//     JSON.parse(localStorage.getItem(storageKey)) || fallbackState
//   );
//   useEffect(() => {
//     localStorage.setItem(storageKey, JSON.stringify(value));
//   }, [storageKey, value]);
//   return [value, setValue];
// };

function App() {
  const [inputText, setInputText] = useState("");
  // const [todos, setTodos] = useLocalStorage("todos", []);
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

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnterPress = (e) => {
    const nextTitle = inputText.trim();
    if (e.key === "Enter" && nextTitle) {
      // const id = uuidv4();
      add({ title: nextTitle });
      setInputText("");
    }
  };

  const handleEdit = (nextTodo) => {
    const nextTitle = nextTodo.title.trim();
    if (!nextTitle) {
      return destroy(nextTodo.id);
    }
    edit(nextTodo);
  };

  const add = (newTodo) => {
    fetch(todosApiUrl, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => addTodo(data))
      .catch((error) => console.log(error));
  };

  const destroy = (id) => {
    fetch(`${todosApiUrl}/${id}`, { method: "DELETE" })
      .then(destroyTodo(id))
      .catch((error) => console.log(error));
  };

  const edit = (newTodo) => {
    const id = newTodo.id;
    fetch(`${todosApiUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => editTodo(data))
      .catch((error) => console.log(error));
  };

  const check = (id) => {
    var updatedTodo = todos.find((todo) => todo.id === id);
    updatedTodo = { ...updatedTodo, completed: !updatedTodo.completed };
    fetch(`${todosApiUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkTodo(id))
      .catch((error) => console.log(error));
  };

  const addTodo = (todo) => {
    setTodos((prevTodos) => [todo, ...prevTodos]);
  };

  const destroyTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (targetTodo) => {
    console.log(targetTodo)
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (targetTodo.id === todo.id) {
          return targetTodo;
        }
        return todo;
      });
    });
  };

  const checkTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  };

  const markAllAsComplete = () => {
    if (todos.length > completed.length) {
      todos.forEach((todo) => {
        fetch(`${todosApiUrl}/${todo.id}`, {
          method: 'PUT',
          body: JSON.stringify({...todo, completed: true}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => editTodo(data))
      })
    } else {
      todos.forEach((todo) => {
        fetch(`${todosApiUrl}/${todo.id}`, {
          method: 'PUT',
          body: JSON.stringify({...todo, completed: false}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => editTodo(data))
      })
    }
  };

  return (
    <BrowserRouter>
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
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onClick={markAllAsComplete}
          ></input>
          <label htmlFor="toggle-all">Mark all as complete</label>
          <Routes>
            <Route
              path="/active"
              element={
                <TodoList
                  todos={active}
                  handleEdit={handleEdit}
                  handleDestroy={destroy}
                  handleCheck={check}
                />
              }
            />

            <Route
              path="/completed"
              element={
                <TodoList
                  todos={completed}
                  handleEdit={handleEdit}
                  handleDestroy={destroy}
                  handleCheck={check}
                />
              }
            />

            <Route
              path="/"
              element={
                <TodoList
                  todos={todos}
                  handleEdit={handleEdit}
                  handleDestroy={destroy}
                  handleCheck={check}
                />
              }
            />
          </Routes>
        </section>
        <Footer
          itemLeftCount={itemLeftCount}
          clearCompleted={() => setTodos(active)}
          completed={completed.length}
        />
      </section>
    </BrowserRouter>
  );
}

export default App;
