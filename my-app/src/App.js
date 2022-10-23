import "./App.css";
import Login from "./frontend/pages/login/login";
import Register from "./frontend/pages/register/register";
import EditProfile from "./frontend/pages/edit profile/editProfile";
import Home from "./frontend/pages/homepage/homepage";
import Profile from "./frontend/pages/profile/profile";
import Quiz from "./frontend/pages/quiz/quiz";
import Results from "./frontend/pages/quiz/results";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./frontend/pages/login/forgetPassword";
import SecurityQuestionnaire from "./frontend/pages/login/securityQuestionnaire";
import Header from "./frontend/pages/header/header";
import Playlist from "./frontend/pages/playlist/playlist";
import NewPassword from "./frontend/pages/login/newPassword";
import Settings from "./frontend/pages/settings/settings";
import { useLocation } from "react-router-dom";
import PastQuizPref from "./frontend/pages/quiz/pastQuizPref";
import ProfileSetup from "./frontend/pages/register/profileSetup";
function App() {
  const location = useLocation();
  console.log("pathname", location);
  const hideHeader =
    location.pathname === "/" || location.pathname === "/register" ? null : (
      <Header></Header>
    );
  return (
    <div className="App">
      {hideHeader}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profileSetup" element={<ProfileSetup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route
          path="/securityQuestionnaire"
          element={<SecurityQuestionnaire />}
        />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/pastQuizPreferences" element={<PastQuizPref />} />
      </Routes>
    </div>
  );
}

export default App;
