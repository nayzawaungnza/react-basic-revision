import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";

export default function useFirestore() {
  //get collection
  let getCollection = (collectionName, _q) => {
    let qRef = useRef(_q).current; //useRef is solve infinity loop because (-q is array), that is infinity loop in effect
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState([]);

    useEffect(
      function () {
        console.log(qRef);
        setLoading(true);
        let ref = collection(db, collectionName);
        let queries = [];
        if (qRef) {
          queries.push(where(...qRef));
        }
        queries.push(orderBy("date", "desc"));
        let order = query(ref, ...queries);

        //real time firebase
        onSnapshot(order, (docs) => {
          if (docs.empty) {
            setError("No Fetching Data");
            setLoading(false);
          } else {
            let collectionData = [];
            docs.forEach((doc) => {
              let document = { id: doc.id, ...doc.data() };
              collectionData.push(document);
            });
            setData(collectionData);
            setLoading(false);
            setError("");
          }
        });
      },
      [qRef]
    );
    return { error, loading, data };
  };
  //add collection
  let addCollection = async (collectionName, data) => {
    data.date = serverTimestamp();
    let ref = collection(db, collectionName);
    return addDoc(ref, data);
  };

  //get document
  let getDocument = (collectionName, id) => {
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState(null);

    useEffect(() => {
      setLoading(true);
      let ref = doc(db, collectionName, id);

      //realtime firebas database
      onSnapshot(ref, (doc) => {
        if (doc.exists()) {
          let document = { id: doc.id, ...doc.data() };
          setData(document);
          setLoading(false);
          setError("");
        } else {
          setError("Not Data Found.");
          setLoading(false);
        }
      });
    }, [id]);

    return { error, loading, data };
  };
  //delete document
  let deleteDocument = async (collectionName, id) => {
    //delete firestore doc
    let ref = doc(db, collectionName, id);
    return deleteDoc(ref);
    //remove setBooks for frontend because realtime firebase using onSnapShot
    //setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  //update Document
  let updateDocument = async (collectionName, id, data) => {
    data.date = serverTimestamp();
    let ref = doc(db, collectionName, id);
    return updateDoc(ref, data);
  };

  return {
    getCollection,
    addCollection,
    getDocument,
    deleteDocument,
    updateDocument,
  };
}
