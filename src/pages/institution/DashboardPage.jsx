import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import { FiFileText, FiCheckCircle, FiXCircle, FiActivity } from 'react-icons/fi';

const DashboardPage = () => {
  const { institution } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><LoadingSpinner /></div>;

  // Fallback if API fails
  const data = stats || {
    totalCertificates: 0,
    validCertificates: 0,
    revokedCertificates: 0,
    totalVerifications: 0,
    recentCertificates: [],
    recentVerifications: []
  };

  const statCards = [
    { title: 'Total Certificates', value: data.totalCertificates, icon: <FiFileText />, color: 'var(--primary)' },
    { title: 'Valid Certificates', value: data.validCertificates, icon: <FiCheckCircle />, color: 'var(--success)' },
    { title: 'Revoked Certificates', value: data.revokedCertificates, icon: <FiXCircle />, color: 'var(--danger)' },
    { title: 'Total Verifications', value: data.totalVerifications, icon: <FiActivity />, color: 'var(--accent)' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-main)' }}>Welcome, {institution?.institution_name}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Here's an overview of your certificate issuance and verification activity.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/institution/certificates" className="btn-secondary">View All</Link>
          <Link to="/institution/certificates/create" className="btn-primary">Issue Certificate</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((card, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem', backgroundColor: `${card.color}20`, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              {card.icon}
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{card.title}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media(min-width: 1024px)': { gridTemplateColumns: '2fr 1fr' } }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Certificates</h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentCertificates.length > 0 ? (
                  data.recentCertificates.map(cert => (
                    <tr key={cert.certificate_id}>
                      <td style={{ fontFamily: 'monospace' }}>
                        <a href={`/institution/certificates/${cert.certificate_id}`} style={{ color: 'var(--primary)', fontWeight: '500' }}>
                          {cert.certificate_id}
                        </a>
                      </td>
                      <td>{cert.student_name}</td>
                      <td>{cert.issue_date ? new Date(cert.issue_date).toLocaleDateString() : '-'}</td>
                      <td><StatusBadge status={cert.status} /></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No certificates issued yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
