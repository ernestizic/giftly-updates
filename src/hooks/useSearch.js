import axios from "axios";
import { useCallback, useState } from "react";
import { base_url, debounce } from "utils/utils";

const useSearch = () => {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [finding, setFinding] = useState(false);

  const handleFind = async (e) => {
    const q = e.target.value;

    setSearch(q);

    if (!q) return;

    try {
      setFinding(true);
      const res = await axios.get(`${base_url}/user/search?q=${q}`);

      if (res.data.status === "success") {
        setFriends(res.data.data);
      }

      setFinding(false);
    } catch (e) {
      setFinding(false);
      console.log(e);
    }
  };

  // eslint-disable-next-line
  const findFriends = useCallback(debounce(handleFind, 500), []);

  const showMobileSearch = () => {
    document.querySelector(".searchBox").classList.add("open");
  };

  const hideMobileSearch = () => {
    document.querySelector(`input[name=search]`).value = "";
    document.querySelector(".searchBox").classList.remove("open");
    setSearch("");
  };

  return {
    search,
    setSearch,
    friends,
    findFriends,
    finding,
    showMobileSearch,
    hideMobileSearch,
  };
};

export default useSearch;
