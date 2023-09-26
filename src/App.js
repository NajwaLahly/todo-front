import TodoInput from './components/todoInput/TodoInput.js';
import TodoList from './components/todoList/TodoList.js';
import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css' ;
// import './App.css'

function App() {
  const todos = []

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput />
        <TodoList todos={todos}/>
      </header>
  
    </section>
  );
}

export default App;
