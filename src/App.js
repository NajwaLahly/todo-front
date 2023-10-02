import TodoInput from "./components/todoInput/TodoInput.js";
import TodoList from "./components/todoList/TodoList.js";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Footer from "./components/footer/Footer.js";

const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(storageKey)) || fallbackState);
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  },[storageKey, value]);
  return [value, setValue];
}


function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useLocalStorage('todos', []);

  const completed = useMemo(() => todos.filter((todo) => todo.completed), [todos])
  const active = useMemo(() => todos.filter((todo) => !todo.completed), [todos])
  const itemLeftCount = active.length

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnterPress = (e) => {
    const nextValue = inputText.trim();
    if (e.key === "Enter" && nextValue) {
      const id = uuidv4();
      add({ id, value: nextValue });
      setInputText("");
    }
  };

  const handleEdit = (nextTodo) => {
    const nextValue = nextTodo.value.trim();
    if (!nextValue) {
      return destroy(nextTodo.id);
    }
    edit(nextTodo);
  };

  const add = (newTodo) => {
    setTodos((prevTodos) => [
      { ...newTodo, completed: false },
      ...prevTodos
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

  const markAllAsComplete = () => {
    if(todos.length > completed.length) {
      setTodos(todos.map(todo => {
          return {...todo, completed:true}
    }))
    } else {
      setTodos(todos.map(todo => {return {...todo, completed: false}}))
    }
  }

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
        <input id="toggle-all" className="toggle-all" type="checkbox" onClick={markAllAsComplete}></input>
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
