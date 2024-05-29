import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useFirestore from "../../hooks/useFirestore";
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
            <div className="w-96 mx-auto">
              <div className="relative w-full min-w-[200px]">
                <textarea
                  className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                ></textarea>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  My Note
                </label>
              </div>
              <button className="text-white bg-primary px-3 py-2 rounded flex items-center gap-1">
                <span className="hidden md:block">add note</span>
              </button>
            </div>
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
                    <i class="far fa-thumbs-up"></i> Like
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <i class="far fa-comment-alt"></i> Reply
                  </a>
                </div>
                <div class="flex items-center">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700 mr-4"
                  >
                    <i class="far fa-flag"></i> Report
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <i class="far fa-share-square"></i> Share
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
