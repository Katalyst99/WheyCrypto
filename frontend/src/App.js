// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/signup" component={SignupForm} />
                    <Route path="/login" component={LoginForm} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route path="/" component={LoginForm} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;

