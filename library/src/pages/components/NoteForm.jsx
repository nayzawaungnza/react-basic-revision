import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useFirestore from "../../hooks/useFirestore";
import { useParams } from "react-router-dom";

export default function NoteForm({
  type = "create",
  setEditNote,
  editNote,
  editNoteId,
}) {
  let { id } = useParams();
  let { user } = useContext(AuthContext);
  let [body, setBody] = useState("");
  let [noteEmpty, setNoteEmpty] = useState(false);
  let { addCollection, updateDocument } = useFirestore();

  let addNote = async (e) => {
    e.preventDefault();
    let note = {
      body: body,
      bookUid: id,
      userUid: user.uid,
    };
    if (type === "create") {
      if (body !== "") {
        setNoteEmpty(false);
        await addCollection("notes", note);
        setBody("");
      } else {
        setNoteEmpty(true);
      }
    } else if (type === "update") {
      await updateDocument("notes", editNoteId, note, false);
      setEditNote();
    }
  };
  useEffect(() => {
    if (type === "update") {
      setBody(editNote);
    }
  }, []);
  return (
    <form onSubmit={addNote}>
      <div className="w-96 mx-auto">
        <div className="relative w-full min-w-[200px]">
          <textarea
            className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            My Note
          </label>
          {!!noteEmpty && (
            <p class="text-red-500 text-xs italic">Please fill note body.</p>
          )}
        </div>
        <div className="flex flex-wrap items-center space-x-3">
          <button
            type="submit"
            className="text-white bg-primary px-3 py-1 rounded flex items-center gap-1"
          >
            <span className=" md:block">
              {type === "create" ? "Add" : "Update"} note
            </span>
          </button>
          {type === "update" && (
            <button
              type="button"
              onClick={() => setEditNote(null)}
              className="text-primary border border-primary px-3 py-1 rounded flex items-center gap-1"
            >
              <span className=" md:block">cancle</span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
