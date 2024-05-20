import React from "react";

export default function ClearCompletedBtn({ clearCompletedTodo }) {
  return (
    <>
      <div>
        <button onClick={clearCompletedTodo} className="button">
          Clear completed
        </button>
      </div>
    </>
  );
}
