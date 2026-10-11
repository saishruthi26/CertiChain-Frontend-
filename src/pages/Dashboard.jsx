import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMe, getDashboardStats, getCertificates, getVerificationLogs } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalCertificates: 0,
    validCertificates: 0,
    revokedCertificates: 0,
    totalVerifications: 0
  });
  const [recentCertificates, setRecentCertificates] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all necessary data concurrently
        const [userRes, statsRes, certsRes, logsRes] = await Promise.all([
          getMe(),
          getDashboardStats(),
          getCertificates({ limit: 5 }),
          getVerificationLogs()
        ]);

        setUser(userRes.data);
        setStats(statsRes.data);
        setRecentCertificates(certsRes.data.certificates || []);
        
        // Take only top 5 recent logs
        const logs = logsRes.data.logs || [];
        setRecentLogs(logs.slice(0, 5));
        
      } catch (err) {
        setError('Failed to load dashboard data. Please try refreshing the page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner fullPage />;
  
  if (error) return <div className="alert alert-danger m-3">{error}</div>;

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>Welcome, {user?.institutionName}</h1>
          <p>Here is your institution's certificate issuance overview.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/institution/certificates/create" className="btn btn-primary">
            + Create Certificate
          </Link>
          <Link to="/institution/profile" className="btn btn-outline">
            View Profile
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-title">Total Certificates</span>
          <span className="stat-value">{stats.totalCertificates}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Valid Certificates</span>
          <span className="stat-value" style={{ color: 'var(--success)' }}>{stats.validCertificates}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Revoked Certificates</span>
          <span className="stat-value" style={{ color: 'var(--error)' }}>{stats.revokedCertificates}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Total Verifications</span>
          <span className="stat-value" style={{ color: 'var(--info)' }}>{stats.totalVerifications}</span>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="card-title">Recent Certificates</h3>
            <Link to="/institution/certificates" style={{ fontSize: '0.875rem' }}>View All</Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {recentCertificates.length > 0 ? (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Certificate ID</th>
                      <th>Student Name</th>
                      <th>Course</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCertificates.map(cert => (
                      <tr key={cert._id}>
                        <td>
                          <Link to={`/institution/certificates/${cert.certificateId}`}>
                            {cert.certificateId}
                          </Link>
                        </td>
                        <td>{cert.studentName}</td>
                        <td>{cert.course}</td>
                        <td>
                          <span className={`badge ${cert.status === 'VALID' ? 'badge-success' : 'badge-danger'}`}>
                            {cert.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No certificates issued yet.
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="card-title">Recent Verification Activity</h3>
            <Link to="/institution/verification-logs" style={{ fontSize: '0.875rem' }}>View All</Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {recentLogs.length > 0 ? (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Cert ID</th>
                      <th>Result</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLogs.map(log => (
                      <tr key={log._id}>
                        <td title={log.certificateId}>
                          {log.certificateId.substring(0, 12)}...
                        </td>
                        <td>
                          <span className={`badge ${log.status === 'SUCCESS' ? 'badge-success' : 'badge-danger'}`}>
                            {log.status === 'SUCCESS' ? 'Valid' : 'Failed'}
                          </span>
                        </td>
                        <td>{new Date(log.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No verification logs found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
