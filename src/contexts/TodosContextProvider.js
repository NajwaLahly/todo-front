import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { getAll } from "../api/fetchers";

const todosContext = createContext([]);

export default function TodosContextProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      getAll()
        .then((data) => setTodos(data))
        .catch((e) => console.log(e));
    };
    fetchData();
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

  const addTodo = (todo) => {
    console.log(todo);
    setTodos((prevTodos) => [todo, ...prevTodos]);
  };

  const destroyTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (targetTodo) => {
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

  const findTodo = (id) => {
    return todos.find((todo) => todo.id === id);
  };

  return (
    <todosContext.Provider
      value={{
        todos,
        addTodo,
        destroyTodo,
        editTodo,
        checkTodo,
        findTodo,
        completed,
        itemLeftCount,
      }}
    >
      {children}
    </todosContext.Provider>
  );
}

export const useTodos = () => {
  return useContext(todosContext);
};
