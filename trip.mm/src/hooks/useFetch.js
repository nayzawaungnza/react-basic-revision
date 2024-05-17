import { useEffect, useState } from "react";

function useFetch(url) {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let abortController = new AbortController();
  let signal = abortController.signal;

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      signal,
    })
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
    //clean up function
    return () => {
      console.log("clean up function");
      abortController.abort();
    };
  }, [url]);
  return { data: data, loading: loading, error: error };
}
export default useFetch;
