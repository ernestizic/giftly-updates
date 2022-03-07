import Dashboard from "pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home/*" element={<Landing />} />
        <Route path="/user" element={<Navigate to="/user/wish-lists" />} />
        <Route path="/user/*" element={<Dashboard />} />

        {/* No match */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
