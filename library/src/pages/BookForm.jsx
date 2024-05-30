import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../contexts/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Create() {
  let { id } = useParams();

  let [title, setTitle] = useState();
  let [description, setDescription] = useState();
  let [newCategory, setNewCategory] = useState([]);
  let [categories, setCategories] = useState([]);
  let [isEdit, setIsEdit] = useState(false);
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState("");

  let { addCollection, updateDocument } = useFirestore();
  let { user } = useContext(AuthContext);

  let navigate = useNavigate();
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      //get book by it's id
      let ref = doc(db, "books", id);
      getDoc(ref).then((doc) => {
        if (doc.exists()) {
          //console.log(doc.data());
          let { title, description, categories, cover } = doc.data();
          setTitle(title);
          setDescription(description);
          setCategories(categories);
          setPreview(cover);
        }
      });
    } else {
      setIsEdit(false);
      setTitle("");
      setDescription("");
      setCategories([]);
      setPreview("");
    }
  }, []);

  let addCategory = (e) => {
    e.preventDefault();
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory("");
      return;
    }
    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory("");
  };
  let uploadFileToFirestorage = async (file) => {
    let uniqueFileName = Date.now().toString() + "_" + file.name;
    let path = "/covers/" + user.uid + "/" + uniqueFileName;
    let storageRef = ref(storage, path);
    // let resImage = await uploadBytes(storageRef, file);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef); //return url
  };
  let submitForm = async (e) => {
    e.preventDefault();
    let url;
    if (file) {
      url = await uploadFileToFirestorage(file);
    } else {
      url = preview;
    }

    console.log(url);
    let book = {
      title: title,
      description: description,
      categories: categories,
      uid: user.uid,
      cover: url,
    };
    //firebase
    if (isEdit) {
      console.log(book.cover);
      await updateDocument("books", id, book);
    } else {
      await addCollection("books", book);
    }

    navigate("/");
  };
  let handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };
  let handlePreviewImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  useEffect(() => {
    if (file) {
      handlePreviewImage(file);
    }
  }, [file]);

  let { isDark } = useTheme();
  return (
    <div className="h-screen">
      <form className="w-full max-w-lg mx-auto" onSubmit={submitForm}>
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
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="bookImage"
              >
                Book Image
              </label>
              <input
                className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="bookImage"
                type="file"
                onChange={handlePhotoChange}
              />
              {!!preview && <img src={preview} width={200} height={200} />}
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

          <span className="hidden md:block">
            {isEdit ? "Update" : "Create"} Book
          </span>
        </button>
      </form>
    </div>
  );
}
