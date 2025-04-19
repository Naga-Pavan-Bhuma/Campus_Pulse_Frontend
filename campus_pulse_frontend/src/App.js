import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AnnouncementPopup from "./components/AnnouncemetPopup";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Body from "./components/Body";
import Home from "./components/Home";
import Clubs from "./components/Clubs";
import MainLayout from "./components/MainLayout";
import Career from "./components/Career";
import Faculty from "./components/Faculty";
import Admin from "./components/Admin";
import ExamSchedule from "./components/ExamSchedule";
import StudentDashboard from "./components/StudentDashboard";
import EventPage from "./components/EventsSection";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const App = () => {
  return (
    <Router> {/* Router wrapping entire app */}
      <AnnouncementRoutes />
    </Router>
  );
};

const AnnouncementRoutes = () => {
  const location = useLocation();
  const [announcements, setAnnouncements] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(`${API_URL}/announcements`);
        setAnnouncements(res.data);
        if (res.data.length > 0) {
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="examschedule" element={<ExamSchedule />} />
        </Route>

        <Route path="/student" element={<MainLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="career" element={<Career />} />
          <Route path="examschedule" element={<ExamSchedule />} />
          <Route path="events" element={<EventPage />} />
        </Route>

        <Route path="/faculty" element={<MainLayout />}>
          <Route index element={<Faculty />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="career" element={<Career />} />
          <Route path="examschedule" element={<ExamSchedule />} />
        </Route>

        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Admin />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="career" element={<Career />} />
          <Route path="examschedule" element={<ExamSchedule />} />
        </Route>
      </Routes>

      {showPopup && (
        <AnnouncementPopup
          announcements={announcements}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default App;
