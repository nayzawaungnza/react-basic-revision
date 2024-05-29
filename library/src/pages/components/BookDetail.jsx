import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useFirestore from "../../hooks/useFirestore";
import NoteForm from "./NoteForm";
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
            <div className="max-w-md mx-auto border px-6 py-4 rounded-lg">
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/men/97.jpg"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="text-lg font-medium text-primary">
                    John Doe
                  </div>
                  <div className="text-gray-500">2 hours ago</div>
                </div>
              </div>
              <p className="text-lg leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                amet lorem nulla. Donec consequat urna a tortor sagittis
                lobortis.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700 mr-4"
                  >
                    <i className="far fa-thumbs-up"></i> Like
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <i className="far fa-comment-alt"></i> Reply
                  </a>
                </div>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700 mr-4"
                  >
                    <i className="far fa-flag"></i> Report
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <i className="far fa-share-square"></i> Share
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
