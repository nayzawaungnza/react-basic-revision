import { useEffect, useState } from "react";

function useFetch(url) {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(url)
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
  }, [url]);
  return { data: data, loading: loading, error: error };
}
export default useFetch;
