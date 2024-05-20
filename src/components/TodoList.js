import React from "react";
import Todo from "./Todo";
export default function TodoList({ todos, deleteTodo }) {
  //received by destructuring
  return (
    <>
      <ul className="todo-list">
        {todos &&
          todos.map((todo) => (
            <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} />
          ))}
      </ul>
    </>
  );
}
