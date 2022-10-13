import "./App.css";
import Login from "./frontend/pages/login/login";
import Register from "./frontend/pages/register/register"
import EditProfile from "./frontend/pages/edit profile/editProfile"
import Home from "./frontend/pages/homepage/homepage"
import Profile from "./frontend/pages/profile/profile"
import Quiz from "./frontend/pages/quiz/quiz"
import Results from "./frontend/pages/quiz/results"
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
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  </div>
}

export default App;
