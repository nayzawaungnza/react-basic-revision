import React, { useState } from "react";

export default function Todo({ todo, deleteTodo, updateTodo }) {
  let [isEdit, setisEdit] = useState(false);
  let [title, setTitle] = useState(todo.title);
  let updateTodoHandler = (e) => {
    e.preventDefault();
    let newTodo = {
      id: todo.id,
      title: title,
      completed: todo.completed,
    };
    updateTodo(newTodo);
    setisEdit(false);
  };
  let checkHandler = () => {
    console.log(!todo.completed);
    let newTodo = {
      id: todo.id,
      title: title,
      completed: !todo.completed,
    };
    updateTodo(newTodo);
  };
  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={checkHandler}
        />
        {!isEdit && (
          <span
            onDoubleClick={() => setisEdit(true)}
            className={`todo-item-label ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <form onSubmit={updateTodoHandler}>
            <input
              type="text"
              className="todo-item-input"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </form>
        )}
      </div>
      <button className="x-button" onClick={() => deleteTodo(todo.id)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
