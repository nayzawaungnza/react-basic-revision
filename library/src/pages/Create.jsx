import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Create() {
  let [title, setTitle] = useState();
  let [description, setDescription] = useState();
  let [newCategory, setNewCategory] = useState([]);
  let [categories, setCategories] = useState([]);
  let { setPostData, data: book } = useFetch(
    "http://localhost:3001/books/",
    "POST"
  );
  let addCategory = (e) => {
    e.preventDefault();
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory("");
      return;
    }
    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory("");
  };
  let addBook = (e) => {
    e.preventDefault();
    let book = {
      id: Math.floor(Math.random() * 10000),
      title: title,
      description: description,
      categories: categories,
    };
    setPostData(book);
  };
  let navigate = useNavigate();
  useEffect(() => {
    if (book) {
      navigate("/");
    }
  }, [book, navigate]);
  let { isDark } = useTheme();
  return (
    <div className="h-screen">
      <form className="w-full max-w-lg mx-auto" onSubmit={addBook}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-title"
            >
              Book Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-title"
              type="text"
              placeholder="enter title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-des"
            >
              Book Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-des"
              placeholder="enter description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
            >
              Book Categories
            </label>
            <div className="flex items-center space-x-2">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Enter Book Category"
              />
              <button
                onClick={addCategory}
                className="bg-primary p-2 rounded mb-3"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
            <div className=" flex flex-wrap justify-start ">
              {categories.map((genre) => (
                <span
                  className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500"
                  key={genre}
                >
                  {" "}
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 w-full text-white bg-primary px-3 py-2 rounded justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span className="hidden md:block">Create Book</span>
        </button>
      </form>
    </div>
  );
}
