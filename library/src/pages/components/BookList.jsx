import React, { useEffect, useState } from "react";
import bookimage from "../../assets/surja-sen-das-raj.jpg";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import deleteImg from "../../assets/delete.svg";

export default function BookList() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let search = params.get("search");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let [books, setBooks] = useState([]);

  useEffect(function () {
    setLoading(true);
    let ref = collection(db, "books");
    let order = query(ref, orderBy("date", "desc"));
    getDocs(order).then((docs) => {
      if (docs.empty) {
        setError("No Fetching Data");
        setLoading(false);
      } else {
        let books = [];
        docs.forEach((doc) => {
          let book = { id: doc.id, ...doc.data() };
          books.push(book);
        });
        setBooks(books);
        setLoading(false);
        setError("");
      }
    });
  }, []);
  let deleteBook = async (e, id) => {
    e.preventDefault();
    console.log("Book ID : ", id);
    //delete firestore doc
    let ref = doc(db, "books", id);
    await deleteDoc(ref);
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };
  if (error) {
    return <p>{error}</p>;
  }
  let { isDark } = useTheme();
  return (
    <>
      {loading && <p> Loading ...</p>}
      {!!books && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
          {books.map((book) => (
            <div
              className={`p-4 border border-1 space-y-2 ${
                isDark ? "bg-dcard border-primary" : "bg-white"
              }`}
              key={book.id}
            >
              <img src={bookimage} alt="" />
              <div className="text-center space-y-2 mt-3">
                <h1 className={`${isDark ? "text-white" : ""}`}>
                  {book.title}
                </h1>
                <p className={`${isDark ? "text-white" : ""}`}>
                  {book.description}
                </p>
                {/* genres */}
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    {book.categories &&
                      book.categories.map((genre) => (
                        <span
                          className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500"
                          key={genre}
                        >
                          {" "}
                          {genre}
                        </span>
                      ))}
                  </div>
                  <div onClick={(e) => deleteBook(e, book.id)}>
                    <img src={deleteImg} />
                  </div>
                </div>
                <div>
                  <Link
                    to={`books/${book.id}`}
                    className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium w-full block rounded-sm text-sm px-4 py-2 text-center me-2 mb-2"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {books && !books.length && (
        <p className="text-center text-xl text-gray-500">
          No Search Results Found
        </p>
      )}
    </>
  );
}
