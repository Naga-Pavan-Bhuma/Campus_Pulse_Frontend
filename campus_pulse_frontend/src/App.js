import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Body from './components/Body';
import ExamSchedule from './components/ExamSchedule';
import MainLayout from './components/MainLayout';
import Clubs from './components/Clubs';
import Career from './components/Career';
import Foodmenu from './components/Foodmenu';
import TimetableManager from './components/TimetableManager';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="examschedule" element={<ExamSchedule />} />
        </Route>
        <Route path="/student" element={<MainLayout />}>
          <Route index element={<Career />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="career" element={<Career />} />
          <Route path="examschedule" element={<ExamSchedule />} />
          <Route path="foodmenu" element={<Foodmenu />} />
          <Route path="timetable" element={<TimetableManager />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
