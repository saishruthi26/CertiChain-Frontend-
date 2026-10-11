import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import VerifyPage from './pages/VerifyPage';
import VerifyResultPage from './pages/VerifyResultPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateCertificatePage from './pages/CreateCertificatePage';
import CertificatesListPage from './pages/CertificatesListPage';
import VerificationLogsPage from './pages/VerificationLogsPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/verify/:certificate_id" element={<VerifyResultPage />} />
              <Route path="/institution/login" element={<LoginPage />} />
              <Route path="/institution/register" element={<RegisterPage />} />

              {/* Protected Institution Routes */}
              <Route
                path="/institution/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/institution/certificates/create"
                element={
                  <ProtectedRoute>
                    <CreateCertificatePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/institution/certificates"
                element={
                  <ProtectedRoute>
                    <CertificatesListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/institution/verification-logs"
                element={
                  <ProtectedRoute>
                    <VerificationLogsPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
