import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { store } from "redux/store";
import { setToken, setUser } from "features/auth/authSlice";

import AlertBox from "components/global/AlertBox";
import Dashboard from "pages/Dashboard";
import FAQs from "components/landing/FAQs";
import Landing from "./pages/Landing";
import Privacy from "components/landing/Privacy";
import { useSelector } from "react-redux";
import Terms from "components/landing/Terms";
import ViewUserWishLists from "pages/ViewUserWishLists";
import ViewWishListItems from "pages/ViewWishListItems";
import axios from "axios";
import VerifyEmail from "components/auth/VerifyEmail";
import ProductContextProvider from "context/ProductContext";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      store.dispatch(setToken(""));
      store.dispatch(setUser(null));
      window.location.replace("/home/login");
    }

    return Promise.reject(error);
  }
);

function App() {
  const {msg} = useSelector((state)=> state.alert)
  return (
    <ProductContextProvider>
      <Router>
        <AlertBox message={msg.message} type={msg.type} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home/*" element={<Landing />} />
          <Route path="/user" element={<Navigate to="/user/wish-lists" />} />
          <Route path="/user/*" element={<Dashboard />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/:username/:slug/*" element={<ViewWishListItems />} />
          <Route path="/:username" element={<ViewUserWishLists />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* No match */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </ProductContextProvider>
  );
}

export default App;
