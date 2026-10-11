import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCertificates, revokeCertificate } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Revoke Modal State
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedCertToRevoke, setSelectedCertToRevoke] = useState(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [revoking, setRevoking] = useState(false);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;
      
      const response = await getCertificates(params);
      setCertificates(response.data.certificates);
    } catch (err) {
      setError('Failed to fetch certificates.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [statusFilter]); // Re-fetch when status filter changes

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCertificates();
  };

  const openRevokeModal = (cert) => {
    setSelectedCertToRevoke(cert);
    setRevokeReason('');
    setRevokeModalOpen(true);
  };

  const closeRevokeModal = () => {
    setRevokeModalOpen(false);
    setSelectedCertToRevoke(null);
  };

  const handleRevoke = async () => {
    if (!revokeReason.trim()) return;
    
    try {
      setRevoking(true);
      await revokeCertificate(selectedCertToRevoke.certificateId, revokeReason);
      
      // Update local state to reflect change
      setCertificates(certificates.map(c => 
        c.certificateId === selectedCertToRevoke.certificateId 
          ? { ...c, status: 'REVOKED' } 
          : c
      ));
      
      closeRevokeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to revoke certificate');
    } finally {
      setRevoking(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Certificates</h1>
        <Link to="/institution/certificates/create" className="btn btn-primary">
          Issue New Certificate
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSearch} className="filters-bar">
            <div className="flex-grow">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Certificate ID or Student Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select 
                className="form-control" 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="VALID">Valid</option>
                <option value="REVOKED">Revoked</option>
              </select>
            </div>
            <button type="submit" className="btn btn-secondary">Search</button>
          </form>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : certificates.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <h3>No certificates found</h3>
              <p>Try adjusting your search filters or issue a new certificate.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Certificate ID</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Issue Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert) => (
                    <tr key={cert._id}>
                      <td>{cert.certificateId}</td>
                      <td>{cert.studentName}</td>
                      <td>{cert.course}</td>
                      <td>{new Date(cert.issueDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${cert.status === 'VALID' ? 'badge-success' : 'badge-danger'}`}>
                          {cert.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Link 
                            to={`/institution/certificates/${cert.certificateId}`}
                            className="btn btn-outline"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                          >
                            View
                          </Link>
                          {cert.status === 'VALID' && (
                            <button 
                              className="btn btn-danger"
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                              onClick={() => openRevokeModal(cert)}
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Revoke Modal */}
      {revokeModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ color: 'var(--error)' }}>Revoke Certificate</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Are you sure you want to revoke the certificate for <strong>{selectedCertToRevoke?.studentName}</strong>? 
              This action cannot be undone, and the certificate will permanently fail verification.
            </p>
            
            <div className="form-group">
              <label className="form-label">Reason for Revocation (Required)</label>
              <textarea
                className="form-control"
                rows="3"
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="e.g., Issued in error, academic misconduct, etc."
                required
              ></textarea>
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeRevokeModal} disabled={revoking}>
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleRevoke}
                disabled={!revokeReason.trim() || revoking}
              >
                {revoking ? 'Revoking...' : 'Yes, Revoke Certificate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateList;
