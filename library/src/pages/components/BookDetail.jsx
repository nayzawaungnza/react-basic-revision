import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useFirestore from "../../hooks/useFirestore";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
export default function BookDetail() {
  let { id } = useParams();
  let { getDocument } = useFirestore();
  let { error, loading, data: book } = getDocument("books", id);

  let navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, navigate]);

  let { isDark } = useTheme();
  return (
    <div className="h-screen">
      {!!loading && <p>Loading ...</p>}
      {!!book && (
        <>
          <div className="grid grid-cols-2 rounded-lg text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white ">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
              src={book.cover}
              alt=""
            />

            <div className=" justify-start space-y-2 ">
              <h5
                className={`mb-2 text-xl font-medium ${
                  isDark ? "text-white" : ""
                }`}
              >
                {book.title}
              </h5>
              <div className=" flex flex-wrap justify-start ">
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
              <p className={`mb-4 text-base ${isDark ? "text-white" : ""}`}>
                {book.description}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <NoteForm />
            <NoteList/>
          </div>
        </>
      )}
    </div>
  );
}
