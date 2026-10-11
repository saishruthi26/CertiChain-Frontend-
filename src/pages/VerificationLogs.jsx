import React, { useState, useEffect } from 'react';
import { getVerificationLogs } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const VerificationLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await getVerificationLogs();
        setLogs(response.data.logs || []);
      } catch (err) {
        setError('Failed to fetch verification logs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>Verification Logs</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
        Track every time someone attempts to verify a certificate issued by your institution.
      </p>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: '3rem' }}>
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="alert alert-danger m-3">{error}</div>
          ) : logs.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3>No verification logs yet</h3>
              <p>When someone verifies your certificates, the activity will appear here.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Certificate ID</th>
                    <th>Overall Status</th>
                    <th>Integrity Result</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log._id}>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td>{log.certificateId}</td>
                      <td>
                        <span className={`badge ${log.status === 'SUCCESS' ? 'badge-success' : 'badge-danger'}`}>
                          {log.status}
                        </span>
                      </td>
                      <td>
                        {log.details?.integrityCheck === 'PASSED' ? (
                          <span style={{ color: 'var(--success)' }}>Passed</span>
                        ) : log.details?.integrityCheck === 'FAILED' ? (
                          <span style={{ color: 'var(--error)' }}>Failed</span>
                        ) : (
                          <span style={{ color: 'var(--text-light)' }}>N/A</span>
                        )}
                      </td>
                      <td style={{ fontFamily: 'monospace' }}>
                        {log.ipAddress || 'Unknown'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationLogs;
