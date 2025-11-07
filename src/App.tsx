import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Verify from './pages/Verify';
import Marketplace from './pages/Marketplace';
import RequestConfirm from './pages/RequestConfirm';
import Notifications from './pages/Notifications';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'donor' | 'receiver' | 'verifier' | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('userRole') as 'donor' | 'receiver' | 'verifier' | null;
    if (savedAuth === 'true' && savedRole) {
      setIsAuthenticated(true);
      setUserRole(savedRole);
    }
  }, []);

  const handleLogin = (role: 'donor' | 'receiver' | 'verifier') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  };

  const handleRegister = (role: 'donor' | 'receiver' | 'verifier') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={handleLogout}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Register onRegister={handleRegister} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated && userRole ? (
                  <Dashboard userRole={userRole} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/upload"
              element={
                isAuthenticated && userRole === 'donor' ? (
                  <Upload />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/verify"
              element={
                isAuthenticated && userRole === 'verifier' ? (
                  <Verify />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route
              path="/request/:id"
              element={
                isAuthenticated ? (
                  <RequestConfirm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/notifications"
              element={
                isAuthenticated ? (
                  <Notifications />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
