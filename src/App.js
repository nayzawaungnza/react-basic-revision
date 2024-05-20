import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import { useCallback, useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [filterTodos, setfilterTodos] = useState(todos);
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setfilterTodos(data);
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
  let updateTodo = (newTodo) => {
    //server
    fetch(`http://localhost:3001/todos/${newTodo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    //client
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if (todo.id == newTodo.id) {
          return newTodo;
        }
        return todo;
      });
    });
  };

  const remainingTodo = (todos) => {
    return todos.filter((todo) => !todo.completed).length;
  };
  const remainingCount = remainingTodo(todos);

  let checkAll = () => {
    //server
    todos.forEach((todo) => {
      todo.completed = true;
      updateTodo(todo);
    });
    //client
    setTodos((prevState) => {
      return prevState.map((todo) => {
        return { ...todo, completed: true };
      });
    });
  };

  let clearCompletedTodo = () => {
    //server
    todos.forEach((todo) => {
      if (todo.completed == true) {
        deleteTodo(todo.id);
      }
    });
    //client
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.completed === false;
      });
    });
  };
  let filterBy = useCallback(
    (filter) => {
      if (filter === "All") {
        setfilterTodos(todos);
      }
      if (filter === "Active") {
        setfilterTodos(todos.filter((todo) => !todo.completed));
      }
      if (filter === "Completed") {
        setfilterTodos(todos.filter((todo) => todo.completed));
      }
    },
    [todos]
  );

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        <TodoList
          todos={filterTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        <CheckAllAndRemaining
          checkAll={checkAll}
          remainingCount={remainingCount}
        />

        <div className="other-buttons-container">
          <TodoFilters filterBy={filterBy} />
          <ClearCompletedBtn clearCompletedTodo={clearCompletedTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
