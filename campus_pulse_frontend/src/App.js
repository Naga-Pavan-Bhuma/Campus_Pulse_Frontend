import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
