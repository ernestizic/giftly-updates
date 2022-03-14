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
import Terms from "components/landing/Terms";
import Privacy from "components/landing/Privacy";

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
            <Route path="/:username/:slug/*" element={<ViewWishListItems />} />
            <Route path="/faqs" element={<FAQs />} />
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
