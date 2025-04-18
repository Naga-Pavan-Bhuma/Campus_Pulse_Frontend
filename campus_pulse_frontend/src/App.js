import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Body from './components/Body';
import ExamSchedule from './components/ExamSchedule';
import MainLayout from './components/MainLayout';

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
          <Route path="examschedule" element={<ExamSchedule />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
