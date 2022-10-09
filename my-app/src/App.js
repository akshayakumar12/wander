import "./App.css";
import Login from "./frontend/pages/login/login";
import Register from "./frontend/pages/register/register"
import EditProfile from "./frontend/pages/edit profile/editProfile"
import Home from "./frontend/pages/homepage/homepage"
import Profile from "./frontend/pages/profile/profile"
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  /*
  return <div className="App">
    <Login/>
  </div>;
  */
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </div>
}

export default App;
