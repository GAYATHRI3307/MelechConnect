import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp'; 
import Dashboard from './Dashboard'; 
import { UserProvider } from './UserContext';
const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> 
             <Route path="/user-dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
