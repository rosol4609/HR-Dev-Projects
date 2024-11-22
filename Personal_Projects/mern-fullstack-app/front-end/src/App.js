import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserList from './pages/UserList';
import Register from './pages/Register';
import Delete from './pages/Delete';
import Welcome from './pages/Welcome';
import Navbar from './components/Form/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userlist" element={<ProtectedRoute requiredRole="admin"><UserList /></ProtectedRoute>} />
          <Route path="/delete" element={<ProtectedRoute requiredRole="admin"><Delete /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

