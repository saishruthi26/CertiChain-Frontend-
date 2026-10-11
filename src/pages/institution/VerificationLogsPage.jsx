import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';

const VerificationLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/verification-logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-main)' }}>Verification Logs</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track all attempts to verify certificates issued by your institution.</p>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}><LoadingSpinner /></div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Certificate ID</th>
                  <th>Result</th>
                  <th>Integrity Check</th>
                  <th>IP / User Agent</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <tr key={log._id}>
                      <td style={{ whiteSpace: 'nowrap' }}>{new Date(log.timestamp).toLocaleString()}</td>
                      <td style={{ fontFamily: 'monospace' }}>{log.certificateId}</td>
                      <td>
                        <StatusBadge status={log.result} />
                      </td>
                      <td>
                        <span style={{ 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '0.25rem', 
                          fontSize: '0.75rem', 
                          fontWeight: '600',
                          backgroundColor: log.integrityCheck ? 'var(--success-light)' : 'var(--danger-light)',
                          color: log.integrityCheck ? 'var(--success)' : 'var(--danger)'
                        }}>
                          {log.integrityCheck ? 'PASSED' : 'FAILED'}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.875rem' }}>{log.ipAddress}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No verification logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationLogsPage;
