import { useEffect, useRef, useState } from "react";

function useFetch(url, method = "GET") {
  let [postData, setPostData] = useState(null);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  //let [option, setOption] = useState(_option);
  //let option = useRef(_option).current;

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;
    let options = {
      signal,
      method,
    };

    setLoading(true);
    let fetchData = () => {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw Error("something went wrong");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setError(null);
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message);
        });
    };

    if (method === "POST" && postData) {
      options = {
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };
      fetchData();
    }
    if (method === "GET") {
      fetchData();
    }

    //clean up function
    return () => {
      abortController.abort();
    };
  }, [url, postData]);
  return { setPostData, data: data, loading: loading, error: error };
}
export default useFetch;
//useFetch, not add (reference data type) to dependency , only allow premitive data type
//premitive
// - String
//     - Number
//     - Boolean
//     -

//     referenct
//     - Array
//     - Object
//     (case to infinite loop)
//use (useRef, or , useState ) to prevent
