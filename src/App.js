import TodoInput from './components/todoInput/TodoInput.js';
import TodoList from './components/todoList/TodoList.js';
import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css' ;

import {useState} from 'react'

function App() {

  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && inputText !== '') {
      const nextTodos = todos.slice();
      setTodos([...nextTodos, inputText.trim()]);
      setInputText('');
    }
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput inputText={inputText} handleEnterPress={handleEnterPress} handleChange={handleChange}/>
        <TodoList todos={todos}/>
      </header>
  
    </section>
  );
}

export default App;
