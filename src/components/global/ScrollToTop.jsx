import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const target = document.querySelector(".content");
    target.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
