import TodoInput from "./components/todoInput/TodoInput.js";
import TodoList from "./components/todoList/TodoList.js";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/footer/Footer.js";
import TodoCompleteToggle from "./components/todoInput/TodoCompleteToggle.js";
import TodosContextProvider from "./contexts/TodosContextProvider.js";

function App() {
  return (
    <TodosContextProvider>
      <BrowserRouter>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodoInput />
          </header>
          <section className="main">
            <TodoCompleteToggle />
            <Routes>
              <Route path="/active" element={<TodoList />} />
              <Route path="/completed" element={<TodoList />} />
              <Route path="/" element={<TodoList />} />
            </Routes>
          </section>
          <Footer />
        </section>
      </BrowserRouter>
    </TodosContextProvider>
  );
}

export default App;
