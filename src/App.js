import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import { useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);
  let addTodo = (todo) => {
    //server side
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    //client side
    setTodos((prevState) => [...prevState, todo]);
  };
  let deleteTodo = (todoID) => {
    //server
    fetch(`http://localhost:3001/todos/${todoID}`, {
      method: "DELETE",
    });
    //client
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.id !== todoID;
      });
    });
  };
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        <TodoList todos={todos} deleteTodo={deleteTodo} />

        <CheckAllAndRemaining />

        <div className="other-buttons-container">
          <TodoFilters />
          <ClearCompletedBtn />
        </div>
      </div>
    </div>
  );
}

export default App;
