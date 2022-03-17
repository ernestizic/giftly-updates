import Dashboard from "pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing";
import { store, persistor } from "redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AlertBox from "components/global/AlertBox";
import ViewWishListItems from "pages/ViewWishListItems";
import FAQs from "components/landing/FAQs";
import ViewUserWishLists from "pages/ViewUserWishLists";
import Terms from "components/landing/Terms";
import Privacy from "components/landing/Privacy";
import axios from "axios";
import { setToken, setUser } from "features/auth/authSlice";

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
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AlertBox />
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

            {/* No match */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
