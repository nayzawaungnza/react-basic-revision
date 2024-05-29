import React, { useContext } from "react";
import useFirestore from "../../hooks/useFirestore";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function NoteList() {
  let { user } = useContext(AuthContext);
  let { id } = useParams();
  let { getCollection } = useFirestore();
  let {
    error,
    loading,
    data: notes,
  } = getCollection("notes", ["bookUid", "==", id]);
  console.log(notes);
  return (
    <>
      {!!error && <p>{error}</p>}
      {!!loading && <p>loading...</p>}
      {!!notes &&
        notes.map((note) => (
          <div className="max-w-md mx-auto border px-6 py-4 rounded-lg">
            <div className="flex items-center mb-6">
              <img
                src="https://randomuser.me/api/portraits/men/97.jpg"
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="text-lg font-medium text-primary">John Doe</div>
                <div className="text-gray-500">
                  {moment(note?.date?.seconds * 1000).fromNow()}
                </div>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">{note.body}</p>
            <div className="flex justify-between items-center">
              <div>
                <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
                  <i className="far fa-thumbs-up"></i> Like
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <i className="far fa-comment-alt"></i> Reply
                </a>
              </div>
              <div className="flex items-center">
                <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
                  <i className="far fa-flag"></i> Report
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <i className="far fa-share-square"></i> Share
                </a>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
