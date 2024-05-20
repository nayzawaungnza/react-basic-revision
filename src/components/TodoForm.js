import React, { useState } from "react";

export default function TodoForm({ addTodo }) {
  let [title, setTitle] = useState("");
  let handleForm = (e) => {
    e.preventDefault();
    let todo = {
      id: Math.floor(Math.random() * 10000),
      title: title,
      completed: false,
    };
    addTodo(todo);
    setTitle("");
    console.log("hit");
  };
  return (
    <>
      <form action="#" onSubmit={handleForm}>
        <input
          type="text"
          className="todo-input"
          placeholder="What do you need to do?"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </form>
    </>
  );
}
