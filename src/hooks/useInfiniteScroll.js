import { useCallback, useEffect, useState } from "react";

import { useRef } from "react";

const useInfiniteScroll = (request) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  let res;

  const sendRequest = useCallback(async () => {
    // if (!hasMore) return;
    try {
      setLoading(true);
      setError(false);
      res = await request(page);
      const { data, pagination: { current_page, total_pages } } = res.data;
      setList((prev) => [...prev, ...data]);
      setHasMore(current_page < total_pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, [page]);

  const observer = useRef(); // (*)
  const lastListElementRef = useCallback(  // (*)
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
  }, [sendRequest, page]);

  return { loading, error, list, res, lastListElementRef };
}

export default useInfiniteScroll;