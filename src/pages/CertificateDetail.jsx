import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCertificate, revokeCertificate } from '../services/api';
import CertificateDisplay from '../components/CertificateDisplay';
import LoadingSpinner from '../components/LoadingSpinner';

const CertificateDetail = () => {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Revoke Modal State
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [revokeReason, setRevokeReason] = useState('');
  const [revoking, setRevoking] = useState(false);

  useEffect(() => {
    const fetchCertificateDetails = async () => {
      try {
        setLoading(true);
        const response = await getCertificate(certificateId);
        setCertificate(response.data.certificate);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load certificate details.');
      } finally {
        setLoading(false);
      }
    };

    if (certificateId) {
      fetchCertificateDetails();
    }
  }, [certificateId]);

  const handleRevoke = async () => {
    if (!revokeReason.trim()) return;
    
    try {
      setRevoking(true);
      await revokeCertificate(certificateId, revokeReason);
      
      // Update local state
      setCertificate({ ...certificate, status: 'REVOKED' });
      setRevokeModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to revoke certificate');
    } finally {
      setRevoking(false);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;
  
  if (error) {
    return (
      <div className="alert alert-danger" style={{ margin: '2rem 0' }}>
        {error}
        <div style={{ marginTop: '1rem' }}>
          <button className="btn btn-outline" onClick={() => navigate('/institution/certificates')}>
            Back to Certificates
          </button>
        </div>
      </div>
    );
  }

  if (!certificate) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Certificate Details</h1>
        {certificate.status === 'VALID' && (
          <button 
            className="btn btn-danger"
            onClick={() => setRevokeModalOpen(true)}
          >
            Revoke Certificate
          </button>
        )}
      </div>

      {certificate.status === 'REVOKED' && (
        <div className="alert alert-danger" style={{ marginBottom: '2rem' }}>
          <strong>This certificate has been revoked.</strong> It will no longer pass verification.
        </div>
      )}

      <div style={{ marginBottom: '3rem' }}>
        <CertificateDisplay certificate={certificate} />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Technical Details</h3>
        </div>
        <div className="card-body">
          <div className="detail-grid" style={{ background: 'none', border: 'none', padding: 0, marginTop: 0 }}>
            <div className="detail-item">
              <span className="detail-label">Certificate ID</span>
              <span className="detail-value">{certificate.certificateId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Cryptographic Hash</span>
              <span className="detail-value" style={{ wordBreak: 'break-all', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                {certificate.hash}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Created At</span>
              <span className="detail-value">{new Date(certificate.createdAt).toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Issuer Entity</span>
              <span className="detail-value">{certificate.institutionName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revoke Modal */}
      {revokeModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ color: 'var(--error)' }}>Revoke Certificate</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Are you sure you want to revoke the certificate for <strong>{certificate.studentName}</strong>? 
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
              <button className="btn btn-outline" onClick={() => setRevokeModalOpen(false)} disabled={revoking}>
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

export default CertificateDetail;
