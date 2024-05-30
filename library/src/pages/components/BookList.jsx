import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

import deleteImg from "../../assets/delete.svg";
import editImg from "../../assets/edit.svg";
import useFirestore from "../../hooks/useFirestore";
import { AuthContext } from "../../contexts/AuthContext";
import { storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";

export default function BookList() {
  //get collection
  let { getCollection, deleteDocument } = useFirestore();
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let search = params.get("search");
  let { user } = useContext(AuthContext);

  let {
    error,
    loading,
    data: books,
  } = getCollection("books", ["uid", "==", user.uid]);

  let deleteBook = async (e, id, cover) => {
    e.preventDefault();

    // Extract file path from the cover URL

    const pathStartIndex = cover.indexOf("/o/") + 3;
    const pathEndIndex = cover.indexOf("?");
    const filePath = decodeURIComponent(
      cover.substring(pathStartIndex, pathEndIndex)
    );

    // Delete the image from Firebase Storage
    const imageRef = ref(storage, filePath);

    try {
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      return;
    }

    // Delete the Firestore document
    try {
      await deleteDocument("books", id);
      console.log("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
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
              <img src={book.cover} alt="" />
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
                  <div className="flex space-x-2 items-center">
                    <Link to={`edit/${book.id}`}>
                      <img src={editImg} />
                    </Link>
                    <img
                      src={deleteImg}
                      onClick={(e) => deleteBook(e, book.id, book.cover)}
                    />
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
