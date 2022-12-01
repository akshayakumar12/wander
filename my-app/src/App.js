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
import PlaylistPage from "./frontend/pages/playlist/playlistPage";
import NewPassword from "./frontend/pages/login/newPassword";
import Settings from "./frontend/pages/settings/settings";
import { useLocation } from "react-router-dom";

import QuizHistory from "./frontend/pages/quiz/quiz_history";
import TripView from "./frontend/pages/trip/trip";

import ProfileSetup from "./frontend/pages/register/profileSetup";

import NewTrip from "./frontend/pages/trip/newTrip";
import NewHome from "./frontend/pages/homepage/newhome";

import Confirm from "./frontend/pages/quiz/quizConf";
import Loading from "./frontend/pages/quiz/loading";
import ExpandedTrip from "./frontend/pages/trip/expandedTrip";
import PastTrips from "./frontend/pages/trip/pastTrips";
import SpotifyData from "./frontend/pages/profile/spotifyData";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Theme } from "./frontend/pages/theme";

function App() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/profileSetup" ? null : (
      <Header></Header>
    );
  return (
    //<ThemeProvider theme={Theme}>
    <div className="App">
      {hideHeader}
      <Routes>
        {/* login and register*/}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profileSetup" element={<ProfileSetup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/securityQuestionnaire"
          element={<SecurityQuestionnaire />}
        />
        <Route path="/newPassword" element={<NewPassword />} />

        {/*Profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/spotifyData" element={<SpotifyData />} />

        {/*Home */}
        <Route path="/home" element={<Home />} />
        <Route path="/newhome" element={<NewHome></NewHome>} />

        {/*Quiz*/}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/quizhistory" element={<QuizHistory />} />
        <Route path="/confirmation" element={<Confirm></Confirm>} />
        <Route path="/playlist" element={<PlaylistPage />} />

        {/*Trip */}
        <Route path="/tripview" element={<TripView />} />
        <Route path="/expandedTrip" element={<ExpandedTrip />} />
        <Route path="/pastTrips" element={<PastTrips />} />
        <Route path="/newtrip" element={<NewTrip></NewTrip>} />
      </Routes>
    </div>
    //</ThemeProvider>
  );
}

export default App;
