import { clearAlert, setAlertTimeout, showAlert } from "features/alert/alertSlice";
import { useCallback, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useRef } from "react";

const useInfiniteScroll = (request, listKey) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState();
  const dispatch = useDispatch();

  const updateFilters = (val) => {
    setList([]);
    setFilters(val);
  }

  const sendRequest = useCallback(async () => {
    // if (!hasMore) return;
    try {
      setLoading(true);
      setError(false);
      const res = await request(page, filters);
      
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
  
      if (!res) {
        dispatch(showAlert("An error occurred"));
        return;
      }

      const list = res.data.data[listKey];
      const links = res.data.data.pagination?.links || {};
      
      setList((prev) => [...prev, ...list]);
      setHasMore(links?.next_page_url);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(showAlert(e.response?.data.message || "Something went wrong"));
    }
    // eslint-disable-next-line
  }, [page, filters]);

  const observer = useRef();
  const lastListElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest, page, filters]);

  return { loading, error, list, lastListElementRef, updateFilters };
}

export default useInfiniteScroll;