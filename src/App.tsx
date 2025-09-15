import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { LocationProvider } from './contexts/LocationContext';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Internships from './pages/Internships';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <UserProvider>
      <LocationProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/internships" element={<Layout><Internships /></Layout>} />
              <Route path="/profile" element={<Layout><Profile /></Layout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </LocationProvider>
    </UserProvider>
  );
}

export default App;