import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../src/pages/home/Home";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route
            path="/profile/:username"
            element={user ? <Profile /> : <Login />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
